import React, { useState, useEffect, useRef, } from 'react'
import { View, TouchableOpacity, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux'
let moment = require('moment-timezone');
moment.locale('uk');
import styles from '../../../styles'

import { saveLocalReceipt } from '@reducers/UserReducer'

import PaymentLeftSide from './PaymentLeftSide/PaymentLeftSide';
import PaymentRightSide from './PaymentRightSide/PaymentRightSide';

const PaymentModal = (props) => {
  const { 
    setPaymentModalVisibility, isVisible,
    currentReceipt, clearCurrentReceipt,
  } = props;

  const dispatch = useDispatch()
  const { deviceWidth, deviceHeight } = useSelector(state => state.temp.dimensions)

  const blurRef = useRef(null)

  const initialStatuses = {
    initial: {
      index: 0,
      statusColor: '#EDEDED',
      statusText: 'Очікування',
      blinking: false,
    },
    waiting: {
      index: 1,
      statusColor: 'yellow',
      statusText: 'Очікування оплати в терміналі',
      blinking: true,
    },
    success: {
      index: 2,
      statusColor: '#6FE37A',
      statusText: 'Оплата проведена',
      blinking: false,
    }
  }

  const [status, setStatus] = useState(initialStatuses.waiting)
  const [enteredSum, setEnteredSum] = useState(`${currentReceipt.receiptSum}`)

  useEffect(() => {
    setEnteredSum(`${currentReceipt.receiptSum}`)
  }, [currentReceipt])

  const saveReceipt = (paymentType) => {
    function guidGenerator() {
      let S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    const firstReceipt = currentReceipt.payload[0]
    const lastReceipt = currentReceipt.payload[currentReceipt.payload.length - 1]
    const timeStart = firstReceipt.time
    const timeEnd = lastReceipt.time

    const payload = {
      payment_type: paymentType,
      receipt: currentReceipt.payload,
      total: currentReceipt.receiptSum,
      input: parseFloat(enteredSum),
      change: +((+enteredSum) - currentReceipt.receiptSum).toFixed(2).replace(".00", ""),
      localId: guidGenerator(),
      first_product_time: timeStart,
      last_product_time: timeEnd,
      transaction_time_end: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    }

    if(!payload) return

    dispatch(saveLocalReceipt(payload))
  }

  const [buttonAccessible, setButtonAccessibility] = useState(true)
  const [pTypes, setPTypes] = useState([
    {
      index: 0,
      name: 'Готівка',
      apiName: 'cash',
      imageSource: require('@images/dollar.png'),
      onPress: (callBack) => {
        callBack()
        setPaymentModalVisibility(false)
      },
      buttonText: 'Підтвердити',
    },
    {
      index: 1,
      name: 'Картка',
      apiName: 'card',
      imageSource: require('@images/debit.png'),
      onPress: (callBack) => {
        callBack()
        handleCardPayment()
      },
      buttonText: 'Підтвердити розрахунок',
    },
    {
      index: 2,
      name: 'Знижка',
      imageSource: require('@images/gift.png'),
      onPress: () => { },
      buttonText: '',
    },
  ])
  const [selectedType, selectPType] = useState(pTypes[0])

  const handleCardPayment = () => {
    setStatus(initialStatuses.success)

    setTimeout(() => {
      setPaymentModalVisibility(false)
      setButtonAccessibility(true)
    }, 500)
  }

  const resetStatus = () => {
    setStatus(initialStatuses.waiting)
    setButtonAccessibility(true)
  }

  useEffect(() => {
    resetStatus()
  }, [isVisible])

  if (!isVisible) return null

  return (
    <View style={styles.paymentWrapperContainer}>
      <TouchableOpacity
        style={styles.paymentWrapper}
        activeOpacity={1}
      />
      <View style={[styles.paymentModal, { width: deviceWidth * 0.72, height: deviceWidth * 0.55, }]}>
        <PaymentLeftSide
          pTypes={pTypes}
          selectedType={selectedType}
          selectPType={selectPType}
        />
        <PaymentRightSide
          selectedType={selectedType}
          setPaymentModalVisibility={setPaymentModalVisibility}
          initialStatuses={initialStatuses}
          status={status} total={currentReceipt.receiptSum}
          receipt={currentReceipt.payload}
          setStatus={setStatus} resetStatus={resetStatus}
          buttonAccessible={buttonAccessible}
          enteredSum={enteredSum} saveReceipt={saveReceipt}
          setEnteredSum={setEnteredSum}
          setButtonAccessibility={setButtonAccessibility}
          clearCurrentReceipt={clearCurrentReceipt}
        />
      </View>
    </View>
  )
}

export default PaymentModal