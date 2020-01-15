import React, { Fragment, useState, useEffect, useRef, } from 'react'
import { View, Text, TextInput, TouchableOpacity, } from 'react-native'
import { useSelector } from 'react-redux'
import Modal, { SlideAnimation, ModalContent, ModalButton, } from 'react-native-modals';
import FastImage from 'react-native-fast-image';
import styles from '../../../styles'

import { cashKeyboardLayout } from '../../../../../../../../helpers/keyboards'

import PaymentLeftSide from './PaymentLeftSide/PaymentLeftSide';
import PaymentRightSide from './PaymentRightSide/PaymentRightSide';

const PaymentModal = (props) => {
  const { setPaymentModalVisibility, isVisible, currentReceipt } = props;

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

  const saveReceipt = (paymentType, currentReceipt) => {
    function guidGenerator() {
      let S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    // const firstReceipt = currentReceipt.payload[0]
    // const timeStart = firstReceipt.timeStart

    console.log('aaaa', currentReceipt)

    const payload = {
      payment_type: paymentType,
      receipt: currentReceipt.payload,
      total: currentReceipt.receiptSum,
      input: parseFloat(enteredSum),
      localId: guidGenerator(),
      timeStart: 0,
    }

    console.log('payload', payload)
  }

  const [buttonAccessible, setButtonAccessibility] = useState(true)
  const [pTypes, setPTypes] = useState([
    {
      index: 0,
      name: 'Готівка',
      apiName: 'cash',
      imageSource: require('@images/dollar.png'),
      onPress: () => {
        saveReceipt('cash', currentReceipt)
        setPaymentModalVisibility(false)
      },
      buttonText: 'Підтвердити',
    },
    {
      index: 1,
      name: 'Картка',
      apiName: 'card',
      imageSource: require('@images/debit.png'),
      onPress: () => {
        handleCardPayment('card', currentReceipt)
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

  const handleCardPayment = (paymentType, currentReceipt) => {
    setStatus(initialStatuses.success)

    saveReceipt(paymentType, currentReceipt)

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
          enteredSum={enteredSum}
          setEnteredSum={setEnteredSum}
          setButtonAccessibility={setButtonAccessibility}
        />
      </View>
    </View>
  )
}

export default PaymentModal