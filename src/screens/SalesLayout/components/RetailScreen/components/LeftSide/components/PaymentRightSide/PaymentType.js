import React from 'react'
import { View, Text, ScrollView, TextInput, } from 'react-native'

import styles from './styles'

import PaymentSubmit from '../PaymentSubmit'
import CardPaymentStatus from './CardPaymentStatus'

function PaymentType(props) {
  const {
    selectedType, enteredSum, total, invalidColor, status, setStatus,
    initialStatuses, resetStatus, setPaymentModalVisibility, buttonAccessible,
    handleChangeSum, receipt,
  } = props

  return (
    <>
      <View style={styles.totalDetails}>
        <View style={styles.toByPaid}>
          <Text style={styles.toByPaidText}>{total} грн до сплати</Text>
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

      <ScrollView style={styles.orderContainer} contentContainerStyle={{ paddingBottom: 2, }}>
        {receipt.map((item, index) => (
          <View style={styles.orderItem} key={index}>
            <Text style={[styles.orderItemText, { width: '55%', }]}>{item.title}</Text>
            <Text style={styles.orderItemText}>{item.price} грн</Text>
            <Text style={styles.orderItemText}>{item.quantity} шт</Text>
          </View>
        ))}
      </ScrollView>

      <PaymentSubmit
        status={status}
        buttonAccessible={buttonAccessible}
        selectedType={selectedType}
        setPaymentModalVisibility={setPaymentModalVisibility}
      />
    </>
  )
}

export default PaymentType
