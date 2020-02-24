import React, { useState, useEffect, useRef, useMemo, } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Keyboard, Animated, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux'
import Ripple from 'react-native-material-ripple';
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'

import { syncReceipt } from '@reducers/UserReducer'

import { currentSessionSelector, currentAccountSelector, } from '@selectors'
import { getFormattedDate, } from '@dateFormatter'

import SharedButton from '@shared/SharedButton'
import PaymentLeftSide from '../PaymentLeftSide/PaymentLeftSide';
import PaymentRightSide from '../PaymentRightSide/PaymentRightSide';

import { deviceWidth, deviceHeight } from '@dimensions'

const PaymentModal = (props) => {
  const { isVisible, setPaymentModalVisibility, } = props;

  const timerRef1 = useRef(null)
  const timerRef2 = useRef(null)
  const willShowRef = useRef(null)
  const willHideRef = useRef(null)

  const dispatch = useDispatch()
  const currentSession = useSelector(currentSessionSelector)
  const currentAccount = useSelector(currentAccountSelector)
  const receipts = useSelector(state => state.temp.receipts)
  const selectedReceiptIndex = useSelector(state => state.temp.selectedReceiptIndex)

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
  const [enteredSum, setEnteredSum] = useState('0')
  const [employeesListVisible, setEmployeesListVisibility] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState(currentSession.employees[0])
  const [modalOffset, setModalOffset] = useState(new Animated.Value(0))

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

    const currentReceipt = receipts[selectedReceiptIndex]

    const firstReceipt = currentReceipt[0]
    const lastReceipt = currentReceipt[currentReceipt.length - 1]
    const timeStart = firstReceipt.time
    const timeEnd = lastReceipt.time

    const payload = {
      payment_type: paymentType,
      receipt: currentReceipt,
      total: receiptSum,
      input: parseFloat(enteredSum),
      change: +((+enteredSum) - receiptSum).toFixed(2).replace(".00", ""),
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
      dispatch(syncReceipt(payload))
    }, 300)
  }

  const [buttonAccessible, setButtonAccessibility] = useState(true)

  const [pTypes] = useState([
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
    return () => {
      clearTimeout(timerRef1.current)
      clearTimeout(timerRef2.current)
    }
  }, [])

  useEffect(() => {
    willShowRef.current = Keyboard.addListener('keyboardWillShow', () => {
      Animated.timing(
        modalOffset,
        {
          toValue: -200,
          duration: 200,
        },
      ).start()
    });
    willHideRef.current = Keyboard.addListener('keyboardWillHide', () => Animated.timing(
      modalOffset,
      {
        toValue: 0,
        duration: 200,
      },
    ).start());

    return () => {
      willShowRef.current.remove();
      willHideRef.current.remove();
    }
  }, [])

  useEffect(() => {
    if(isVisible) {
      Animated.timing(
        modalOffset,
        {
          toValue: 0,
          duration: 0,
        },
      ).start()
    } else {
      Animated.timing(
        modalOffset,
        {
          toValue: 2000,
          duration: 0,
        },
      ).start()
    }
    resetStatus()
  }, [isVisible])

  const receiptSum = useMemo(() => {
    const newSum = receipts[selectedReceiptIndex].reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), false)

    setEnteredSum(newSum)

    return newSum
  }, [receipts])

  return (
    <View style={[styles.paymentWrapperContainer, { top: 4000, }, isVisible && { top: 0 },]}>
      <TouchableOpacity
        style={styles.paymentWrapper}
        activeOpacity={1}
      />
      <Animated.View style={[styles.paymentModal, { top: modalOffset, width: deviceWidth * 0.72, height: deviceWidth * 0.55, }]}>
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
          status={status} total={receiptSum}
          setStatus={setStatus} resetStatus={resetStatus}
          buttonAccessible={buttonAccessible}
          enteredSum={enteredSum} saveReceipt={saveReceipt}
          setEnteredSum={setEnteredSum} isVisible={isVisible}
          setButtonAccessibility={setButtonAccessibility}
          activeDiscount={activeDiscount} setActiveDiscount={setActiveDiscount}
          discounts={discounts} setDiscounts={setDiscounts}
          comment={comment} setComment={setComment}
        />
      </Animated.View>


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