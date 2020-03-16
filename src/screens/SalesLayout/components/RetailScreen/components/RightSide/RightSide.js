import React, { useRef, useState, useEffect, useMemo, } from 'react'
import { Text, View, Image, TextInput, Platform, } from 'react-native'
import { useNetInfo } from "@react-native-community/netinfo";
import { useSelector, useDispatch } from 'react-redux'
import { syncSessions, } from '@requests'
import * as Progress from 'react-native-progress';
import { BluetoothManager, BluetoothEscposPrinter, } from 'react-native-bluetooth-escpos-printer';
import DeviceSettings from 'react-native-device-settings';
import { validateSessionRoutine, } from '@requests'
import _ from 'lodash'
import styles from './styles'

import { setLayout } from '@reducers/OrdersReducer'
import { currentAccountSelector, } from '@selectors'
import { performPrinterScanAndConnect } from '@printer'

import SharedButton from '@shared/SharedButton';
import Products from './Products/Products'

// import API from '../../../../../../../sockets/api'

const onlineIcon = require('@images/status_online.png')
const offlineIcon = require('@images/status_offline.png')
const waitingIcon = require('@images/status_waiting.png')

function RightSide(props) {
  const {
    openMenu, loadProducts, receipts, setReceipts,
    selectedInstance, account, addProductQuantity,
    paymentModalVisible, navigation,
  } = props;

  const dispatch = useDispatch()

  const toast = useRef(null)
  const inputRef = useRef(null)
  const throttleParams = useRef((callback) => _.throttle(() => callback(), 3000, { trailing: false, leading: false }));

  const netInfo = useNetInfo();

  const layout = useSelector(state => state.orders.layout)
  const currentAccountToken = useSelector(state => state.user.currentAccountToken)
  const currentAccount = useSelector(currentAccountSelector)
  const { paired, found } = useSelector(state => state.temp.bluetoothDevices)

  const [searchTerm, setSearchTerm] = useState('')
  const [devicesLength, setDevicesLength] = useState(0)
  const [printerLoading, setPrinterLoading] = useState(false)

  const loadAgain = async () => {
    if (!netInfo.isConnected || !netInfo.isInternetReachable) {
      toast.current && toast.current.show("Потрібне інтернет з'єднання", 1000);

      return
    }

    loadProducts(account.token)
    await syncSessions(() => { })
  }

  useEffect(() => {
    // throttleParams.current(() => {
    //   console.log('aaaaa')
    // })

    // validateSessionRoutine()
    loadProducts(currentAccountToken)
  }, [currentAccountToken])

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

  const handleMessage = async () => {
    console.log('%c%s', 'color: red; font: 1.5rem Tahoma;', 'socket request')
    await API.sendMessage('nuckles')
  }

  const updatePairedDevices = async () => {
    if(paired.length === 0) {
      navigation.navigate('ControlLayout', {
        screen: 2,
      })

      return
    }

    setPrinterLoading(true)

    try {
      await performPrinterScanAndConnect()
    } catch (error) {
      console.log('Printer scan error', error)
    } finally {
      setPrinterLoading(false)
    }
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

        {currentAccount && currentAccount.settings && currentAccount.settings.printer_enabled && (
          <SharedButton onPress={updatePairedDevices} scale={0.85}>
            <View style={styles.printer}>
              <Image style={{ width: 17, height: 17, }} source={require('@images/tprinter.png')} />

              {printerLoading ? (
                <View style={styles.printersAmount}>
                  <Progress.Circle
                    endAngle={0.7}
                    size={10} color={'#343434'}
                    borderWidth={1.2} indeterminate={true}
                  />
                </View>
              ) : (
                  <View style={styles.printersAmount}>
                    <Text style={styles.printersAmountText}>{paired.length}</Text>
                  </View>
                )}
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
          onPress={openMenu}
          style={{ width: styles.menu.width, height: styles.menu.height, backgroundColor: '#FFFFFF' }}
          iconStyle={{ width: styles.menu.width - 24, height: styles.menu.height - 30, }}
          source={require('@images/menu.png')} scale={0.9}
        />
      </View>
      <Products
        products={account.products}
        receipts={receipts}
        setReceipts={setReceipts}
        selectedInstance={selectedInstance}
        searchTerm={searchTerm}
        addProductQuantity={addProductQuantity}
        paymentModalVisible={paymentModalVisible}
      />
    </View>
  )
}

export default RightSide