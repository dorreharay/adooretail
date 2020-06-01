import React, { useRef, useState, useEffect, useMemo, } from 'react'
import { View, } from 'react-native'
import { useDispatch, useSelector, } from 'react-redux'
import {DURATION} from 'react-native-easy-toast'
import _ from 'lodash'
import styles from './styles'
import API from '@api'
import LeftSide from './components/LeftSide/LeftSide';
import RightSide from './components/RightSide/RightSide';
import Menu from './components/Menu/Menu';

import PaymentModal from './components/LeftSide/components/PaymentModal/PaymentModal';
import Transaction from './components/Transaction/Transaction'

function RetailScreen(props) {
  const {
    products, navigation, openChangeAccountOverview,
    updateLayout, toastRef, layout,
  } = props;
  const timerRef1 = useRef(null)
  const timerRef2 = useRef(null)
  const timerRef3 = useRef(null)
  const timerRef4 = useRef(null)

  const currentAccount = useSelector(state => state.user.currentAccount)

  const [menuVisible, setMenuVisibility] = useState(false)
  const [paymentModalVisible, setPaymentModalVisibility] = useState(false)
  const [transactionModalVisible, setTransactionModalVisiblity] = useState(false)
  const [buffer, setBuffer] = useState([null, null, null, null])
  const [oldReceiptState, setOldReceipt] = useState([null, null, null, null])

  const setPaymentModalState = (state) => setPaymentModalVisibility(state)
  const loadProducts = async () => {
    try {
      toastRef.current.show("Синхронізація", DURATION.FOREVER);
      const data = await API.getProducts({}, currentAccount._id)
      
      if (!data) {
        toastRef.current.close()

        throw new Error('Not valid request')
      }

      updateLayout(data, layout)
    } catch (error) {
      console.warn('Failed to fetch products', error)
      toastRef.current.show("Помилка мережі", 1000);
    } finally {
      toastRef.current.close()
    }
  }

  const openMenu = () => setMenuVisibility(true)
  const closeMenu = () => setMenuVisibility(false)

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadProducts()
    })
  }, [])

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
        setPaymentModalState={setPaymentModalState}
        buffer={buffer}
        setBuffer={setBuffer}
        oldReceiptState={oldReceiptState}
        setOldReceipt={setOldReceipt}
      />
      <RightSide
        products={products} loadProducts={loadProducts}
        openMenu={openMenu}
        navigation={navigation} paymentModalVisible={paymentModalVisible}
        updateProductsLayout={updateLayout}
      />
      <Menu
        isVisible={menuVisible}
        closeMenu={closeMenu}
        openChangeAccountOverview={openChangeAccountOverview}
        setTransactionModalVisiblity={setTransactionModalVisiblity}
        navigation={navigation}
      />
      <PaymentModal
        isVisible={paymentModalVisible}
        setPaymentModalVisibility={setPaymentModalVisibility}
        buffer={buffer}
        setBuffer={setBuffer}
        oldReceiptState={oldReceiptState}
        setOldReceipt={setOldReceipt}
      />
      <Transaction 
        isVisible={transactionModalVisible}
        setTransactionModalVisiblity={setTransactionModalVisiblity}
      />
    </View>
  )
}

export default RetailScreen