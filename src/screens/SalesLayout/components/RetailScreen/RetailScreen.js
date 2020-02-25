import React, { useRef, useState, useEffect, useMemo, } from 'react'
import { View, } from 'react-native'
import { useDispatch, useSelector, } from 'react-redux'
import _ from 'lodash'
import styles from './styles'
import API from '@api'
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

  const [menuVisible, setMenuVisibility] = useState(false)
  const [paymentModalVisible, setPaymentModalVisibility] = useState(false)
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
        setPaymentModalState={setPaymentModalState}
      />
      <RightSide
        products={products} loadProducts={loadProducts}
        account={account} openMenu={openMenu}
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
      />
    </View>
  )
}