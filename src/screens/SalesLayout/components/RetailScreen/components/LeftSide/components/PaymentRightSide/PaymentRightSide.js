import React, { useState, useEffect, } from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView, } from 'react-native'
import FastImage from 'react-native-fast-image';
import styles from './styles'

import SharedButton from '@shared/SharedButton';

import PaymentType from './PaymentType'
import CodePayment from './CodePayment'

function PaymentRightSide(props) {
  const {
    total = '', receipt, setPaymentModalVisibility,
    selectedType, status, setStatus, initialStatuses,
    buttonAccessible, resetStatus, enteredSum, setEnteredSum,
    saveReceipt, setButtonAccessibility, clearCurrentReceipt,
  } = props

  const { statusColor, statusText, blinking, } = status

  const [invalidColor, setInvalidColor] = useState(false)

  useEffect(() => {
    if (selectedType.index === 1) return setButtonAccessibility(true)

    if (+enteredSum >= total) {
      setButtonAccessibility(true)
      setInvalidColor(false)
    }

    if (+enteredSum < total) {
      setButtonAccessibility(false)
      setInvalidColor(true)
    }
  }, [enteredSum, selectedType])

  const handleChangeSum = (value) => {
    value = value.replace(/[^0-9.]/g, '')

    const splittedValue = value.split('')
    const dotsAmount = splittedValue.filter(item => item === '.').length

    if (dotsAmount > 1) {
      return
    }

    const dotIndex = value.indexOf('.')
    const valueBeforeDot = value.slice(0, dotIndex)
    const valueAfterDot = value.slice(dotIndex)

    if (valueBeforeDot.length >= 5) return
    if (valueAfterDot.length > 3) return

    setButtonAccessibility(false)

    setEnteredSum(value)
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>{selectedType.index !== 2 ? 'Деталі оплати' : 'Відскануйте QR-код'}</Text>

        <SharedButton
          style={styles.cancelButton}
          onPress={() => {
            setPaymentModalVisibility(false)
            resetStatus()
          }}
          scale={0.9}
        >
          <Text style={styles.cancelButtonText}>Скасувати</Text>
        </SharedButton>
      </View>

      {selectedType.index !== 2 ? (
        <PaymentType
          selectedType={selectedType}
          enteredSum={enteredSum} receipt={receipt}
          total={total} buttonAccessible={buttonAccessible}
          invalidColor={invalidColor}
          status={status} setStatus={setStatus}
          initialStatuses={initialStatuses} resetStatus={resetStatus}
          setPaymentModalVisibility={setPaymentModalVisibility}
          handleChangeSum={handleChangeSum} saveReceipt={saveReceipt}
          clearCurrentReceipt={clearCurrentReceipt}
        />
      ) : (
          <CodePayment />
        )}
    </View>
  )
}

export default PaymentRightSide