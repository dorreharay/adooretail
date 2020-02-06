import React, { useRef, useState, useEffect, } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Text, View, Image, StyleSheet, Animated, Easing, TouchableOpacity, } from 'react-native'
import _ from 'lodash'
import axios from 'axios'
let moment = require('moment-timezone');
moment.locale('uk');
import styles from './styles'

import { API_URL } from '@api'

import LeftSide from './components/LeftSide/LeftSide';
import RightSide from './components/RightSide/RightSide';
import Menu from './components/Menu/Menu';
import PaymentModal from './components/LeftSide/components/PaymentModal/PaymentModal';

function RetailScreen(props) {
  const {
    products, navigation, openChangeAccountOverview,
    account, updateLayout, toastRef, layout, setModalStatus,
  } = props;

  const timerRef1 = useRef(null)
  const timerRef2 = useRef(null)
  const timerRef3 = useRef(null)
  const timerRef4 = useRef(null)

  const dispatch = useDispatch()

  const [receipts, setReceipts] = useState([[], [], [], []])
  const [menuVisible, setMenuVisibility] = useState(false)
  const [selectedInstance, selectReceiptInstance] = useState(0)

  const [paymentModalVisible, setPaymentModalVisibility] = useState(false)
  const [currentReceipt, setCurrentReceipt] = useState({})

  const throttleRef = useRef(_.debounce((callback) => callback(), 1000, { 'trailing': false }))

  const setPaymentModalState = (state, receipt) => {
    setPaymentModalVisibility(state)
  }

  const loadProducts = async (token) => {
    try {
      console.log('Fetching products ---->', `${API_URL}/user/products/${token}`)
      toastRef.current.show("Синхронізація", 1000);

      const { data } = await axios.get(`${API_URL}/user/products/${token}`)

      console.log('Fetch succeded')

      updateLayout(data.products, layout)
    } catch (error) {
      console.warn('Failed to fetch products', error)
      toastRef.current.show("Помилка мережі", 1000);
    }
  }

  const addProductQuantity = (product) => (force) => {
    const productExists = !!receipts[selectedInstance].find(item => item.title === product.title)

    let newReceiptsInstance = []

    if (productExists) {
      newReceiptsInstance = receipts[selectedInstance].map((item, index) => {
        if (item.title === product.title) {
          return ({ ...item, quantity: item.quantity + 1 })
        }

        return item
      })
    } else {
      let initialReceiptItem = {
        title: product.title,
        price: product.price,
        quantity: 1,
        time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      }

      newReceiptsInstance = [...receipts[selectedInstance], initialReceiptItem]
    }

    const newReceipts = receipts.map((item, index) => selectedInstance === index ? newReceiptsInstance : item)

    setReceipts(newReceipts)
  }

  const substractProductQuantity = (product) => (force) => {
    let newReceiptsInstance = []

    if (product.quantity === 1) {
      newReceiptsInstance = receipts[selectedInstance].filter((item, index) => item.title !== product.title)
    } else {
      newReceiptsInstance = receipts[selectedInstance].map((item, index) => {
        if (item.title === product.title) {
          return ({ ...item, quantity: item.quantity - 1 })
        }

        return item
      })
    }

    const newReceipts = receipts.map((item, index) => selectedInstance === index ? newReceiptsInstance : item)

    setReceipts(newReceipts)
  }

  const clearCurrentReceipt = () => {
    const newReceipts = receipts.map((item, index) => index === selectedInstance ? ([]) : item)

    setReceipts(newReceipts)
  }

  const openMenu = () => {
    setMenuVisibility(true)
  }

  const closeMenu = () => {
    setMenuVisibility(false)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timerRef1.current)
      clearTimeout(timerRef2.current)
      clearTimeout(timerRef3.current)
      clearTimeout(timerRef4.current)
    }
  }, [])

  return (
    <View style={styles.container}>
      <LeftSide
        receipts={receipts}
        receiptSum={currentReceipt.receiptSum}
        setReceipts={setReceipts}
        setCurrentReceipt={setCurrentReceipt}
        selectedInstance={selectedInstance}
        selectReceiptInstance={selectReceiptInstance}
        setPaymentModalState={setPaymentModalState}
        addProductQuantity={addProductQuantity}
        substractProductQuantity={substractProductQuantity}
      />
      <RightSide
        products={products}
        loadProducts={loadProducts}
        receipts={receipts}
        setReceipts={setReceipts}
        navigation={navigation}
        selectedInstance={selectedInstance}
        account={account} openMenu={openMenu}
        addProductQuantity={addProductQuantity}
      />

      <Menu
        isVisible={menuVisible}
        closeMenu={closeMenu}
        navigation={navigation}
        openChangeAccountOverview={openChangeAccountOverview}
      />

      <PaymentModal
        isVisible={paymentModalVisible}
        setPaymentModalVisibility={setPaymentModalVisibility}
        currentReceipt={currentReceipt}
        clearCurrentReceipt={clearCurrentReceipt}
      />
    </View>
  )
}

export default RetailScreen