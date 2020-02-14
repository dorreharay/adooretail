import React, { useState, useEffect, useRef, } from 'react'
import { View, Text, TouchableOpacity, ScrollView, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux'
import Ripple from 'react-native-material-ripple';
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'

import { saveLocalReceipt } from '@reducers/UserReducer'

import { currentSessionSelector, currentAccountSelector, } from '@selectors'
import { getFormattedDate, } from '@dateFormatter'

import SharedButton from '@shared/SharedButton'
import PaymentLeftSide from '../PaymentLeftSide/PaymentLeftSide';
import PaymentRightSide from '../PaymentRightSide/PaymentRightSide';

import { deviceWidth, deviceHeight } from '@dimensions'

const PaymentModal = (props) => {
  const {
    setPaymentModalVisibility, isVisible,
    currentReceipt, clearCurrentReceipt,
  } = props;

  const timerRef1 = useRef(null)
  const timerRef2 = useRef(null)

  const dispatch = useDispatch()
  const currentSession = useSelector(currentSessionSelector)
  const currentAccount = useSelector(currentAccountSelector)

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

  const [activeDiscount, setActiveDiscount] = useState(0)
  const [discounts, setDiscounts] = useState([{ percent: 0 }, { percent: 10 }, { percent: 20 }, { percent: 30 }, { percent: 50 }])
  const [comment, setComment] = useState('')

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
      discount: `${discounts[activeDiscount].percent}%`,
      hash_id: guidGenerator(),
      first_product_time: timeStart,
      last_product_time: timeEnd,
      transaction_time_end: getFormattedDate('YYYY-MM-DD HH:mm:ss'),
      employee: currentEmployee,
      comment: comment,
    }

    if (!payload) return

    timerRef2.current = setTimeout(() => {
      dispatch(saveLocalReceipt(payload))
    }, 300)
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
  ])
  const [selectedType, selectPType] = useState(pTypes[0])

  const handleCardPayment = () => {
    setStatus(initialStatuses.success)

    timerRef1.current = setTimeout(() => {
      setPaymentModalVisibility(false)
      setButtonAccessibility(true)
    }, 500)
  }

  const resetStatus = () => {
    setStatus(initialStatuses.waiting)
    setButtonAccessibility(true)
  }

  useEffect(() => {
    setEnteredSum(currentReceipt.receiptSum)
  }, [currentReceipt.receiptSum])

  useEffect(() => {
    return () => {
      clearTimeout(timerRef1.current)
      clearTimeout(timerRef2.current)
    }
  }, [])


  useEffect(() => {
    resetStatus()
  }, [isVisible])

  return (
    <View style={[styles.paymentWrapperContainer, { position: 'absolute', top: 4000, }, isVisible && { top: 0, }]} pointerEvents={isVisible ? 'auto' : 'none'}>
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
          setEnteredSum={setEnteredSum} isVisible={isVisible}
          setButtonAccessibility={setButtonAccessibility}
          clearCurrentReceipt={clearCurrentReceipt}
          activeDiscount={activeDiscount} setActiveDiscount={setActiveDiscount}
          discounts={discounts} setDiscounts={setDiscounts}
          comment={comment} setComment={setComment}
        />
      </View>


      {employeesListVisible && (
        <TouchableOpacity
          style={[styles.employeesListContainer, { width: deviceWidth, height: deviceHeight, left: 0, }]}
          onPress={() => setEmployeesListVisibility(false)}
          activeOpacity={1}
        >
          <View style={{ width: '37%', height: '50%', borderRadius: 3, backgroundColor: '#FFFFFF' }}>
            <Text style={styles.employeesListHeading}>Оберіть працівника</Text>

            <ScrollView style={styles.employeesList}>
              {currentSession.employees.map((item, key) => (
                <Ripple
                  style={styles.employeesListItem}
                  onPress={() => {
                    if (currentEmployee === item) return

                    setEmployeesListVisibility(false)
                    setCurrentEmployee(item)
                  }}
                  rippleColor={`#C4C4C4`}
                  rippleFades key={key}
                >
                  <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <FastImage
                      style={{ width: 40, height: 40, backgroundColor: '#DDDDDD', borderRadius: 100, }}
                      source={{ uri: currentAccount.img_url }}
                    />
                    <Text style={styles.employeesListItemName}>{item}</Text>
                  </View>
                  <View style={styles.pickEmployeeButton}>
                    <SharedButton>
                      <LinearGradient
                        style={styles.pickEmployeeButtonLinear}
                        start={{ x: 1, y: 1 }}
                        end={{ x: 0, y: 2 }}
                        colors={currentEmployee !== item ? ['#DB3E69', '#FD9C6C'] : ['#f4f4f4', '#f4f4f4']}
                      >
                        <Text style={[styles.pickEmployeeButtonText, currentEmployee === item && { color: '#A4A4A4' }]}>обрати</Text>
                      </LinearGradient>
                    </SharedButton>
                  </View>
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