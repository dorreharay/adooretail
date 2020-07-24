import React, { useState, useEffect, useRef, useMemo, } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Keyboard, Animated, KeyboardAvoidingView, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BackgroundTimer from 'react-native-background-timer';
import styles from './styles'

import { setBuffer, setPaymentModalVisibility, setOldReceipt, } from '@reducers/TempReducer'
import { removeCurrentReceiptId } from '@reducers/OrdersReducer'
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
  const {} = props;

  const timerRef1 = useRef(null)
  const timerRef2 = useRef(null)
  const willShowRef = useRef(null)
  const willHideRef = useRef(null)

  const dispatch = useDispatch()

  const currentService = useSelector(state => state.user.currentService) || 0
  const currentEmployee = useSelector(state => state.user.currentEmployee) || 0
  const currentSession = useSelector(currentSessionSelector)
  const settings = useSelector(state => state.user.settings)
  const currentAccount = useSelector(state => state.user.currentAccount)
  const receipts = useSelector(state => state.orders.receipts)
  const selectedReceiptIndex = useSelector(state => state.orders.selectedReceiptIndex)
  const receiptsIds = useSelector(state => state.orders.receiptsIds)
  const buffer = useSelector(state => state.temp.buffer)
  const paymentModalVisibility  = useSelector(state => state.temp.paymentModalVisibility)
  const oldReceiptState = useSelector(state => state.temp.oldReceiptState)

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
    const currentReceipt = receipts[selectedReceiptIndex]

    const firstReceipt = currentReceipt[0]
    const lastReceipt = currentReceipt[currentReceipt.length - 1]
    const timeStart = firstReceipt.time
    const timeEnd = lastReceipt.time

    const receiptId = receiptsIds[selectedReceiptIndex]

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

    if (!payload) {
      return
    }

    const newBuffer = buffer.map((item, index) => index === selectedReceiptIndex ? null : item)

    dispatch(setBuffer(newBuffer))

    const newOldReceipt = oldReceiptState.map((item, index) => index === selectedReceiptIndex ? null : item)

    dispatch(setOldReceipt(newOldReceipt))

    try {
      if (settings.printer_enabled) {
        await printReceipt(payload)
      }

      dispatch(removeCurrentReceiptId())

      BackgroundTimer.setTimeout(() => {
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
        dispatch(setPaymentModalVisibility(false))
      },
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
    },
  ])
  const [selectedType, selectPType] = useState(pTypes[0])

  useMemo(() => {
    setStatus(initialStatuses.waiting)

    if (settings.payment_type_cash || settings.payment_type_debit) {
      if (settings.payment_type_cash_default) {
        selectPType(pTypes[0])
      } else {
        if (settings.payment_type_debit_default && !settings.payment_type_debit) {
          selectPType(pTypes[0])
          return
        }

        selectPType(pTypes[1])
      }
    }
  }, [paymentModalVisibility, settings,])

  const handleCardPayment = () => {
    setStatus(initialStatuses.success)

    BackgroundTimer.setTimeout(() => {
      dispatch(setPaymentModalVisibility(false))
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
  //   if(paymentModalVisibility) {
  //     setModalOffset(new Animated.Value(0))
  //   } else {
  //     setModalOffset(new Animated.Value(2000))
  //   }
  //   resetStatus()
  // }, [paymentModalVisibility])

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
    <View style={[styles.paymentWrapperContainer, { top: 4000, }, paymentModalVisibility && { top: modalOffset, },]}>
      <TouchableOpacity
        style={styles.paymentWrapper}
        onPress={() => dispatch(setPaymentModalVisibility(false))}
        activeOpacity={1}
      />
      <KeyboardAwareScrollView
        style={{ paddingTop: (deviceHeight - deviceHeight * 0.9) / 2, zIndex: 13, }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        extraScrollHeight={amountFocused ? 0 : 100}
        keyboardOpeningTime={0}
        enableOnAndroid={true}
      >

        <View style={styles.paymentModal}>
          <PaymentLeftSide
            pTypes={(settings.payment_type_debit && !settings.payment_type_cash) ? pTypes.slice(1) : (!settings.payment_type_debit && settings.payment_type_cash) ? pTypes.slice(0, 1) : pTypes}
            selectedType={selectedType}
            selectPType={selectPType}
            setEmployeesListVisibility={setEmployeesListVisibility}
            currentEmployee={currentEmployee}
            setDeliveryListVisibility={setDeliveryListVisibility}
          />
          <PaymentRightSide
            selectedType={selectedType}
            initialStatuses={initialStatuses}
            status={status} total={receiptSum}
            setStatus={setStatus} resetStatus={resetStatus}
            buttonAccessible={buttonAccessible}
            enteredSum={enteredSum} saveReceipt={saveReceipt}
            setEnteredSum={setEnteredSum} paymentModalVisibility={paymentModalVisibility}
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