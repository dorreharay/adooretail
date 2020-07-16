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

function RetailScreen(props) {
  const {} = props;
  
  const toastRef = useRef(null)

  const navigation = useNavigation()

  useEffect(() => {
    loadProducts(toastRef)

    navigation.addListener('focus', () => {
      loadProducts(toastRef)
    })
  }, [])

  return (
    <View style={styles.container}>
      <LeftSide />
      <RightSide />
      
      <Menu />
      <PaymentModal />
      <Transaction />
      <Session />

      <SharedToast ref={toastRef} />
    </View>
  )
}

export default RetailScreen