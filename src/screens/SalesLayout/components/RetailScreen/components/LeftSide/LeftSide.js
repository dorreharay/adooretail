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
import { clearCurrentReceipt, setSelectedReceipt, } from '@reducers/TempReducer'

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
  const receipts = useSelector(state => state.temp.receipts)
  const selectedReceiptIndex = useSelector(state => state.temp.selectedReceiptIndex)

  const [isReceiptInstancesVisible, setReceiptInstancesVisibility] = useState(false)
  const [currentTime, setCurrentTime] = useState(getUpperCaseDate('dddd DD.MM | HH:mm'))
  const [bufferPressed, setOnPressBuffer] = useState(false)

  const validateTime = () => {
    const fullDate = getUpperCaseDate('dddd  |  HH:mm')

    setCurrentTime(fullDate)
  }

  const startTimer = (e) => {
    validateTime()
  }

  const changePaymentModalState = (status) => {
    if (status && receipts[selectedReceiptIndex].length === 0) return

    setPaymentModalState(status)
  }

  const updateBuffer = (data) => {
    const newBuffer = buffer.map((item, index) => index === selectedReceiptIndex ? data : item)

    // console.log('old buffer ->>>>>>>', buffer[selectedReceiptIndex] ? buffer[selectedReceiptIndex].receipt : null)

    // console.log('new buffer ->>>>>>>', newBuffer[selectedReceiptIndex].receipt)

    setBuffer(newBuffer)
  }

  const saveBuffer = async () => {
    if (receiptSum <= 0) return

    const currentReceipt = receipts[selectedReceiptIndex]
    const bufferedReceipt = buffer[selectedReceiptIndex]
    const oldReceipt = oldReceiptState[selectedReceiptIndex]

    function guidGenerator() {
      let S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    let payload = {
      receipt: currentReceipt,
      hash_id: guidGenerator(),
    }

    if (bufferedReceipt === null || !currentReceipt.some(item => oldReceipt.find(elem => elem.title === item.title))) {
      if(oldReceipt && !currentReceipt.some(item => oldReceipt.find(elem => elem.title === item.title))) {
        payload = {
          ...payload,
          receipt: [...payload.receipt, ...oldReceipt.map(item => ({ ...item, diff: `-${item.quantity}` }))]
        }
      }

      await printNewBuffer(payload)

      updateBuffer(payload)

      const newOldReceipt = oldReceiptState.map((item, index) => index === selectedReceiptIndex ? currentReceipt : item)

      setOldReceipt(newOldReceipt)
    } else {
      compareReceipts(bufferedReceipt.receipt, currentReceipt, oldReceipt)
    }
  }

  const compareReceipts = async (oldBuffer, newReceipt, oldReceipt) => {
    let newDiff = []

    console.log('oldReceipt', oldReceipt && oldReceipt.length)
    console.log('newReceipt', oldReceipt && newReceipt.length)

    if (oldReceipt && newReceipt.length > oldReceipt.length) {
      console.log('------->', 1)

      newDiff = oldReceipt.map(oldItem => {
        const newItems = newReceipt.filter(item => oldReceipt.find(elem => elem.time === item.time))

        const newItem = newItems.find(elem => elem.time === oldItem.time)

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
        } else {
          return oldItem
        }
      })

      if (!newDiff.every(item => item === undefined)) {
        const diffWithNewItems = _.difference(newReceipt, oldReceipt)

        newDiff = diffWithNewItems.map(item => {
          const oldItem = newDiff.find(elem => elem.time === item.time)

          return oldItem ? oldItem : item
        })
      }
    } else {
      if (oldReceipt && newReceipt.length < oldReceipt.length) {
        console.log('------->', 3)

        const diff = _.difference(oldReceipt, newReceipt)

        newDiff = diff.map(item => ({ ...item, diff: `-${item.quantity}` }))


      } else {
        console.log('------->', 2)

        const diff = _.difference(newReceipt, oldReceipt, 'quantity')

        newDiff = diff.map(newItem => {
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
      }
    }

    const newOldReceipt = oldReceiptState.map((item, index) => index === selectedReceiptIndex ? newReceipt : item)

    setOldReceipt(newOldReceipt)

    if (newDiff.every(item => item === undefined)) return

    const bufferInstance = { ...buffer[selectedReceiptIndex], receipt: newDiff }

    updateBuffer(bufferInstance)

    console.log('success ===>', bufferInstance.receipt)

    await printNewBuffer(bufferInstance)
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

      {currentAccount && currentAccount.settings && currentAccount.settings.available_teams && currentAccount.settings.available_teams.kitchen && currentAccount.settings.printer_enabled ? (
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
              <Text style={styles.lsproceedButtonText}>ОПЛАТА {receiptSum ? receiptSum : 0}₴ </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => saveBuffer()}
            onPressIn={() => setOnPressBuffer(true)}
            onPressOut={() => setOnPressBuffer(false)}
            style={[styles.proceedContainer, styles.zProceedEx, receiptSum > 0 && bufferPressed && { backgroundColor: '#E4616260', }, receiptSum <= 0 && { borderColor: '#E4616280' },]}
            activeOpacity={1}
          >
            <View style={[styles.lsproceedButton, receiptSum <= 0 && { opacity: 0.5 }]}>
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