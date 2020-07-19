import React, { useRef, useState, useEffect, } from 'react'
import { View, } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash'
import styles from './styles'

import { loadProducts, } from '@helpers'

import SharedToast from '@shared/SharedToast/SharedToast'
import LeftSide from './views/LeftSide/LeftSide';
import RightSide from './views/RightSide/RightSide';
import Menu from './components/Menu/Menu';
import Transaction from './components/Transaction/Transaction';
import PaymentModal from './components/PaymentModal/PaymentModal';
import Session from './components/Session/Session'
import ReceiptOptions from './components/ReceiptOptions/ReceiptOptions'

function RetailScreen(props) {
  const {} = props;
  
  const toastRef = useRef(null)

  const navigation = useNavigation()

  useEffect(() => {
    loadProducts(toastRef?.current)

    navigation.addListener('focus', () => {
      loadProducts(toastRef?.current)
    })
  }, [])

  return (
    <View style={styles.container}>
      <LeftSide />
      <RightSide toastRef={toastRef} />
      
      <Menu />
      <PaymentModal />
      <Transaction />
      <Session />
      <ReceiptOptions />

      <SharedToast ref={toastRef} />
    </View>
  )
}

export default RetailScreen