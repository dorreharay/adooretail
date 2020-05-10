import React, { useState, useEffect, useRef, useMemo, } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Keyboard, Animated, KeyboardAvoidingView, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'

import { syncReceipt, setCurrentService, } from '@reducers/UserReducer'
import { printReceipt } from '@printer'

import { currentSessionSelector, currentAccountSelector, } from '@selectors'
import { getFormattedDate, } from '@dateFormatter'

import SharedButton from '@shared/SharedButton'
import PaymentLeftSide from './components/PaymentLeftSide/PaymentLeftSide';
import PaymentRightSide from './components/PaymentRightSide/PaymentRightSide';
import EmployeePicker from './components/EmployeePicker/EmployeePicker'
import DeliveryPickerOld from './components/DeliveryPickerOld/DeliveryPickerOld'

import { deviceWidth, deviceHeight } from '@dimensions'

const PaymentModal = (props) => {
  const { isVisible, setPaymentModalVisibility, buffer, setBuffer, oldReceiptState, setOldReceipt, } = props;

  const timerRef1 = useRef(null)
  const timerRef2 = useRef(null)
  const willShowRef = useRef(null)
  const willHideRef = useRef(null)

  const dispatch = useDispatch()

  const currentService = useSelector(state => state.user.currentService) || 0
  const currentEmployee = useSelector(state => state.user.currentEmployee) || 0
  const currentSession = useSelector(currentSessionSelector)
  const currentAccount = useSelector(currentAccountSelector)
  const receipts = useSelector(state => state.orders.receipts)
  const selectedReceiptIndex = useSelector(state => state.orders.selectedReceiptIndex)

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
  const [modalOffset, setModalOffset] = useState(0)
  const [amountFocused, setAmountFocused] = useState(false)

  const [activeDiscount, setActiveDiscount] = useState(0)
  const [discounts, setDiscounts] = useState([{ percent: 0 }, { percent: 10 }, { percent: 20 }, { percent: 30 }, { percent: 50 }])
  const [comment, setComment] = useState('')
  const [toBePaid, setToByPaid] = useState(receiptSum)
  const [deliveryListVisible, setDeliveryListVisibility] = useState(false)

  const saveReceipt = async (paymentType) => {
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

    let receiptId = guidGenerator()

    if (buffer[selectedReceiptIndex]) {
      receiptId = buffer[selectedReceiptIndex].hash_id
    }

    const payload = {
      payment_type: paymentType,
      receipt: currentReceipt,
      total: toBePaid,
      initial: receiptSum,
      input: parseFloat(enteredSum),
      change: +((+enteredSum) - receiptSum).toFixed(2).replace(".00", ""),
      discount: `${discounts[activeDiscount].percent}%`,
      hash_id: receiptId,
      first_product_time: timeStart,
      last_product_time: timeEnd,
      transaction_time_end: getFormattedDate('YYYY-MM-DD HH:mm:ss'),
      employee: currentSession ? currentSession.employees[currentEmployee] : '',
      comment: comment,
      service: currentAccount && currentAccount.available_services ? currentAccount.available_services[currentService].id : '',
    }

    if (!payload) return

    const newBuffer = buffer.map((item, index) => index === selectedReceiptIndex ? null : item)

    setBuffer(newBuffer)

    const newOldReceipt = oldReceiptState.map((item, index) => index === selectedReceiptIndex ? null : item)

    setOldReceipt(newOldReceipt)

    try {
      if (currentAccount && currentAccount.settings && currentAccount.settings.printer_enabled) {
        await printReceipt(payload)
      }

      timerRef2.current = setTimeout(() => {
        dispatch(syncReceipt(payload))
        dispatch(setCurrentService(0))
      }, 300)
    } catch (error) {
      throw new Error()
    }
  }

  const [buttonAccessible, setButtonAccessibility] = useState(true)

  const [pTypes] = useState([
    {
      index: 0,
      name: 'Готівка',
      apiName: 'cash',
      imageSource: require('@images/cash.png'),
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

  useMemo(() => {
    setStatus(initialStatuses.waiting)

    if (currentAccount && currentAccount.settings && !currentAccount.settings.default_payment_types.unset) {
      if (currentAccount.settings.default_payment_types.cash) {
        selectPType(pTypes[0])
      } else {
        selectPType(pTypes[1])
      }
    }
  }, [isVisible])

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
    function upModal() {
      setModalOffset(-200)
    }

    function downModal() {
      setModalOffset(0)
    }

    willShowRef.current = Keyboard.addListener('keyboardWillShow', upModal);
    willHideRef.current = Keyboard.addListener('keyboardWillHide', downModal);

    return () => {
      Keyboard.removeListener("keyboardWillShow", upModal);
      Keyboard.removeListener("keyboardWillHide", downModal);
    }
  }, [])

  // useEffect(() => {
  //   if(isVisible) {
  //     setModalOffset(new Animated.Value(0))
  //   } else {
  //     setModalOffset(new Animated.Value(2000))
  //   }
  //   resetStatus()
  // }, [isVisible])

  useEffect(() => {
    const percent = discounts[activeDiscount].percent

    if (activeDiscount === 0) {
      return
    }

    const updatedValue = (receiptSum - ((receiptSum / 100) * percent)).toFixed(2).replace('.00', '')

    setToByPaid(updatedValue)
  }, [activeDiscount, receiptSum])

  const receiptSum = useMemo(() => {
    const newSum = receipts[selectedReceiptIndex].reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), false)

    setEnteredSum(newSum)

    return newSum
  }, [receipts, selectedReceiptIndex])

  return (
    <View style={[styles.paymentWrapperContainer, { top: 4000, }, isVisible && { top: modalOffset, },]}>
      <TouchableOpacity
        style={styles.paymentWrapper}
        onPress={() => setPaymentModalVisibility(false)}
        activeOpacity={1}
      />
      <KeyboardAwareScrollView
        style={{ paddingTop: (deviceHeight - (deviceHeight * 0.85)) / 2, zIndex: 13, }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        extraScrollHeight={amountFocused ? 0 : 100}
        keyboardOpeningTime={0}
        enableOnAndroid={true}
      >

        <View style={styles.paymentModal}>
          <PaymentLeftSide
            pTypes={pTypes}
            selectedType={selectedType}
            selectPType={selectPType}
            setEmployeesListVisibility={setEmployeesListVisibility}
            currentEmployee={currentEmployee}
            setDeliveryListVisibility={setDeliveryListVisibility}
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
            toBePaid={toBePaid} setToByPaid={setToByPaid}
            setAmountFocused={setAmountFocused}
          />
        </View>
      </KeyboardAwareScrollView>
      <EmployeePicker
        visible={employeesListVisible}
        onClickOutside={setEmployeesListVisibility}
      />
      <DeliveryPickerOld
        visible={deliveryListVisible}
        onClickOutside={setDeliveryListVisibility}
      />
    </View>
  )
}

export default PaymentModal