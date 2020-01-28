import React, { useRef, useState, useEffect, } from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity, } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image';
import moment from 'moment/min/moment-with-locales';
import styles from './styles'
moment.locale('uk');

import SharedButton from '@shared/SharedButton';
import Receipt from './components/Receipt';

import { currentAccountSelector, } from '@selectors'

const headerHeight = 68

const headerButtonSizes = { justifyContent: 'center', width: headerHeight, height: headerHeight, }
const headerIcon = { width: headerHeight - 50, height: headerHeight - 50, }

function LeftSide(props) {
  const { receipts, setReceipts, selectedInstance, selectReceiptInstance, setPaymentModalState, addProductQuantity, substractProductQuantity, } = props;

  const receiptsRef = useRef(null)

  const dispatch = useDispatch()

  const currentAccount = useSelector(currentAccountSelector)

  const [entries] = useState([{}, {}, {}, {}])

  const [receiptSum, setReceiptSum] = useState(0)
  const [paymentModalVisible, setPaymentModalVisible] = useState(false)
  const [leftSideWidth, setLeftSideWidth] = useState(10)
  const [isReceiptInstancesVisible, setReceiptInstancesVisibility] = useState(false)
  const [paymentNotice, setPaymentNotice] = useState('')
  const [currentTime, setCurrentTime] = useState(moment(Date.now()).format('dddd DD.MM | HH:mm').charAt(0).toUpperCase() + moment(Date.now()).format('dddd DD.MM | HH:mm').slice(1))

  useEffect(() => {
    setReceiptSum(receipts[selectedInstance].reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), false))
  }, [receipts[selectedInstance]]);

  const validateTime = (leftSideWidth) => {
    const fullDate = moment(Date.now()).format('dddd DD.MM | HH:mm')
    const shortDate = moment(Date.now()).format('DD.MM | HH:mm')

    if (leftSideWidth > 350)
      setCurrentTime(fullDate.charAt(0).toUpperCase() + fullDate.slice(1))
    else
      setCurrentTime(shortDate)
  }

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    validateTime(leftSideWidth)
  }, 5 * 1000)

  const startTimer = (e) => {
    const leftSideWidth = e.nativeEvent.layout.width

    setLeftSideWidth(leftSideWidth)

    validateTime(leftSideWidth)
  }

  const setReceiptInstance = (newReceiptInstance) => {
    const newReceipts = receipts.map((item, index) => selectedInstance === index ? newReceiptInstance : item)

    setReceipts(newReceipts)
  }

  const changePaymentModalState = (status) => {
    if (status && receipts[selectedInstance].length === 0) return

    setPaymentModalState(status, { receiptSum, payload: receipts[selectedInstance] })
  }

  return (
    <View style={styles.container}>
      {isReceiptInstancesVisible ? (
        <View style={[styles.header, { paddingLeft: 25, height: headerHeight, }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: (headerHeight - 20) * 5.2, }}>
            {receipts.map((receiptInstance, index) => (
              <SharedButton
                onPress={() => selectReceiptInstance(index)}
                style={[styles.lsInstanceContainer, { width: headerHeight - 20, height: headerHeight - 20, }]}
                borderRadius={headerHeight}
                scale={0.8}
              >
                <LinearGradient
                  start={{ x: 2, y: 1 }}
                  end={{ x: 0, y: 2 }}
                  colors={selectedInstance === index ? ['#DB3E69', '#FD9C6C'] : ['#FF767500', '#FD9C6C00']}
                  style={{ alignItems: 'center', justifyContent: 'center', width: headerHeight - 20, height: '100%', paddingBottom: 3, borderRadius: headerHeight }}
                >
                  <Text style={[styles.receiptButtonText, selectedInstance === index && { color: '#FFFFFF' }]}>{index + 1}</Text>
                </LinearGradient>
              </SharedButton>

            ))}
          </View>
          <SharedButton
            onPress={() => setReceiptInstancesVisibility(!isReceiptInstancesVisible)}
            style={headerButtonSizes}
            borderRadius={headerHeight}
            iconStyle={{ width: headerIcon.width - 9, height: headerIcon.height, }}
            source={require('@images/back_thin.png')}
          />
        </View>
      ) : (
          <View
            style={[styles.header, { height: headerHeight, }]}
            onLayout={(e) => startTimer(e)}
          >
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <SharedButton
                onPress={() => { }}
                style={headerButtonSizes}
                iconStyle={{ width: headerIcon.width + 1.3, height: headerIcon.height + 1, }}
                source={require('@images/clock.png')}
                scale={0.85}
              />
              <Text style={styles.timeText}>{currentTime}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <SharedButton
                style={headerButtonSizes}
                iconStyle={headerIcon}
                onPress={() => setReceiptInstancesVisibility(!isReceiptInstancesVisible)}
                source={require('@images/split_orders.png')}
              />
              <SharedButton
                onPress={() => setReceiptInstance([])}
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
        <Receipt
          receipt={receipts[selectedInstance]}
          setReceiptInstance={setReceiptInstance}
          addProductQuantity={addProductQuantity}
          substractProductQuantity={substractProductQuantity}
        />
      </ScrollView>

      {currentAccount.settings.available_teams && currentAccount.settings.available_teams.kitchen ? (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => changePaymentModalState(true)}
            style={[styles.proceedContainer, { width: '72%', paddingLeft: '8%', paddingRight: 5, height: 70, marginLeft: '0%', marginBottom: 40, justifyContent: 'flex-end' }]}
            activeOpacity={1}
          >
            <LinearGradient
              style={[styles.lsproceedButton, receiptSum <= 0 && { opacity: 0.5 }]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              colors={['#DB3E69', '#FD9C6C']}
            >
              <Text style={styles.lsproceedButtonText}>ОПЛАТА {receiptSum ? receiptSum : 0}₴ </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changePaymentModalState(true)}
            style={[styles.proceedContainer, { width: '24%', paddingLeft: 5, paddingRight: 10, marginLeft: 0, height: 70, marginBottom: 40, justifyContent: 'flex-end' }]}
            activeOpacity={1}
          >
            <LinearGradient
              style={[styles.lsproceedButton, receiptSum <= 0 && { opacity: 0.5 }]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              colors={['#DB3E69', '#FD9C6C']}
            >
              <Text style={styles.lsproceedButtonText}>З</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : (
          <TouchableOpacity
            onPress={() => changePaymentModalState(true)}
            style={styles.proceedContainer}
            activeOpacity={1}
          >
            <LinearGradient
              style={[styles.lsproceedButton, { marginLeft: '1%' }, receiptSum <= 0 && { opacity: 0.5 }]}
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