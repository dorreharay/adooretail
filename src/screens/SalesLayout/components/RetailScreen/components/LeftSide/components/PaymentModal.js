import React, { Fragment, useState, useEffect, useRef, } from 'react'
import { View, Text, TextInput, TouchableOpacity, } from 'react-native'
import { useSelector } from 'react-redux'
import Modal, { SlideAnimation, ModalContent, ModalButton, } from 'react-native-modals';
import FastImage from 'react-native-fast-image';
import styles from '../../../styles'

import { cashKeyboardLayout } from '../../../../../../../../helpers/keyboards'

import PaymentSubmit from './PaymentSubmit';
import PaymentHeading from './PaymentHeading';

const PaymentModal = (props) => {
  const {
    changePaymentModalState, setPaymentModalVisibility,
    initialReceiptSum = 0, setReceiptInstance, isVisible,
  } = props;

  const { deviceWidth, deviceHeight } = useSelector(state => state.temp.dimensions)

  const noticeRef = useRef(null)
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
    <View style={styles.paymentWrapperContainer}>
      <View style={[styles.paymentModal, { width: deviceWidth * 0.46, height: deviceWidth * 0.5, }]}>
        <PaymentHeading />
        <PaymentSubmit />
      </View>
        <TouchableOpacity
          onPress={() => setPaymentModalVisibility(false)}
          style={styles.paymentWrapper}
          activeOpacity={1}
        />
      </View >
      )
    }
    
    export default PaymentModal
    
    
  // < View style={{ alignItems: 'center', position: 'absolute', top: 70, left: 0, width: '100%', zIndex: editSumMode ? 2 : -1, backgroundColor: 'white', }}>
  //   <View style={{ width: '100%', paddingHorizontal: 20, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
  //     <Text style={[styles.loginCaption, { width: 100, fontSize: 25, }]}>{initialReceiptSum - currentInput}₴</Text>
  //     <Text style={[styles.loginCaption, sumError && { color: '#EC2424' }]}>{currentInput}</Text>
  //     <Text style={{ width: 100, }}></Text>
  //   </View>
  //   <View style={styles.lsNumpad}>
  //     {cashKeyboardLayout.map((num, index) => (
  //       <TouchableOpacity
  //         style={styles.lsNum}
  //         onPress={() => handleKeyPress(num.value)}
  //         activeOpacity={1}
  //         key={index}
  //       >
  //         <Text style={styles.lsNumText}>{num.value}</Text>
  //       </View>
  //     ))}

  //     <TouchableOpacity
  //       style={[styles.lsNum, { marginLeft: 0, }]}
  //       onPress={() => handleKeyPress('.')}
  //       activeOpacity={1}
  //     >
  //       <Text style={styles.lsNumText}>.</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity
  //       style={styles.lsNum}
  //       onPress={() => handleKeyPress('0')}
  //       activeOpacity={1}
  //     >
  //       <Text style={styles.lsNumText}>0</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity
  //       style={[styles.lsNum, { marginRight: 0, }]}
  //       onPress={handleDeleteSign}
  //       activeOpacity={1}
  //     >
  //       <FastImage style={{ width: 33, height: 33, marginRight: 5, }} source={require('@images/delete_sign.png')} fadeDuration={0} />
  //     </TouchableOpacity>
  //   </View>
  // </View >