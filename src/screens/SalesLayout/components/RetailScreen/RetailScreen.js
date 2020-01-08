import React, { useRef, useState, useEffect, } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Text, View, Image, StyleSheet, Animated, Easing, TouchableOpacity, } from 'react-native'
import _ from 'lodash'
import axios from 'axios'
let moment = require('moment-timezone');
moment.locale('uk');
import styles from './styles'

import { API_URL } from '@api'
import { NO_TIME } from '@statuses'

import LeftSide from './components/LeftSide/LeftSide';
import RightSide from './components/RightSide/RightSide';
import Panel from './components/Panel/Panel';
import PanelInstance from './components/Panel/components/PanelInstance'

import { setEndOfSessionStatus } from '../../../../../reducers/TempReducer';
import History from './components/Panel/components/History/History';
import PaymentModal from './components/LeftSide/components/PaymentModal';

function RetailScreen(props) {
  const {
    products, navigation, openChangeAccountOverview,
    account, updateLayout, toastRef, layout, setModalStatus,
  } = props;

  const dispatch = useDispatch()

  const currentAccountToken = useSelector(state => state.user.currentAccountToken)

  const [receipts, setReceipts] = useState([[], [], [], []])
  const [selectedInstance, selectReceiptInstance] = useState(0)
  const [selectedDate, selectDate] = useState(false)

  const initialPanelScreens = { history: false, devices: false, transactions: false, }

  const [panelScreenState, setPanelScreenState] = useState(initialPanelScreens)
  const [paymentModalVisible, setPaymentModalVisibility] = useState(false)

  const [menuVisible, setMenuVisibility] = useState(false)
  const [modalOpacity] = useState(new Animated.Value(0))

  const [menuButtons] = useState([
    {
      name: 'Панель керування',
      // onPress: () => openPanelInstance('history', 'ІСТОРІЯ ЗАМОВЛЕНЬ'),
      onPress: () => navigation.navigate('ControlLayout')
    },
    { name: 'Змінити аккаунт', onPress: openChangeAccountOverview },
  ])

  const throttleRef = useRef(_.debounce((callback) => callback(), 1000, { 'trailing': false }))

  const loadProducts = async (token) => {
    try {
      console.log('Fetch products', token)
      toastRef.current.show("Синхронізація", 1000);

      const { data } = await axios.get(`${API_URL}/user/products/${token}`)

      console.log('Fetch succeded')

      updateLayout(data.products, layout)
    } catch (error) {
      console.warn('Failed to fetch products', error)
      toastRef.current.show("Помилка мережі", 1000);
    }
  }

  const handleNewDate = (newDate) => {
    selectDate(newDate)
  }

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
        duration: 50,
        easing: Easing.ease
      }
    ).start();
  }

  const endSession = () => {
    if (true) {
      setModalStatus(NO_TIME)

      return
    }

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
        setPaymentModalVisibility={setPaymentModalVisibility}
      />
      <RightSide
        products={products}
        loadProducts={loadProducts}
        receipts={receipts}
        setReceipts={setReceipts}
        navigation={navigation}
        selectedInstance={selectedInstance}
        openMenu={openMenu}
        account={account}
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

      {/* {paymentModalVisible && (
        
      )} */}

      <PaymentModal
        isVisible={paymentModalVisible}
        setPaymentModalVisibility={setPaymentModalVisibility}
      />

    </View>
  )
}

export default RetailScreen