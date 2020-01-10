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
  const {
    changePaymentModalState, setPaymentModalVisibility,
    initialReceiptSum = 0, setReceiptInstance, isVisible,
  } = props;

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
      statusText: 'Оплата через термінал',
      blinking: true,
    },
    success: {
      index: 2,
      statusColor: '#6FE37A',
      statusText: 'Оплата проведена',
      blinking: false,
    }
  }
  const [status, setStatus] = useState(initialStatuses.initial)

  const [buttonAccessible, setButtonAccessibility] = useState(true)
  const [currentInput, setCurrentInput] = useState('0')
  const [pTypes, setPTypes] = useState([
    {
      index: 0,
      name: 'Готівка',
      imageSource: require('@images/dollar.png'),
      onPress: () => setPaymentModalVisibility(false),
    },
    {
      index: 1,
      name: 'Картка',
      imageSource: require('@images/debit.png'),
      onPress: () => handleCardPick(),
      buttonText: 'Розпочати оплату',
    },
    {
      index: 2,
      name: 'Сертифікат',
      imageSource: require('@images/gift.png'),
      onPress: () => setPaymentModalVisibility(false),
    },
  ])
  const [selectedType, selectPType] = useState(pTypes[0])

  const handleCardPick = () => {
    setStatus(initialStatuses.waiting)
    setButtonAccessibility(false)

    setTimeout(() => {
      setStatus(initialStatuses.success)

      setTimeout(() => {
        setPaymentModalVisibility(false)
        setButtonAccessibility(true)
      }, 500)
    }, 7000)
  }

  const resetStatus = () => {
    setStatus(initialStatuses.initial)
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
          setStatus={setStatus} resetStatus={resetStatus}
          buttonAccessible={buttonAccessible}
        />
      </View>
    </BlurView>
  )
}

export default PaymentModal