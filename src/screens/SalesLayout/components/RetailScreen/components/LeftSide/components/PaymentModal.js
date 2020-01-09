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
  const [currentInput, setCurrentInput] = useState('0')
  const [selectedPaymentType, selectPaymentType] = useState('готівка')
  const [editSumMode, setEditSumMode] = useState(false)
  const [sumError, setSumError] = useState(false)

  const sendReceipt = () => {
    if (Number(initialReceiptSum) > Number(currentInput)) {
      setSumError(true)

      return
    }

    changePaymentModalState(false)
    setTimeout(() => {
      setReceiptInstance([])
    }, 200)
  }

  useEffect(() => {
    setCurrentInput(initialReceiptSum.toString())

    return () => setCurrentInput('0')
  }, [initialReceiptSum])

  const handleKeyPress = (input) => {
    input = input.toString()
    let newInput = currentInput;

    setSumError(false)

    if (currentInput === initialReceiptSum.toString()) {
      newInput = input

      setCurrentInput(newInput)
      return
    }

    if (newInput == '0') {
      newInput = ''
    }

    if (input === '.' && currentInput.includes('.')) return

    if (newInput.length < 8) {
      newInput = newInput + input;
    } else {
      return
    }

    setCurrentInput(newInput)
  }

  const handleDeleteSign = () => {
    let newInput = currentInput;

    setSumError(false)

    if (currentInput.length > 0) {
      newInput = currentInput.slice(0, -1);
    } else {
      return
    }

    if (currentInput.length === 1) {
      newInput = '0'
    }

    setCurrentInput(newInput)
  }

  if (!isVisible) return null

  return (
    <BlurView
      viewRef={blurRef}
      style={styles.paymentWrapperContainer}
      blurType="light"
      blurAmount={10}
    >
      <TouchableOpacity
        // onPress={() => setPaymentModalVisibility(false)}
        style={styles.paymentWrapper}
        activeOpacity={1}
      />
      <View style={[styles.paymentModal, { width: deviceWidth * 0.72, height: deviceWidth * 0.55, }]}>
        <PaymentLeftSide />
        <PaymentRightSide setPaymentModalVisibility={setPaymentModalVisibility} />
      </View>
    </BlurView>
  )
}

export default PaymentModal