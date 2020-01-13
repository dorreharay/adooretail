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
    buttonAccessible, resetStatus,
  } = props

  const { statusColor, statusText, blinking, } = status

  const [invalidColor, setInvalidColor] = useState(false)
  const [enteredSum, setEnteredSum] = useState(`${total}`)

  useEffect(() => {
    if (+enteredSum >= total) {
      setInvalidColor(false)
    }

    if (+enteredSum < total) {
      setInvalidColor(true)
    }
  }, [enteredSum])

  const handleChangeSum = (value) => {
    value = value.replace(/[^\d]/g, '')

    if(value.length >= 4 && enteredSum.length > 3) return enteredSum

    setEnteredSum(value)
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>{selectedType.index !== 2 ? 'Деталі оплати' : 'Відскануйте QR-код'}</Text>

        <SharedButton
          forceStyles={styles.cancelButton}
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
          handleChangeSum={handleChangeSum}
        />
      ) : (
        <CodePayment />
      )}
    </View>
  )
}

export default PaymentRightSide