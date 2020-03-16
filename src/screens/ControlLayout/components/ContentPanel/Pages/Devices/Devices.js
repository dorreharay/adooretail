import React, { useState, useEffect, } from 'react'
import { View, Text } from 'react-native'
import { BluetoothManager, } from 'react-native-bluetooth-escpos-printer';
import BluetoothConnectionButton from './BluetoothConnectionButton/BluetoothConnectionButton'
import ScannedBluetoothDevices from './ScannedBluetoothDevices/ScannedBluetoothDevices'
import { performPrinterScanAndConnect } from '@printer'
import styles from './styles'

function Devices({ activeCategory, }) {
  const [status, setStatus] = useState(null)
  const [devices, setDevices] = useState({
    paired: [],
    found: [],
  })

  const [scanLoading, setScanLoading] = useState(false)

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

  useEffect(() => {
    if (activeCategory.index) {
      checkBluetoothConnection()
      // performPrinterScanAndConnect()
    }
  }, [activeCategory])

  return (
    <View style={styles.container}>
      <Text style={styles.screenHeading}>
        Девайси
      </Text>

      <BluetoothConnectionButton
        status={status}
        setStatus={setStatus}
        scanLoading={scanLoading}
        setScanLoading={setScanLoading}
        checkBluetoothConnection={checkBluetoothConnection}
      />

      <View stle={{ height: '30%' }}>
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
