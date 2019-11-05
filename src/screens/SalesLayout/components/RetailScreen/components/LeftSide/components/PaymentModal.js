import React, { Fragment, useState, useEffect, useRef, } from 'react'
import { View, Text, TextInput, TouchableOpacity, } from 'react-native'
import Modal, { SlideAnimation, ModalContent, ModalButton, } from 'react-native-modals';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import styles from '../styles'

import SharedButton from '@shared/SharedButton';

import { cashKeyboardLayout } from '../../../../../../../../helpers/keyboards'


const PaymentModal = (props) => {
  const {
    paymentModalVisible, changePaymentModalState, setPaymentModalVisible,
    paymentNotice, setPaymentNotice, initialReceiptSum, setReceiptInstance,
  } = props;

  const noticeRef = useRef(null)
  const [currentInput, setCurrentInput] = useState('0')
  const [selectedPaymentType, selectPaymentType] = useState(false)
  const [sumError, setSumError] = useState(false)

  const sendReceipt = () => {
    if (Number(initialReceiptSum) > Number(currentInput)) {
      setSumError(true)

      return
    }

    changePaymentModalState(false)
    setTimeout(() => {
      selectPaymentType(false)
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

  return (
    <Modal
      visible={paymentModalVisible}
      modalAnimation={new SlideAnimation({
        slideFrom: 'bottom',
        animationDuration: 30,
        useNativeDriver: true,
      })}
      swipeDirection={['up', 'down']}
      onSwipeOut={() => setPaymentModalVisible(false)}
      onTouchOutside={() => setPaymentModalVisible(false)}
    >
      <ModalContent>
        <View style={styles.paymentModal}>
          <View style={styles.paymentModalInner}>
            <Text style={styles.modalHeadingText}>{!!selectedPaymentType ? selectedPaymentType : 'ТИП ОПЛАТИ'}</Text>
            {selectedPaymentType ? (
              <View style={{ width: 130, justifyContent: 'space-between', flexDirection: 'row', }}>
                <SharedButton
                  onPress={() => selectPaymentType(false)}
                  buttonSizes={{ width: 40, height: 40, }}
                  iconSizes={{ width: 23, height: 23, }}
                  source={require('@images/x_icon.png')} onStart
                />
                <SharedButton
                  onPress={sendReceipt}
                  buttonSizes={{ width: 40, height: 40, }}
                  iconSizes={{ width: 27, height: 27, }}
                  source={require('@images/tick.png')} onStart
                />
              </View>
            ) : (
                <SharedButton
                  onPress={() => changePaymentModalState(false)}
                  buttonSizes={{ width: 40, height: 40, }}
                  iconSizes={{ width: 23, height: 23, }}
                  source={require('@images/x_icon.png')} onStart
                />
              )}
          </View>
          <View style={{ alignItems: 'center', position: 'absolute', top: 70, left: 0, width: '100%', zIndex: selectedPaymentType ? 2 : -1, backgroundColor: 'white', }}>
            <View style={{ width: '100%', paddingHorizontal: 20, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text style={[styles.loginCaption, { width: 100, fontSize: 25, }]}>{initialReceiptSum - currentInput}₴</Text>
              <Text style={[styles.loginCaption, sumError && { color: '#EC2424' }]}>{currentInput}</Text>
              <Text style={{ width: 100, }}></Text>
            </View>
            <View style={styles.lsNumpad}>
              {cashKeyboardLayout.map((num, index) => (
                <TouchableOpacity
                  style={styles.lsNum}
                  onPress={() => handleKeyPress(num.value)}
                  activeOpacity={1}
                  key={index}
                >
                  <Text style={styles.lsNumText}>{num.value}</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={[styles.lsNum, { marginLeft: 0, }]}
                onPress={() => handleKeyPress('.')}
                activeOpacity={1}
              >
                <Text style={styles.lsNumText}>.</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.lsNum}
                onPress={() => handleKeyPress('0')}
                activeOpacity={1}
              >
                <Text style={styles.lsNumText}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.lsNum, { marginRight: 0, }]}
                onPress={handleDeleteSign}
                activeOpacity={1}
              >
                <FastImage style={{ width: 33, height: 33, marginRight: 5, }} source={require('@images/delete_sign.png')} fadeDuration={0} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ backgroundColor: '#FFFFFF' }}>
            <View style={styles.paymentModalTypes}>
              <TouchableOpacity
                style={styles.paymentModalType}
                onPress={() => selectPaymentType('КАРТКА')}
                activeOpacity={1}
              >
                <LinearGradient
                  start={{ x: -1, y: -1 }}
                  end={{ x: 1, y: 1 }}
                  colors={['#3F54CC', '#3084D2']}
                  style={{ flex: 1, padding: 20, borderRadius: 5,  }}
                >
                  <Text style={styles.paymentTypeText}>****  ****  ****  5678</Text>
                  <FastImage style={{ width: 32, height: 20.3 }} source={require('@images/payment_mastercard_icon.png')}></FastImage>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.paymentModalType}
                onPress={() => selectPaymentType('ГОТІВКА')}
                activeOpacity={1}
              >
                <LinearGradient
                  start={{ x: -1, y: -1 }}
                  end={{ x: 1, y: 1 }}
                  colors={['#3FCC77', '#94E381']}
                  style={{ flex: 1, padding: 20, borderRadius: 5,  }}
                >
                  <FastImage style={{ width: 32, height: 32 }} source={require('@images/payment_cash_icon.png')}></FastImage>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.paymentModalNotice}
              onPress={() => noticeRef.current.focus()}
              activeOpacity={1}
            >
              <TextInput
                ref={noticeRef}
                style={styles.paymentModalNoticeInput}
                placeholderTextColor={'#BFBFBF'}
                value={paymentNotice}
                onChangeText={(text) => setPaymentNotice(text)}
                placeholder='Замітка'
                multiline
                blurOnSubmit
              />
            </TouchableOpacity>
          </View>

				</View>
      </ModalContent>
    </Modal>
  )
}

export default PaymentModal
