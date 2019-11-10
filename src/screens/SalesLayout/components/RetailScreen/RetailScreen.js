import React, { useRef, useState, useEffect, } from 'react'
import { useDispatch } from 'react-redux'
import { Text, View, Image, StyleSheet, Animated, Easing } from 'react-native'
import styles from './styles'

import LeftSide from './components/LeftSide/LeftSide';
import RightSide from './components/RightSide/RightSide';
import Panel from './components/RightSide/Panel/Panel';

import { setEndOfSessionStatus } from '../../../../../reducers/TempReducer';

function RetailScreen(props) {
  const { products, loadProducts, navigation, } = props;

  const dispatch = useDispatch()

  const [receipts, setReceipts] = useState([[], [], [], []])
  const [selectedInstance, selectReceiptInstance] = useState(0)

  const [menuVisible, setMenuVisibility] = useState(false)
  const [modalOpacity] = useState(new Animated.Value(0))

  const openMenu = () => {
    setTimeout(() => {
      setMenuVisibility(true)

      setTimeout(() => {
        handleModalAnimation()
      }, 10)
    }, 50)
    setMenuVisibility(true)
  }

  const closeMenu = () => {
    setTimeout(() => {
      setMenuVisibility(false)

      setTimeout(() => {
        handleModalAnimation()
      }, 10)
    }, 150)
  }

  const handleModalAnimation = () => {
    Animated.timing(
      modalOpacity, 
      { 
        toValue: modalOpacity._value === 1 ? 0 : 1, 
        duration: 150, 
        easing: Easing.ease
      }
    ).start();
  }

  const endSession = () => {
    closeMenu()
    dispatch(setEndOfSessionStatus(true))

    navigation.navigate('InputCash')
  }

  return (
    <View style={styles.container}>
      <LeftSide
        receipts={receipts}
        setReceipts={setReceipts}
        selectedInstance={selectedInstance}
        selectReceiptInstance={selectReceiptInstance}
      />
      <RightSide
        products={products}
        loadProducts={loadProducts}
        receipts={receipts}
        setReceipts={setReceipts}
        navigation={navigation}
        selectedInstance={selectedInstance}
        openMenu={openMenu}
      />
      {menuVisible && (
        <Panel 
          openMenu={openMenu}
          closeMenu={closeMenu}
          endSession={endSession}
          modalOpacity={modalOpacity}
        />
      )}
    </View>
  )
}

export default RetailScreen