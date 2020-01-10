import React, { useState, useEffect, } from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView, } from 'react-native'
import FastImage from 'react-native-fast-image';
import styles from './styles'

import SharedButton from '@shared/SharedButton';
import PaymentSubmit from '../PaymentSubmit'
import CardPaymentStatus from './CardPaymentStatus'

function PaymentRightSide(props) {
  const {
    total = 250, setPaymentModalVisibility,
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

    // if(enteredSum.length === 1) return

    setEnteredSum(value)
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Деталі оплати</Text>

        <SharedButton
          forceStyles={styles.cancelButton}
          onPress={() => {
            setPaymentModalVisibility(false)
            resetStatus()
          }}
          scale={0.9}
        >
          <Text style={styles.cancelButtonText}>Скасувати оплату</Text>
        </SharedButton>
      </View>


      <View style={styles.totalDetails}>
        <View style={styles.toByPaid}>
          <Text style={styles.toByPaidText}>250 грн до сплати</Text>
        </View>

        {selectedType.index === 0 && (
          <View style={[styles.secondContainer, { justifyContent: 'space-between', paddingRight: '7%', }]}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <TextInput
                style={[styles.paidInput, invalidColor ? { color: '#E35E62', borderColor: '#E35E62', } : { color: '#39B14C', borderColor: '#39B14C', }]}
                value={enteredSum}
                onChangeText={handleChangeSum}
                keyboardType='number-pad'
              />
              <Text style={styles.paidText}>грн внесено</Text>
            </View>
            <Text style={styles.changeText}>Решта: {(+enteredSum) - total}</Text>
          </View>
        )}

        {selectedType.index === 1 && (
          <CardPaymentStatus
            status={status}
            setStatus={setStatus}
            initialStatuses={initialStatuses}
            resetStatus={resetStatus}
          />
        )}
      </View>

      <Text style={styles.headingText}>Замовлення</Text>

      <ScrollView style={styles.orderContainer}>
        <View style={styles.orderItem}></View>
        <View style={styles.orderItem}></View>
        <View style={styles.orderItem}></View>
        <View style={styles.orderItem}></View>
      </ScrollView>

      <PaymentSubmit
        buttonAccessible={buttonAccessible}
        selectedType={selectedType}
        setPaymentModalVisibility={setPaymentModalVisibility}
      />
    </View>
  )
}

export default PaymentRightSide