import React, { useState, useEffect, useMemo, } from 'react'
import { View, Text, TouchableOpacity, Alert, } from 'react-native'
import { BluetoothManager, } from 'react-native-bluetooth-escpos-printer';
import styles from './styles'

import SharedButton from '@shared/SharedButton'

function BluetoothConnectionButton(props) {
  const { status, setStatus, setDevices, } = props

  useEffect(() => {
    checkBluetoothConnection()
  }, [])

  useMemo(() => {

  }, [])

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

  const tryToEnableBluetooth = async () => {
    const connected = await checkBluetoothConnection()

    if (!connected) {
      try {
        const r = await BluetoothManager.enableBluetooth()

        setStatus(true)
        scanDevices()
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
      const connected = await checkBluetoothConnection()

      if (connected) {
        await BluetoothManager.disableBluetooth()

        setStatus(false)
      } else {
        setStatus(true)
      }
    } catch (error) {
      Alert.alert(error.message)
    }
  }

  const scanDevices = async () => {
    try {
      const scanResult = await BluetoothManager.scanDevices()

      const devices = JSON.parse(scanResult)

      Alert.alert('scan')

      setDevices(devices)
    } catch (error) {
      // Alert.alert(error.message)
    }
  }

  useEffect(() => {
    scanDevices()

    const routine = setTimeout(() => {
      scanDevices()
    }, 2000)

    return () => {
      clearInterval(routine)
    }
  }, [])

  if (status === null) {
    return (
      <SharedButton
        style={styles.container}
        onPress={() => { }}
        scale={0.9}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.text}>
            Очікування статусу
          </Text>
        </View>
      </SharedButton>
    )
  }

  if (!status) {
    return (
      <SharedButton
        style={styles.container}
        onPress={tryToEnableBluetooth}
        scale={0.9}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.text}>
            Увімкнути Bluetooth
          </Text>
        </View>
      </SharedButton>
    )
  }

  if (status) {
    return (
      <SharedButton
        style={styles.container}
        onPress={tryToDisableBluetooth}
        onLongPress={scanDevices}
        scale={0.9}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.text}>
            Вимкнути Bluetooth
          </Text>
        </View>
      </SharedButton>
    )
  }
}

export default BluetoothConnectionButton
