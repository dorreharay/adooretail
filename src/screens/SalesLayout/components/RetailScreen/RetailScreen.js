import React, { useRef, useState, useEffect, } from 'react'
import { useDispatch } from 'react-redux'
import { Text, View, Image, StyleSheet, Animated, Easing } from 'react-native'
import _ from 'lodash'
import styles from './styles'

import LeftSide from './components/LeftSide/LeftSide';
import RightSide from './components/RightSide/RightSide';
import Panel from './components/Panel/Panel';
import PanelInstance from './components/Panel/components/PanelInstance'

import { setEndOfSessionStatus } from '../../../../../reducers/TempReducer';
import History from './components/Panel/components/History/History';
import PaymentModal from './components/LeftSide/components/PaymentModal';

function RetailScreen(props) {
  const { products, loadProducts, navigation, } = props;

  const dispatch = useDispatch()

  const [receipts, setReceipts] = useState([[], [], [], []])
  const [selectedInstance, selectReceiptInstance] = useState(0)
  const [selectedDate, selectDate] = useState(false)

  const handleNewDate = (newDate) => {
    selectDate(newDate)
  }

  const initialPanelScreens = { history: false, devices: false, transactions: false, }

  const [panelScreenState, setPanelScreenState] = useState(initialPanelScreens)

  const [menuVisible, setMenuVisibility] = useState(false)
  const [modalOpacity] = useState(new Animated.Value(0))

  const [menuButtons] = useState([
    {
      name: 'Історія замовлень',
      onPress: () => openPanelInstance('history', 'ІСТОРІЯ ЗАМОВЛЕНЬ'),
    },
    { name: 'Пристрої', onPress: () => openPanelInstance('devices', 'ПРИСТРОЇ') },
    { name: 'Транзакції', onPress: () => openPanelInstance('transactions', 'ТРАНЗАКЦІЇ') },
    { name: 'Налаштування', onPress: () => openPanelInstance('transactions', 'НАЛАШТУВАННЯ') },
    { name: 'Змінити аккаунт', onPress: () => { } },
  ])

  const openPanelInstance = (instanceName, title) => {
    setMenuVisibility(false)
    setPanelScreenState({ ...initialPanelScreens, [instanceName]: title })
  }

  const closePanelInstance = () => setPanelScreenState(initialPanelScreens)

  const openMenu = () => {
    setTimeout(() => {
      setMenuVisibility(true)

      setTimeout(() => {
        handleModalAnimation()
      }, 10)
    }, 50)
  }

  const closeMenu = () => {
    setTimeout(() => {
      setMenuVisibility(false)

      setTimeout(() => {
        handleModalAnimation()
      }, 10)
    }, 170)
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
          openPanelInstance={openPanelInstance}
          menuButtons={menuButtons}
        />
      )}

      {!_.isEqual(panelScreenState, initialPanelScreens) && (
        <PanelInstance
          selectedDate={selectedDate} selectDate={selectDate}
          handleNewDate={handleNewDate}
          closePanelInstance={closePanelInstance}
          panelScreenState={panelScreenState}
        >
          {panelScreenState.history && (
            <History
              selectedDate={selectedDate}
              handleNewDate={handleNewDate}
            />
          )}
          {panelScreenState.devices && (
            <View>

            </View>
          )}
          {panelScreenState.transactions && (
            <View>

            </View>
          )}
        </PanelInstance>
      )}

    </View>
  )
}

export default RetailScreen