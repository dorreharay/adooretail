import React, { useState, useEffect, useMemo, } from 'react'
import { View, Text, TouchableOpacity, Alert, } from 'react-native'
import { BluetoothManager, } from 'react-native-bluetooth-escpos-printer';
import * as Progress from 'react-native-progress';
import styles from './styles'

import SharedButton from '@shared/SharedButton'

function BluetoothConnectionButton(props) {
  const { status, setStatus, scanLoading, setScanLoading, scan, checkBluetoothConnection, } = props

  const tryToEnableBluetooth = async () => {
    const connected = await checkBluetoothConnection()

    if (!connected) {
      try {
        await BluetoothManager.enableBluetooth()

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
      <View style={{ flexDirection: 'row', }}>
        <SharedButton
          style={styles.actionButton}
          onPress={tryToEnableBluetooth}
          scale={0.9}
        >
          <View style={styles.innerContainer}>
            <Text style={styles.text}>
              Увімкнути Bluetooth
          </Text>
          </View>
        </SharedButton>
      </View>
    )
  }

  if (status) {
    return (
      <View style={{ flexDirection: 'row', }}>
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
        <View style={{ width: 10, }}></View>
        <SharedButton
          style={styles.actionButton}
          onPress={scan}
          scale={0.9}
        >
          <View style={styles.innerContainer}>
            {scanLoading ? (
              <Progress.Circle
                endAngle={0.7}
                size={15} color={'#E46162'}
                borderWidth={1.5} indeterminate={true}
              />
            ) : (
                <Text style={styles.text}>
                  Сканувати
              </Text>
              )}
          </View>
        </SharedButton>
      </View>
    )
  }
}

export default BluetoothConnectionButton
