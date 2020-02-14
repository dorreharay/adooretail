import React, { useState, } from 'react'
import { View, Text, TextInput, Animated, } from 'react-native'
import { useSelector } from 'react-redux'
import Modal, { SlideAnimation, ModalContent, } from 'react-native-modals';
import QRCode from 'react-native-qrcode-svg';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient'
import styles from './styles'

import API from '@api'
import { deviceWidth, deviceHeight } from '@dimensions'

import SharedButton from '@shared/SharedButton'

const successWhite = require('@images/success-white.png')
const failWhite = require('@images/fail-white.png')

function ReceiptModal(props) {
  const {
    isVisible,
    receiptModalItem,
    receiptModalState,
    hideReceiptModal,
  } = props

  const [customerEmail, setCustomerEmail] = useState('')
  const [error, setErrorStatus] = useState(false)
  const [loading, setLoadingStatus] = useState(false)

  const [contentOpacity] = useState(new Animated.Value(1))
  const [successOpacity] = useState(new Animated.Value(0))
  const [contentVisible, setContentVisibility] = useState(true)
  const [successVisible, setSuccessVisibility] = useState(false)

  const invokeSuccessAnimation = (callback) => {
    Animated.timing(
      contentOpacity,
      {
        toValue: 0,
        duration: 200,
      },
    ).start()
    setTimeout(() => {
      setContentVisibility(false)
      Animated.timing(
        successOpacity,
        {
          toValue: 1,
          duration: 200,
        },
      ).start()
      setSuccessVisibility(true)
      setTimeout(() => {
        setTimeout(() => {
          Animated.timing(
            successOpacity,
            {
              toValue: 0,
              duration: 200,
            },
          ).start()
          setSuccessVisibility(false)

          hideReceiptModal()

          setTimeout(() => {
            setContentVisibility(true)
          }, 300)

          Animated.timing(
            contentOpacity,
            {
              toValue: 1,
              duration: 200,
            },
          ).start()
        }, 500)
      }, 300)
    }, 400)
  }


  const onChangeText = (value) => {
    setErrorStatus(false)
    setCustomerEmail(value)
  }

  const onSubmitEmail = async () => {
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if (emailRegex.test(customerEmail)) {
      setErrorStatus(false)
      setLoadingStatus(true)

      // await API.sendReceiptByEmail({ recipient: customerEmail, receipt_hash_id: receiptModalItem })

      setTimeout(() => {
        invokeSuccessAnimation()
  
        setTimeout(() => {
          setLoadingStatus(false)
          setCustomerEmail('')
        }, 500)
      }, 1000)
      
    } else {
      setErrorStatus(true)

      return
    }
  }

  return (
    <Modal
      visible={isVisible}
      modalAnimation={new SlideAnimation({
        slideFrom: 'bottom',
        animationDuration: 30,
        useNativeDriver: true,
      })}
      modalStyle={[{ borderRadius: 11, }, receiptModalState === 'email' && { marginBottom: deviceHeight * 0.45 }]}
      onTouchOutside={hideReceiptModal}
    >
      <ModalContent>
        <View style={[styles.receiptModalContainer, receiptModalState === 'email' && { height: deviceHeight * 0.4 }]}>
          {receiptModalState && (
            receiptModalState === 'qr' ? (
              <>
                <Text style={styles.receiptModalHeading}>
                  Електронний чек замовлення
              </Text>
                <QRCode
                  value={receiptModalItem ? receiptModalItem : '-'}
                  size={deviceHeight * 0.35}
                />
              </>
            ) : (
                <>
                  {contentVisible && (
                    <Animated.View style={{ opacity: contentOpacity, width: '100%', height: '100%', paddingTop: '7%', paddingBottom: '2%', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={styles.receiptModalHeading}>
                        Надіслати чек електронною поштою
                    </Text>
                      <TextInput
                        style={customerEmail.length == 0 ? styles.qrCodeInputPlaceholder : styles.qrCodeInput}
                        onChangeText={onChangeText}
                        value={customerEmail}
                        placeholder='Введіть email користувача'
                        placeholderTextColor={'#C3C3C3'}
                        autoCapitalize={'none'}
                        autoFocus
                      />

                      {error ? (
                        <Text style={styles.errorText}>Не коректна адреса</Text>
                      ) : (
                          <Text style={[styles.errorText, { color: '#FFFFFF' }]}>-</Text>
                        )}

                      <SharedButton
                        style={styles.qrCodeButton}
                        onPress={onSubmitEmail}
                        scale={0.95}
                      >
                        <LinearGradient
                          style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 3, }}
                          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                          colors={['#DB3E47', '#EF9058']}
                        >
                          <Text style={styles.qrCodeButtonText}>{loading ? 'Надсилання...' : 'Надіслати'}</Text>
                        </LinearGradient>
                      </SharedButton>
                    </Animated.View>
                  )}
                  {successVisible && (
                    <Animated.View style={[styles.success, { opacity: successOpacity }]}>
                      <FastImage
                        style={{ width: deviceHeight * 0.15, height: deviceHeight * 0.15, }}
                        source={require('@images/success-green.png')}
                      />
                    </Animated.View>
                  )}
                </>
              )
          )}
        </View>
      </ModalContent>
    </Modal>
  )
}

export default ReceiptModal
