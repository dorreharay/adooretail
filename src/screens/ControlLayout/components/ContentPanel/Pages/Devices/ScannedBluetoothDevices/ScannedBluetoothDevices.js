import React, { useState, useEffect, useMemo, Fragment, } from 'react'
import { View, Text, TouchableOpacity, Alert, ScrollView, } from 'react-native'
import { BluetoothManager, BluetoothEscposPrinter, } from 'react-native-bluetooth-escpos-printer';
import { useSelector } from 'react-redux'
import styles from './styles'

import SharedButton from '@shared/SharedButton'
import { printReceipt, connectToDevice, } from '@printer'

function ScannedBluetoothDevices(props) {
  const { status, setScanLoading, } = props

  const { paired, found } = useSelector(state => state.temp.bluetoothDevices)

  const connect = async (address) => {
    setScanLoading(true)

    try {
      await connectToDevice(address) 
    } catch (error) {
      console.log(error)
    } finally {
      setScanLoading(false)
    }
  }

  return (
    status !== 2 ? (
      <View
        style={styles.container}
      >
        <Fragment>
          <View style={styles.listHeading}>
            <Text style={styles.listHeadingText}>Під'єднані</Text>
          </View>
          <ScrollView style={styles.pairedList} scrollEnabled={paired.length > 0}>
            {paired.length > 0 ? paired.map((p) => (
              <TouchableOpacity style={styles.pairedItem} onPress={() => printReceipt(null, p.address)}>
                <Text style={styles.pairedText}>{p.name}</Text>
                {/* <TouchableOpacity
                  style={styles.pairedButton}
                >
                  <Text style={styles.pairedButtonText}>Від'єднати</Text>
                </TouchableOpacity> */}
              </TouchableOpacity>
            )) : (
                <Text style={styles.emptyText}>Пусто</Text>
              )}
          </ScrollView>

          <View style={styles.listHeading}>
            <Text style={styles.listHeadingText}>Знайдені</Text>
          </View>
          <ScrollView style={[styles.foundList, { marginTop: 5, }]} scrollEnabled={found.length > 0}>
            {found.length > 0 ? found.map((f) => (
              <View style={styles.foundItem}>
                <Text style={styles.foundText}>{f.address}</Text>

                <TouchableOpacity
                  style={styles.foundButton}
                  onPress={() => connect(f.address)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.foundButtonText}>Під'єднати</Text>
                </TouchableOpacity>
              </View>
            )) : (
                <Text style={styles.emptyText}>Пусто</Text>
              )}
          </ScrollView>
        </Fragment>

      </View>
    ) : (
        <View style={styles.unavailableWrapper}>
          <Text style={styles.unavailableWrapperText}>Недоступно без Bluetooth підключення</Text>
        </View>
      )
  )
}

export default ScannedBluetoothDevices
