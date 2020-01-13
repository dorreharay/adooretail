import React, { useRef, useState, useEffect, } from 'react'
import { Text, View, Image, ScrollView, TextInput, } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image';
import moment from 'moment/min/moment-with-locales';
import styles from './styles'
moment.locale('uk');

import SharedButton from '@shared/SharedButton';
import Receipt from './components/Receipt';

import PaymentModal from './components/PaymentModal'

const headerHeight = 68

const headerButtonSizes = { width: headerHeight, height: headerHeight, }
const headerIcon = { width: headerHeight - 50, height: headerHeight - 50, }

function LeftSide(props) {
  const { receipts, setReceipts, selectedInstance, selectReceiptInstance, setPaymentModalState, } = props;

  const receiptsRef = useRef(null)

  const dispatch = useDispatch()

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
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 2 }}
                colors={selectedInstance === index ? ['#FF7675', '#FD9C6C'] : ['#FF767500', '#FD9C6C00']}
                style={{ borderRadius: headerHeight }}
              >
                <SharedButton
                  onPress={() => selectReceiptInstance(index)}
                  buttonSizes={{ width: headerHeight - 20, height: headerHeight - 20, borderWidth: 0, borderColor: '#FE8B70', }}
                  text={index + 1}
                  textStyles={[styles.receiptButtonText, selectedInstance === index && { color: '#FFFFFF' }]}
                  borderRadius={headerHeight}
                  backgroundColor={'#FFFFFF00'}
                  scale={0.9} onStart
                />
              </LinearGradient>
            ))}
          </View>
          <SharedButton
            onPress={() => setReceiptInstancesVisibility(!isReceiptInstancesVisible)}
            buttonSizes={headerButtonSizes}
            borderRadius={headerHeight}
            iconSizes={{ width: headerIcon.width - 9, height: headerIcon.height, }}
            source={require('@images/back_thin.png')} onStart
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
                buttonSizes={headerButtonSizes}
                iconSizes={{ width: headerIcon.width + 1.3, height: headerIcon.height + 1, }}
                source={require('@images/clock.png')}
              />
              <Text style={styles.timeText}>{currentTime}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <SharedButton
                buttonSizes={headerButtonSizes}
                iconSizes={headerIcon}
                onPress={() => setReceiptInstancesVisibility(!isReceiptInstancesVisible)}
                source={require('@images/split_orders.png')} onStart
              />
              <SharedButton
                onPress={() => setReceiptInstance([])}
                buttonSizes={headerButtonSizes}
                iconSizes={{ width: headerIcon.width - 3, height: headerIcon.height - 3, }}
                source={require('@images/x_icon.png')} onStart
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
        />
      </ScrollView>
      <SharedButton
        onPress={() => changePaymentModalState(true)}
        forceStyles={[styles.proceedContainer]}
        buttonSizes={{ width: '100%', }}
        duration={100}
        scale={0.94}
        onStart
      >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={['#DB3E69', '#FD9C6C']}
          style={[styles.lsproceedButton, receiptSum <= 0 && { opacity: 0.7 }]}
        >
          <Text style={styles.lsproceedButtonText}>ОПЛАТА {receiptSum ? receiptSum : 0}₴ </Text>
        </LinearGradient>
      </SharedButton>
    </View>
  )
}

export default LeftSide