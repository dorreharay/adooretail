import React, { useRef, useState, useEffect, } from 'react'
import { Text, View, Image, TextInput, Alert, Animated, TouchableOpacity, } from 'react-native'
import { useNetInfo } from "@react-native-community/netinfo";
import { useSelector, useDispatch } from 'react-redux'
import Toast, { DURATION } from 'react-native-easy-toast'
import _ from 'lodash'
import Modal, { FadeAnimation, ModalContent, } from 'react-native-modals';
import styles from './styles'

import { PROBA_REGULAR } from '@fonts'

import SharedButton from '@shared/SharedButton';

import Products from './Products/Products'

import { setLayout } from '../../../../../../../reducers/OrdersReducer'
import { setEndOfSessionStatus } from '../../../../../../../reducers/TempReducer';

const onlineIcon = require('@images/status_online.png')
const offlineIcon = require('@images/status_offline.png')
const waitingIcon = require('@images/status_waiting.png')

function RightSide(props) {
  const { 
    products, loadProducts,
    receipts, setReceipts, 
    selectedInstance, navigation, 
    openMenu, 
  } = props;

  const toast = useRef(null)
  const inputRef = useRef(null)

  const netInfo = useNetInfo();

  const currentAccountIndex = useSelector(state => state.user.currentAccountIndex)
  const layout = useSelector(state => state.orders.layout)
  const dispatch = useDispatch()

  const [searchTerm, setSearchTerm] = useState('')

  const loadProductsThrottled = useRef(_.throttle(() => loadProducts(), 5000))

  useEffect(() => {
    loadAgain()
    console.log('-------->(')
  }, [currentAccountIndex])

  const loadAgain = () => {
    if (!netInfo.isConnected || !netInfo.isInternetReachable) {
      toast.current.show("Потрібне інтернет з'єднання", 1000);

      return
    }

    if (toast.current) {
      toast.current.show("Оновлення списку", 1000)
      loadProductsThrottled.current()
    }
  }

  const changeLayout = () => {
    var newLayout = 4

    if (layout === 3) {
      newLayout = 4
    }

    if (layout === 4) {
      newLayout = 5
    }

    if (layout === 5) {
      newLayout = 3
    }

    dispatch(setLayout(newLayout))
  }

  return (
    <View style={styles.container}>
      <View style={styles.toolsBar}>
        <View style={styles.search}>
          <Image style={{ width: 18, height: 18, marginRight: 15, }} source={require('@images/search.png')}></Image>
          <TextInput
            ref={inputRef}
            style={styles.inputText}
            value={searchTerm}
            placeholder=''
            // onBlur={handleBlur}
            onChangeText={(text) => setSearchTerm(text)}
          />

          {searchTerm !== '' && (
            <SharedButton
              onPress={() => setSearchTerm('')}
              buttonSizes={{ width: styles.search.height, height: styles.search.height, marginRight: 5, }}
              iconSizes={{ width: styles.search.height - 30, height: styles.search.height - 30 }}
              source={require('@images/x_icon.png')}
            />
          )}

        </View>

        <View style={styles.connection}>
          <Image style={{ width: 10, height: 10.5, marginRight: 10 }} source={netInfo.isConnected ? netInfo.isInternetReachable ? onlineIcon : waitingIcon : offlineIcon} />
          <Text style={styles.connectionText}>
            {netInfo.isConnected && netInfo.isInternetReachable && 'online'}
            {!netInfo.isConnected && 'offline'}
            {netInfo.isConnected && !netInfo.isInternetReachable && 'waiting'}
          </Text>
        </View>
        <SharedButton
          onPress={changeLayout}
          buttonSizes={{ width: styles.update.width, height: styles.update.height, marginRight: 10, }}
          iconSizes={{ width: styles.update.width, height: styles.update.height - 20, }}
          text={layout} scale={0.8}
          backgroundColor={'#FFFFFF'}
        />
        <SharedButton
          onPress={loadAgain}
          buttonSizes={{ width: styles.update.width, height: styles.update.height, marginRight: 10, }}
          iconSizes={{ width: styles.update.width - 27, height: styles.update.height - 26, }}
          source={require('@images/reload.png')} scale={0.8}
          rotateOnPress loadAgain={loadAgain} backgroundColor={'#FFFFFF'}
        />
        <SharedButton
          onPress={openMenu}
          buttonSizes={{ width: styles.menu.width, height: styles.menu.height, }}
          iconSizes={{ width: styles.menu.width - 24, height: styles.menu.height - 27, }}
          source={require('@images/menu.png')} scale={0.9}
          backgroundColor={'#FFFFFF'} onStart
        />
      </View>
      <Products
        products={products}
        receipts={receipts}
        setReceipts={setReceipts}
        selectedInstance={selectedInstance}
        searchTerm={searchTerm}
      />
      <Toast
        ref={toast}
        opacity={1}
        style={{ paddingHorizontal: 20, backgroundColor: '#00000066' }}
        position='bottom'
        positionValue={50}
        textStyle={{
          marginBottom: 2,
          color: '#FFFFFF',
          fontSize: 17,
          fontFamily: PROBA_REGULAR,
        }}
        fadeInDuration={600}
        fadeOutDuration={800}
      />
    </View>
  )
}

export default RightSide