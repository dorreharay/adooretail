import React, { useRef, useState, useEffect, useMemo, } from 'react'
import { Text, View, ScrollView, TouchableOpacity, } from 'react-native'
import { useDispatch, useSelector, } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import BackgroundTimer from 'react-native-background-timer';
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import styles from './styles'

import { deviceHeight } from '@dimensions'

import { getUpperCaseDate, getFormattedDate, } from '@dateFormatter'
import { currentAccountSelector, } from '@selectors'
import { printNewBuffer } from '@printer'
import { clearCurrentReceipt, } from '@reducers/TempReducer'
import { setSelectedReceipt, } from '@reducers/OrdersReducer'

import ClockIcon from '@images/wall-clock.svg'

import SharedButton from '@shared/SharedButton';
import Receipt from './components/Receipt';

const headerHeight = 68

const headerButtonSizes = { justifyContent: 'center', width: deviceHeight < 500 ? headerHeight - 30 : headerHeight, height: deviceHeight < 500 ? headerHeight - 30 : headerHeight, }
const headerIcon = { width: deviceHeight < 500 ? headerHeight - 55 : headerHeight - 50, height: deviceHeight < 500 ? headerHeight - 55 : headerHeight - 50, }

function LeftSide(props) {
  const {
    setPaymentModalState,
    buffer, setBuffer,
    oldReceiptState, setOldReceipt,
  } = props;

  const dispatch = useDispatch()

  const currentAccount = useSelector(currentAccountSelector)
  const receipts = useSelector(state => state.orders.receipts)
  const selectedReceiptIndex = useSelector(state => state.orders.selectedReceiptIndex)

  const [isReceiptInstancesVisible, setReceiptInstancesVisibility] = useState(false)
  const [currentTime, setCurrentTime] = useState(getUpperCaseDate('dddd DD.MM | HH:mm'))
  const [bufferPressed, setOnPressBuffer] = useState(false)
  const [bufferButtonDisabled, setBufferButtonState] = useState(true)

  const validateTime = () => {
    const fullDate = getUpperCaseDate('dddd  |  HH:mm')

    setCurrentTime(fullDate)
  }

  const startTimer = (e) => {
    validateTime()
  }

  function guidGenerator() {
    let S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }

  const changePaymentModalState = (status) => {
    if (status && receipts[selectedReceiptIndex].length === 0) return

    setPaymentModalState(status)
  }

  const checkQuantityChange = (newReceipt, oldReceipt, newDiff) => {
    console.log('-------> 1 перевірка зміни quantity')

    let diff = _.difference(newReceipt, oldReceipt, 'quantity')

    diff = diff.filter(item => oldReceipt.find(elem => elem.hash_id === item.hash_id))

    const temp = diff.map(newItem => {
      const oldItem = oldReceipt.find(elem => elem.time === newItem.time)

      if (newItem.quantity !== oldItem.quantity) {
        if (newItem.quantity > oldItem.quantity) {
          return ({
            ...newItem,
            diff: `+${newItem.quantity - oldItem.quantity}`
          })
        } else {
          return ({
            ...newItem,
            diff: `-${oldItem.quantity - newItem.quantity}`
          })
        }
      }
    })

    return [...newDiff, ...temp]
  }

  const checkNewItems = (newReceipt, oldReceipt, newDiff) => {
    console.log('-------> 2 перевірка нових елементів')

    const diffWithNewItems = _.difference(newReceipt, oldReceipt)

    oldReceipt = oldReceipt.sort((a, b) => parseInt(a.time.slice(-5).replace(':', '')) - parseInt(b.time.slice(-5).replace(':', '')))
    newReceipt = newReceipt.sort((a, b) => parseInt(a.time.slice(-5).replace(':', '')) - parseInt(b.time.slice(-5).replace(':', '')))

    if (diffWithNewItems.length === 0) {
      console.log('-------> 2-1 нічого не змінилось, скіпаю')

      return newDiff
    }

    if (diffWithNewItems.every(item => oldReceipt.find(elem => elem.hash_id === item.hash_id))) {
      console.log('-------> 2-2 нічого не змінилось, скіпаю')

      return newDiff
    }

    const temp = diffWithNewItems.map(item => {
      const oldItem = newDiff.find(elem => elem.time === item.time)

      return oldItem ? oldItem : item
    })

    return [...new Map([...newDiff, ...temp].map(item => [item['hash_id'], item])).values()]
  }

  const checkDeletedItems = (newReceipt, oldReceipt, newDiff) => {
    console.log('-------> 3 перевірка видалених елементів')

    const diff = _.difference(oldReceipt, newReceipt)

    let temp = diff.map(item => ({ ...item, diff: `-${item.quantity}` }))

    oldReceipt = oldReceipt.sort((a, b) => parseInt(a.time.slice(-5).replace(':', '')) - parseInt(b.time.slice(-5).replace(':', '')))
    newReceipt = newReceipt.sort((a, b) => parseInt(a.time.slice(-5).replace(':', '')) - parseInt(b.time.slice(-5).replace(':', '')))

    if (newReceipt.length === oldReceipt.length && newReceipt.every(item => oldReceipt.find(elem => elem.hash_id === item.hash_id))) {
      console.log('-------> 3-1 нічого не змінилось, скіпаю')

      return newDiff
    }

    if (oldReceipt && !newReceipt.some(item => oldReceipt.find(elem => elem.hash_id === item.hash_id))) {
      console.log('-------> 3-2 всі попередні елементи видалені, але добавлені нові, що є унікальними')

      newDiff = [...newReceipt, ...newDiff]
    }

    temp = temp.filter(item => !newDiff.find(elem => elem.hash_id === item.hash_id))

    return [...new Map([...newDiff, ...temp].map(item => [item['hash_id'], item])).values()]
  }

  const updateBuffer = (data) => {
    const newBuffer = buffer.map((item, index) => index === selectedReceiptIndex ? data : item)

    setBuffer(newBuffer)
  }

  const saveBuffer = async () => {
    if (bufferButtonDisabled) return

    await performPrinterScript()
  }

  const performPrinterScript = async () => {
    try {
      const bufferInstance = await compareReceipts()

      const newReceipt = receipts[selectedReceiptIndex]

      if (bufferInstance) {
        await printNewBuffer(bufferInstance)

        const newOldReceipt = oldReceiptState.map((item, index) => index === selectedReceiptIndex ? newReceipt : item)

        setOldReceipt(newOldReceipt)
        updateBuffer(bufferInstance)
      }
    } catch (error) {
      console.log('Need to connect device')
    }
  }

  const compareReceipts = async () => {
    const newReceipt = receipts[selectedReceiptIndex]
    const oldBuffer = buffer[selectedReceiptIndex]
    const oldReceipt = oldReceiptState[selectedReceiptIndex]

    let newDiff = []

    if (oldBuffer === null) {
      console.log('-------> 0 буфер пустий')

      newDiff = newReceipt
    } else {
      newDiff = checkQuantityChange(newReceipt, oldReceipt, newDiff)

      console.log('1', newDiff)

      newDiff = checkNewItems(newReceipt, oldReceipt, newDiff)

      console.log('2', newDiff)

      newDiff = checkDeletedItems(newReceipt, oldReceipt, newDiff)

      console.log('3', newDiff)
    }

    console.log('newDiff ===>', newDiff)

    if (newDiff.every(item => item === undefined)) return null

    const bufferInstance = { ...buffer[selectedReceiptIndex], hash_id: oldBuffer === null ? guidGenerator() : buffer[selectedReceiptIndex].hash_id, receipt: newDiff }

    return bufferInstance
  }

  useEffect(() => {
    const ref = BackgroundTimer.setInterval(() => {
      validateTime()
    }, 20);

    return () => {
      BackgroundTimer.clearInterval(ref);
    }
  }, [])

  const receiptSum = useMemo(() => {
    return receipts[selectedReceiptIndex].reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), false)
  }, [receipts, selectedReceiptIndex])

  useEffect(() => {
    async function deepBufferCheck() {
      const bufferInstance = await compareReceipts()

      setBufferButtonState(!!!bufferInstance)
    }

    deepBufferCheck()
  }, [receiptSum, buffer[selectedReceiptIndex]])

  return (
    <View style={styles.container}>
      {isReceiptInstancesVisible ? (
        <View style={[styles.header, { paddingLeft: 25, height: headerHeight, }]}>
          <View style={{ alignItems: 'center', justifyContent: 'space-between', width: '75%', flexDirection: 'row' }}>
            {receipts.map((receiptInstance, index) => (
              <View style={[styles.lsInstanceContainer, { width: deviceHeight < 500 ? headerHeight - 30 : headerHeight - 20, height: deviceHeight < 500 ? headerHeight - 30 : headerHeight - 20, }]} key={index}>
                <SharedButton
                  onPress={() => dispatch(setSelectedReceipt(index))}
                  style={{ flex: 1, }}
                  borderRadius={headerHeight}
                  scale={0.8}
                >
                  <LinearGradient
                    start={{ x: 2, y: 1 }}
                    end={{ x: 0, y: 2 }}
                    colors={selectedReceiptIndex === index ? ['#DB3E69', '#FD9C6C'] : ['#FF767500', '#FD9C6C00']}
                    style={{ alignItems: 'center', justifyContent: 'center', width: headerHeight - 20, height: '100%', paddingBottom: 3, borderRadius: headerHeight }}
                  >
                    <Text style={[styles.receiptButtonText, selectedReceiptIndex === index && { color: '#FFFFFF' }]}>{index + 1}</Text>
                  </LinearGradient>
                </SharedButton>
              </View>
            ))}
          </View>
          <View style={{ width: '25%', marginLeft: 0.5, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <SharedButton
              onPress={() => setReceiptInstancesVisibility(!isReceiptInstancesVisible)}
              style={headerButtonSizes}
              iconStyle={{ width: headerIcon.width - 1, height: headerIcon.height - 1, }}
              source={require('@images/prev.png')}
            />
          </View>
        </View>
      ) : (
          <View
            style={[styles.header, { height: headerHeight, }]}
            onLayout={(e) => startTimer(e)}
          >
            <View style={{ alignItems: 'center', justifyContent: 'space-between', width: '80%', flexDirection: 'row' }}>
              <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginLeft: deviceHeight < 500 ? 10 : 0, }}>
                <SharedButton
                  onPress={() => { }}
                  style={{ width: headerButtonSizes.width - 15, height: headerButtonSizes.height - 10, }}
                  scale={0.85}
                >
                  <ClockIcon width={deviceHeight < 500 ? 13 : 20} height={deviceHeight < 500 ? 13 : 20} />
                </SharedButton>
                <Text
                  style={styles.timeText}
                  numberOfLines={1}
                  ellipsizeMode={'head'}
                >{currentTime}</Text>
              </View>


              <SharedButton
                style={headerButtonSizes}
                iconStyle={{ width: headerIcon.width + 0.5, height: headerIcon.height + 0.5, }}
                onPress={() => setReceiptInstancesVisibility(!isReceiptInstancesVisible)}
                source={require('@images/split_orders.png')}
              />
            </View>

            <View style={{ width: '20%', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <SharedButton
                onPress={() => dispatch(clearCurrentReceipt())}
                style={headerButtonSizes}
                iconStyle={{ width: headerIcon.width - 3, height: headerIcon.height - 3, }}
                source={require('@images/x_icon.png')}
              />
            </View>
          </View>
        )}

      <ScrollView
        style={styles.receipts}
        contentContainerStyle={{ paddingBottom: 10, }}
      >
        <Receipt />
      </ScrollView>

      {currentAccount && currentAccount.settings && currentAccount.settings.printer_enabled ? (
        <View style={{ width: '100%', paddingHorizontal: '7%', paddingTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => changePaymentModalState(true)}
            style={[styles.proceedContainer, styles.zProceed]}
            activeOpacity={1}
          >
            <LinearGradient
              style={[styles.lsproceedButton, receiptSum <= 0 && { opacity: 0.5 }, { paddingLeft: '8%', },]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              colors={['#DB3E69', '#FD9C6C']}
            >
              <Text style={[styles.lsproceedButtonText, { fontSize: 22, }]}>ОПЛАТА {receiptSum ? receiptSum : 0}₴ </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => saveBuffer()}
            onPressIn={() => setOnPressBuffer(true)}
            onPressOut={() => setOnPressBuffer(false)}
            style={[
              styles.proceedContainer,
              styles.zProceedEx,
              !bufferButtonDisabled && bufferPressed && { backgroundColor: '#E4616260', },
              bufferButtonDisabled && { borderColor: '#E4616280' },
            ]}
            activeOpacity={1}
          >
            <View style={[
              styles.lsproceedButton,
              bufferButtonDisabled && { opacity: 0.5 }
            ]}>
              <FastImage
                style={{ width: 30, height: 30, }}
                source={require('@images/print.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
      ) : (
          <TouchableOpacity
            onPress={() => {
              if (receiptSum <= 0) return
              changePaymentModalState(true)
            }}
            style={styles.proceedContainer}
            activeOpacity={1}
          >
            <LinearGradient
              style={[styles.lsproceedButton, receiptSum <= 0 && { opacity: 0.5 }]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              colors={['#DB3E69', '#FD9C6C']}
            >
              <Text style={styles.lsproceedButtonText}>ОПЛАТА {receiptSum ? receiptSum : 0}₴</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
    </View>
  )
}

export default LeftSide