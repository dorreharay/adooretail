import React, { useRef, useState, useEffect, } from 'react'
import { View, } from 'react-native'
import _ from 'lodash'
import styles from './styles'

import API from '@api'
import { getFormattedDate, } from '@dateFormatter'

import LeftSide from './components/LeftSide/LeftSide';
import RightSide from './components/RightSide/RightSide';
import Menu from './components/Menu/Menu';
import PaymentModal from './components/LeftSide/components/PaymentModal/PaymentModal';

function RetailScreen(props) {
  const {
    products, navigation, openChangeAccountOverview,
    account, updateLayout, toastRef, layout,
  } = props;

  const timerRef1 = useRef(null)
  const timerRef2 = useRef(null)
  const timerRef3 = useRef(null)
  const timerRef4 = useRef(null)

  const [receipts1, setReceipts1] = useState([])
  const [receipts2, setReceipts2] = useState([])
  const [receipts3, setReceipts3] = useState([])
  const [receipts4, setReceipts4] = useState([])
  const [menuVisible, setMenuVisibility] = useState(false)
  const [selectedInstance, selectReceiptInstance] = useState(0)
  const [paymentModalVisible, setPaymentModalVisibility] = useState(false)
  const [currentReceipt, setCurrentReceipt] = useState({})

  const setPaymentModalState = (state) => setPaymentModalVisibility(state)

  const loadProducts = async (token) => {
    try {
      toastRef.current.show("Синхронізація", 1000);

      const data = await API.getProducts({}, token)

      if (!data) {
        throw new Error('Not valid request')
      }

      updateLayout(data, layout)
    } catch (error) {
      console.warn('Failed to fetch products', error)
      toastRef.current.show("Помилка мережі", 1000);
    }
  }

  const getCurrentReceipt = () => {
    let receipts = []

    if(selectedInstance === 0) {
      receipts = receipts1
    }

    if(selectedInstance === 1) {
      receipts = receipts2
    }

    if(selectedInstance === 2) {
      receipts = receipts3
    }

    if(selectedInstance === 3) {
      receipts = receipts4
    }

    return receipts
  }

  const applyCurrentReceipt = (receipts) => {
    if(selectedInstance === 0) {
      setReceipts1(receipts)
    }

    if(selectedInstance === 1) {
      setReceipts2(receipts)
    }

    if(selectedInstance === 2) {
      setReceipts3(receipts)
    }

    if(selectedInstance === 3) {
      setReceipts4(receipts)
    }
  }

  const addProductQuantity = (product) => {
    let receipts = getCurrentReceipt()

    const productExists = !!receipts.find(item => item.title === product.title)

    let newReceiptsInstance = []

    if (productExists) {
      newReceiptsInstance = receipts.map((item, index) => {
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
        time: getFormattedDate('YYYY-MM-DD HH:mm:ss'),
      }

      newReceiptsInstance = [...receipts, initialReceiptItem]
    }

    const newReceipts = newReceiptsInstance

    applyCurrentReceipt(newReceipts)
  }

  const substractProductQuantity = (product) => {
    let receipts = getCurrentReceipt()
    let newReceiptsInstance = []

    if (product.quantity === 1) {
      newReceiptsInstance = receipts.filter((item, index) => item.title !== product.title)
    } else {
      newReceiptsInstance = receipts.map((item, index) => {
        if (item.title === product.title) {
          return ({ ...item, quantity: item.quantity - 1 })
        }

        return item
      })
    }

    const newReceipts = newReceiptsInstance

    applyCurrentReceipt(newReceipts)
  }

  const clearCurrentReceipt = () => {
    const newReceipts = []

    applyCurrentReceipt(newReceipts)
  }

  const openMenu = () => setMenuVisibility(true)
  const closeMenu = () => setMenuVisibility(false)

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
        receipts={getCurrentReceipt()} setReceipts={applyCurrentReceipt}
        receiptSum={currentReceipt.receiptSum}
        setCurrentReceipt={setCurrentReceipt}
        selectedInstance={selectedInstance} selectReceiptInstance={selectReceiptInstance}
        setPaymentModalState={setPaymentModalState}
        addProductQuantity={addProductQuantity}
        substractProductQuantity={substractProductQuantity}
      />
      <RightSide
        products={products} loadProducts={loadProducts}
        receipts={getCurrentReceipt()} setReceipts={applyCurrentReceipt}
        selectedInstance={selectedInstance}
        account={account} openMenu={openMenu}
        addProductQuantity={addProductQuantity}
        navigation={navigation}
      />

      <Menu
        isVisible={menuVisible}
        closeMenu={closeMenu}
        openChangeAccountOverview={openChangeAccountOverview}
        navigation={navigation}
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