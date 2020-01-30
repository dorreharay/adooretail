import React, { useState, } from 'react'
import { View, Text, TextInput, } from 'react-native'
import { useSelector } from 'react-redux'
import Modal, { SlideAnimation, ModalContent, } from 'react-native-modals';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient'
import styles from './styles'

import SharedButton from '@shared/SharedButton'

function ReceiptModal(props) {
  const {
    isVisible,
    receiptModalItem,
    receiptModalState,
    hideReceiptModal,
  } = props

  const { deviceWidth, deviceHeight } = useSelector(state => state.temp.dimensions)

  const [customerEmail, setCustomerEmail] = useState('')
  const [error, setErrorStatus] = useState(false)

  const onChangeText = (value) => {
    setErrorStatus(false)
    setCustomerEmail(value)
  }

  const onSubmitEmail = () => {
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if (emailRegex.test(customerEmail)) {
      setErrorStatus(false)
      hideReceiptModal()
      setCustomerEmail('')
    } else {
      setErrorStatus(true)
    }

    console.log('pizdec', emailRegex.test(customerEmail))
  }

  return (
    <Modal
      visible={isVisible}
      modalAnimation={new SlideAnimation({
        slideFrom: 'bottom',
        animationDuration: 30,
        useNativeDriver: true,
      })}
      modalStyle={{ borderRadius: 11, }}
      onTouchOutside={hideReceiptModal}
    >
      <ModalContent>
        <View style={styles.receiptModalContainer}>
          {receiptModalState === 'qr' ? (
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
              <View style={{ width: '100%', height: '100%', paddingTop: '7%', paddingBottom: '2%', alignItems: 'center', justifyContent: 'space-between' }}>
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
                    <Text style={styles.qrCodeButtonText}>Надіслати</Text>
                  </LinearGradient>
                </SharedButton>
              </View>
            )}
        </View>
      </ModalContent>
    </Modal>
  )
}

export default ReceiptModal
