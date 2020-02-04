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
    isVisible, activeDiscount, setActiveDiscount, 
    discounts, setDiscounts, comment, setComment,
  } = props

  const { statusColor, statusText, blinking, } = status

  const [invalidColor, setInvalidColor] = useState(false)
  const [toByPaid, setToByPaid] = useState(total)

  useEffect(() => {
    if (selectedType.index === 1) return setButtonAccessibility(true)

    if (+enteredSum >= toByPaid) {
      setButtonAccessibility(true)
      setInvalidColor(false)
    }

    if (+enteredSum < toByPaid) {
      setButtonAccessibility(false)
      setInvalidColor(true)
    }
    
  }, [enteredSum, selectedType])
  
  useEffect(() => { 
    if(activeDiscount === 0) {
      setToByPaid(total)

      return
    }
  }, [total, activeDiscount])

  useEffect(() => { 
    const percent = discounts[activeDiscount].percent
    
    if(activeDiscount === 0) {
      return
    }
  
    const updatedValue = (total - ((total / 100) * percent)).toFixed(2).replace('.00', '')

    setToByPaid(updatedValue)
  }, [activeDiscount])

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

      <View style={styles.cancelButton}>
        <SharedButton
          style={{ flex: 1, }}
          onPress={() => {
            setPaymentModalVisibility(false)
            resetStatus()
          }}
          scale={0.9}
        >
          <Text style={styles.cancelButtonText}>Скасувати</Text>
        </SharedButton>
      </View>
        
      </View>

      {selectedType.index !== 2 ? (
        <PaymentType
          selectedType={selectedType}
          enteredSum={enteredSum} receipt={receipt}
          buttonAccessible={buttonAccessible}
          invalidColor={invalidColor}
          status={status} setStatus={setStatus}
          initialStatuses={initialStatuses} resetStatus={resetStatus}
          setPaymentModalVisibility={setPaymentModalVisibility}
          handleChangeSum={handleChangeSum} saveReceipt={saveReceipt}
          clearCurrentReceipt={clearCurrentReceipt} isVisible={isVisible}
          toByPaid={toByPaid} setToByPaid={setToByPaid}
          activeDiscount={activeDiscount} setActiveDiscount={setActiveDiscount}
          discounts={discounts} setDiscounts={setDiscounts}
          comment={comment} setComment={setComment}
        />
      ) : (
          <CodePayment />
        )}
    </View>
  )
}

export default PaymentRightSide