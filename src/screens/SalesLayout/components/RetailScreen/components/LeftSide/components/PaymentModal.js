import React, { Fragment, useState, useEffect, useRef, } from 'react'
import { View, Text, TextInput, TouchableOpacity, } from 'react-native'
import { useSelector } from 'react-redux'
import Modal, { SlideAnimation, ModalContent, ModalButton, } from 'react-native-modals';
import FastImage from 'react-native-fast-image';
import { BlurView, } from "@react-native-community/blur";
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

  const [buttonAccessible, setButtonAccessibility] = useState(true)
  const [pTypes, setPTypes] = useState([
    {
      index: 0,
      name: 'Готівка',
      imageSource: require('@images/dollar.png'),
      onPress: () => setPaymentModalVisibility(false),
      buttonText: 'Підтвердити',
    },
    {
      index: 1,
      name: 'Картка',
      imageSource: require('@images/debit.png'),
      onPress: () => handleCardPayment(),
      buttonText: 'Підтвердити',
    },
    {
      index: 2,
      name: 'Знижка',
      imageSource: require('@images/gift.png'),
      onPress: () => setPaymentModalVisibility(false),
      buttonText: 'Підтвердити',
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
    <BlurView
      viewRef={blurRef}
      style={styles.paymentWrapperContainer}
      blurType="light"
      blurAmount={10}
    >
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
          status={status}
          total={currentReceipt.receiptSum}
          receipt={currentReceipt.payload}
          setStatus={setStatus} resetStatus={resetStatus}
          buttonAccessible={buttonAccessible}
        />
      </View>
    </BlurView>
  )
}

export default PaymentModal