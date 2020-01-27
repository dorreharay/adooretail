import React, { useState, useEffect, useRef, } from 'react'
import { View, Text, TouchableOpacity, ScrollView, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux'
import Ripple from 'react-native-material-ripple';
let moment = require('moment-timezone');
moment.locale('uk');
import styles from '../../../styles'

import { saveLocalReceipt } from '@reducers/UserReducer'
import { currentSessionSelector, } from '@selectors'

import PaymentLeftSide from './PaymentLeftSide/PaymentLeftSide';
import PaymentRightSide from './PaymentRightSide/PaymentRightSide';

const PaymentModal = (props) => {
  const {
    setPaymentModalVisibility, isVisible,
    currentReceipt, clearCurrentReceipt,
  } = props;

  const dispatch = useDispatch()
  const { deviceWidth, deviceHeight } = useSelector(state => state.temp.dimensions)
  const currentSession = useSelector(currentSessionSelector)

  const blurRef = useRef(null)

  const initialStatuses = {
    initial: {
      index: 0,
      statusColor: '#EDEDED',
      statusText: 'Очікування',
      blinking: false,
    },
    waiting: {
      index: 1,
      statusColor: 'yellow',
      statusText: 'Очікування оплати в терміналі',
      blinking: true,
    },
    success: {
      index: 2,
      statusColor: '#6FE37A',
      statusText: 'Оплата проведена',
      blinking: false,
    }
  }

  const [status, setStatus] = useState(initialStatuses.waiting)
  const [enteredSum, setEnteredSum] = useState(`${currentReceipt.receiptSum}`)
  const [employeesListVisible, setEmployeesListVisibility] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState(currentSession.employees[0])

  useEffect(() => {
    setEnteredSum(`${currentReceipt.receiptSum}`)
  }, [currentReceipt])

  const saveReceipt = (paymentType) => {
    function guidGenerator() {
      let S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    const firstReceipt = currentReceipt.payload[0]
    const lastReceipt = currentReceipt.payload[currentReceipt.payload.length - 1]
    const timeStart = firstReceipt.time
    const timeEnd = lastReceipt.time

    const payload = {
      payment_type: paymentType,
      receipt: currentReceipt.payload,
      total: currentReceipt.receiptSum,
      input: parseFloat(enteredSum),
      change: +((+enteredSum) - currentReceipt.receiptSum).toFixed(2).replace(".00", ""),
      localId: guidGenerator(),
      first_product_time: timeStart,
      last_product_time: timeEnd,
      employee: currentEmployee,
      transaction_time_end: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    }

    if (!payload) return

    dispatch(saveLocalReceipt(payload))
  }

  const [buttonAccessible, setButtonAccessibility] = useState(true)
  const [pTypes, setPTypes] = useState([
    {
      index: 0,
      name: 'Готівка',
      apiName: 'cash',
      imageSource: require('@images/dollar.png'),
      onPress: (callBack) => {
        callBack()
        setPaymentModalVisibility(false)
      },
      buttonText: 'Підтвердити',
    },
    {
      index: 1,
      name: 'Картка',
      apiName: 'card',
      imageSource: require('@images/debit.png'),
      onPress: (callBack) => {
        callBack()
        handleCardPayment()
      },
      buttonText: 'Підтвердити розрахунок',
    },
    {
      index: 2,
      name: 'Знижка',
      imageSource: require('@images/gift.png'),
      onPress: () => { },
      buttonText: '',
    },
  ])
  const [selectedType, selectPType] = useState(pTypes[0])

  const handleCardPayment = () => {
    setStatus(initialStatuses.success)

    setTimeout(() => {
      setPaymentModalVisibility(false)
      setButtonAccessibility(true)
    }, 500)
  }

  const resetStatus = () => {
    setStatus(initialStatuses.waiting)
    setButtonAccessibility(true)
  }

  useEffect(() => {
    resetStatus()
  }, [isVisible])

  return (
    <View style={[styles.paymentWrapperContainer, { position: 'absolute', top: 10000, }, isVisible && { top: 0, }]} pointerEvents={isVisible ? 'auto' : 'none'}>
      <TouchableOpacity
        style={styles.paymentWrapper}
        activeOpacity={1}
      />
      <View style={[styles.paymentModal, { width: deviceWidth * 0.72, height: deviceWidth * 0.55, }]}>
        <PaymentLeftSide
          pTypes={pTypes}
          selectedType={selectedType}
          selectPType={selectPType}
          setEmployeesListVisibility={setEmployeesListVisibility}
          currentEmployee={currentEmployee}
        />
        <PaymentRightSide
          selectedType={selectedType}
          setPaymentModalVisibility={setPaymentModalVisibility}
          initialStatuses={initialStatuses}
          status={status} total={currentReceipt.receiptSum}
          receipt={currentReceipt.payload}
          setStatus={setStatus} resetStatus={resetStatus}
          buttonAccessible={buttonAccessible}
          enteredSum={enteredSum} saveReceipt={saveReceipt}
          setEnteredSum={setEnteredSum}
          setButtonAccessibility={setButtonAccessibility}
          clearCurrentReceipt={clearCurrentReceipt}
        />
      </View>


      {employeesListVisible && (
        <TouchableOpacity
          style={[styles.employeesListContainer, { width: deviceWidth * 0.72, height: deviceWidth * 0.55, left: deviceWidth * 0.14, }]}
          onPress={() => setEmployeesListVisibility(false)}
          activeOpacity={1}
        >
          <View style={{ width: '50%', height: '70%', borderRadius: 3, backgroundColor: '#FFFFFF' }}>
            <Text style={styles.employeesListHeading}>Оберіть працівника</Text>

            <ScrollView style={styles.employeesList}>
              {currentSession.employees.map(item => (
                <Ripple
                  style={styles.employeesListItem}
                  onPress={() => {
                    setEmployeesListVisibility(false)
                    setCurrentEmployee(item)
                  }}
                  rippleColor={`#C4C4C4`}
                  rippleFades
                >
                  <View style={{ width: 40, height: 40, backgroundColor: '#DDDDDD', borderRadius: 100, }} />
                  <Text style={styles.employeesListItemName}>{item}</Text>
                </Ripple>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default PaymentModal