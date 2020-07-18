import React, { useState, useEffect, } from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, } from 'react-native'
import styles from './styles'

import SharedButton from '@shared/SharedButton';

import { setPaymentModalVisibility } from '@reducers/TempReducer'

import PaymentType from './PaymentType'
import CodePayment from './CodePayment'
import { TouchableOpacity } from 'react-native-gesture-handler';

function PaymentRightSide(props) {
  const {
    total = '', receipt,
    selectedType, status, setStatus, initialStatuses,
    buttonAccessible, resetStatus, enteredSum, setEnteredSum,
    saveReceipt, setButtonAccessibility,
    isVisible, activeDiscount, setActiveDiscount, 
    discounts, setDiscounts, comment, setComment,
    toBePaid, setToByPaid, setAmountFocused,
    selectedService,
  } = props

  const dispatch = useDispatch()

  const [invalidColor, setInvalidColor] = useState(false)

  useEffect(() => {
    if (selectedType.index === 1) return setButtonAccessibility(true)

    if (+enteredSum >= toBePaid) {
      setButtonAccessibility(true)
      setInvalidColor(false)
    }

    if (+enteredSum < toBePaid) {
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
        <TouchableOpacity
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          onPress={() => {
            dispatch(setPaymentModalVisibility(false))
            resetStatus()
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelButtonText}>Закрити</Text>
        </TouchableOpacity>
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
          setPaymentModalVisibility={(state) => dispatch(setPaymentModalVisibility(state))}
          handleChangeSum={handleChangeSum} saveReceipt={saveReceipt}
          isVisible={isVisible} toBePaid={toBePaid}  setToByPaid={setToByPaid}
          activeDiscount={activeDiscount} setActiveDiscount={setActiveDiscount}
          discounts={discounts} setDiscounts={setDiscounts}
          comment={comment} setComment={setComment} setAmountFocused={setAmountFocused}
          selectedService={selectedService}
        />
      ) : (
          <CodePayment />
        )}
    </View>
  )
}

export default PaymentRightSide