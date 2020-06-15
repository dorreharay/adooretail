import React, { useState, useEffect, useRef, } from 'react'
import { View, Text, TouchableOpacity, } from 'react-native'
import { BluetoothManager, } from 'react-native-bluetooth-escpos-printer';
import BluetoothConnectionButton from './BluetoothConnectionButton/BluetoothConnectionButton'
import ScannedBluetoothDevices from './ScannedBluetoothDevices/ScannedBluetoothDevices'
import FastImage from 'react-native-fast-image';
import { performPrinterScanAndConnect, scanDevices, } from '@printer'
import styles from './styles'

import SharedButton from '@shared/SharedButton'
import SharedToast from '@shared/SharedToast/SharedToast';

function Devices({ activeCategory, }) {
  const toastRef = useRef(null)

  const [status, setStatus] = useState(null)
  const [devices, setDevices] = useState({
    paired: [],
    found: [],
  })

  const [scanLoading, setScanLoading] = useState(false)
  const [activeConnectionType, setActiveConnectionType] = useState(0)

  const checkBluetoothConnection = async () => {
    try {
      const enabled = await BluetoothManager.isBluetoothEnabled()

      setStatus(enabled)

      return enabled
    } catch (error) {
      setStatus(false)

      // Alert.alert('Ну ок, але будеш без підключення')

      return false
    }
  }

  const scan = async () => {
    try {
      toastRef.current.show('Сканування')

      setScanLoading(true)
      await scanDevices()
    } catch (error) {
      console.log(error)
    } finally {
      setScanLoading(false)
    }
  }
  useEffect(() => {
    if(activeCategory === 1) {
      checkBluetoothConnection()
      scan()
    }
  }, [activeCategory])

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        <View style={[styles.refreshButton, { backgroundColor: '#FFFFFF00' }]} />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={[styles.button, activeConnectionType === 0 && styles.activeButton]}
            onPress={() => setActiveConnectionType(0)}
            activeOpacity={1}
          >
            <Text style={[styles.buttonText, activeConnectionType === 0 && styles.activeButtonText]}>Bluetooth</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, activeConnectionType === 1 && styles.activeButton]}
            onPress={() => setActiveConnectionType(1)}
            activeOpacity={1}
          >
            <Text style={[styles.buttonText, activeConnectionType === 1 && styles.activeButtonText]}>WIFI</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.refreshButton}>
          <SharedButton
            onPress={scan}
            style={{ width: 25, height: 25, backgroundColor: '#FFFFFF00' }}
            iconStyle={{ width: 22, height: 22, }}
            source={require('@images/reload.png')} scale={0.6}
            rotateOnPress loadAgain={scan}
          />
        </View>
      </View>

      <SharedToast
        ref={toastRef}
        style={{ position: 'absolute', bottom: 50 }}
      />

      <View>
        <ScannedBluetoothDevices
          status={status}
          scanLoading={scanLoading}
          setScanLoading={setScanLoading}
        />
      </View>
    </View>
  )
}

export default Devices
