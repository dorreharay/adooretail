import React, { useState, useEffect, useMemo, } from 'react'
import { View, Text, TouchableOpacity, Alert, } from 'react-native'
// import { BluetoothManager, } from 'react-native-bluetooth-escpos-printer';
import * as Progress from 'react-native-progress';
import styles from './styles'

import SharedButton from '@shared/SharedButton'

function BluetoothConnectionButton(props) {
  const { status, setStatus, scanLoading, setScanLoading, scan, checkBluetoothConnection, } = props

  const tryToEnableBluetooth = async () => {
    const connected = await checkBluetoothConnection()

    if (!connected) {
      try {
        // await BluetoothManager.enableBluetooth()

        setStatus(true)
        scan()
      } catch (error) {
        if (error.message === 'EVENT_BLUETOOTH_NOT_SUPPORT') {
          Alert.alert('Пристрій не підтримує Bluetooth')
        } else {
          Alert.alert(error.message)
        }
      }
    }
  }

  const tryToDisableBluetooth = async () => {
    try {
      await BluetoothManager.disableBluetooth()
      setStatus(false)
    } catch (error) {
      Alert.alert(error.message)
    }
  }

  return (
    <View style={styles.container}>
      <SharedButton
        style={styles.actionButton}
        onPress={tryToDisableBluetooth}
        scale={0.9}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.text}>
            Вимкнути Bluetooth
        </Text>
        </View>
      </SharedButton>
    </View>
  )
}

export default BluetoothConnectionButton
