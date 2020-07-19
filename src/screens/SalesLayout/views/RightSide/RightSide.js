import React, { useRef, useState, useEffect, useCallback, } from 'react'
import { Text, View, Image, TextInput, Platform, } from 'react-native'
import { useNetInfo } from "@react-native-community/netinfo";
import { useSelector, useDispatch } from 'react-redux'
import { syncSessions, loadProducts, } from '@helpers'
import DeviceSettings from 'react-native-device-settings';
import FastImage from 'react-native-fast-image'
import _ from 'lodash'
import styles from './styles'

import { setMenuVisibility } from '@reducers/TempReducer'
import { setLayout } from '@reducers/OrdersReducer'

import SharedButton from '@shared/SharedButton';
import Products from './Products/Products'

const onlineIcon = require('@images/status_online.png')
const offlineIcon = require('@images/status_offline.png')
const waitingIcon = require('@images/status_waiting.png')

function RightSide(props) {
  const { toastRef, } = props;

  const dispatch = useDispatch()

  const toast = useRef(null)
  const inputRef = useRef(null)
  const netInfo = useNetInfo();

  const layout = useSelector(state => state.orders.layout)
  const currentAccount = useSelector(state => state.user.currentAccount)
  const settings = useSelector(state => state.user.settings)

  const [searchTerm, setSearchTerm] = useState('')

  const delayedQuery = useCallback(_.debounce(ref => {
    loadProducts(ref)
    syncSessions(() => { })
  }, 2000, { leading: true }), []);

  const loadAgain = async () => {
    if (!netInfo.isConnected || !netInfo.isInternetReachable) {
      toast.current && toast.current.show("Потрібне інтернет з'єднання", 1000);

      return
    }

    if (currentAccount) {
      delayedQuery(toastRef?.current)
    }
  }

  const changeLayout = () => {
    let newLayout = 4

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
          <FastImage 
            style={{ width: 18, height: 18, marginRight: 15, }}
            source={require('@images/search.png')}
          />
          
          <TextInput
            ref={inputRef}
            style={styles.inputText}
            value={searchTerm}
            placeholder=''
            onChangeText={(text) => setSearchTerm(text)}
          />

          {searchTerm !== '' && (
            <SharedButton
              onPress={() => setSearchTerm('')}
              style={{ width: styles.search.height, height: styles.search.height, marginRight: 5, }}
              iconStyle={{ width: styles.search.height - 30, height: styles.search.height - 30 }}
              source={require('@images/x_icon.png')}
            />
          )}
        </View>

        <SharedButton onPress={() => { }} scale={0.85}>
          <View style={styles.connection}>
            <Image style={{ width: 10, height: 10.5, marginRight: 10 }} source={netInfo.isConnected ? netInfo.isInternetReachable ? onlineIcon : waitingIcon : offlineIcon} />
            <Text style={styles.connectionText}>{netInfo.isConnected ? netInfo.isInternetReachable ? 'online' : 'waiting' : 'offline'}</Text>
          </View>
        </SharedButton>

        {settings.printer_enabled && (
          <SharedButton onPress={() => DeviceSettings.bluetooth()} scale={0.85}>
            <View style={styles.printer}>
              <FastImage style={{ width: 17, height: 17, }} source={require('@images/tprinter.png')} />
            </View>
          </SharedButton>
        )}

        <SharedButton
          onPress={changeLayout}
          style={{ width: styles.update.width, height: styles.update.height, marginRight: 10, }}
          scale={0.8}
        >
          <View style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', }}>
            <Text style={styles.layoutNumberText}>{layout}</Text>
          </View>
        </SharedButton>
        <SharedButton
          onPress={loadAgain}
          style={{ width: styles.update.width, height: styles.update.height, marginRight: 10, backgroundColor: '#FFFFFF' }}
          iconStyle={{ width: styles.update.width - 27, height: styles.update.height - 26, }}
          source={require('@images/reload.png')} scale={0.8}
          rotateOnPress loadAgain={loadAgain}
        />
        <SharedButton
          onPress={() => dispatch(setMenuVisibility(true))}
          style={{ width: styles.menu.width, height: styles.menu.height, backgroundColor: '#FFFFFF' }}
          iconStyle={{ width: styles.menu.width - 24, height: styles.menu.height - 30, }}
          source={require('@images/menu.png')} scale={0.9}
        />
      </View>
      <Products searchTerm={searchTerm} />
    </View>
  )
}

export default RightSide