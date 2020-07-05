import React, { useState, useEffect, useMemo, Fragment, } from 'react'
import { View, Text, TouchableOpacity, Alert, ScrollView, } from 'react-native'
import { BluetoothManager, BluetoothEscposPrinter, } from 'react-native-bluetooth-escpos-printer';
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import styles from './styles'

import { printReceipt, connectToDevice, unpairDevice, } from '@printer'
import { performScan } from '../../../../../../../helpers/printer';

function ScannedBluetoothDevices(props) {
  const { status, setScanLoading, } = props

  const bluetoothDevices = useSelector(state => state.temp.bluetoothDevices)
  const [pairedloadingItemIndex, setPairedLoadingForItem] = useState(null)
  const [foundloadingItemIndex, setFoundLoadingForItem] = useState(null)

  const pair = async (address, index) => {
    setFoundLoadingForItem(index)

    try {
      setPairedLoadingForItem(index)

      await connectToDevice(address)

      // await performScan()

      setPairedLoadingForItem(null)
    } catch (error) {
      console.log(error)
    } finally {
      setPairedLoadingForItem(null)
    }
  }

  const unpair = async (address, index) => {
    // setPairedLoadingForItem(index)

    try {
      await unpairDevice(address)

      // setPairedLoadingForItem(null)

      // await performScan()

      // setPairedLoadingForItem(null)
    } catch (error) {
      console.log(error)
    } finally {
      // setPairedLoadingForItem(null)
    }
  }

  return (
    <View style={[styles.container, bluetoothDevices.length > 0 && { backgroundColor: '#FFFFFF', borderRadius: 10 }]}>
      <ScrollView style={styles.pairedList}>
        {bluetoothDevices.length > 0 ? bluetoothDevices.map((p, index) => {
          return (
            <View style={[styles.pairedItem, index === 0 && { borderTopWidth: 0, }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FastImage
                  style={{ width: 30, height: 30, marginRight: 20, }}
                  source={p.name && p.name.includes('Printer') ? require('@images/tprinter.png') : require('@images/bluetooth.png')}
                />

                <Text style={styles.pairedText}>{p.name || 'Невідомий пристрій'}</Text>
              </View>

              <TouchableOpacity
                style={[styles.foundButton, p.connected && { backgroundColor: '#CCC' }]}
                onPress={() => p.connected ? unpair(p.address, index) : pair(p.address, index)}
                activeOpacity={0.8}
              >
                {pairedloadingItemIndex === index ? (
                  <Progress.Circle
                    endAngle={0.7}
                    size={15} color={'#FFFFFF'}
                    borderWidth={1.5} indeterminate={true}
                  />
                ) : (
                    <Text style={styles.foundButtonText}>{p.connected ? "Від'єднати" : "Під'єднати"}</Text>
                  )}
              </TouchableOpacity>
            </View>
          )
        }) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Не знайдено жодного пристрою</Text>
            </View>
          )}
      </ScrollView>
    </View>
  )
}

export default ScannedBluetoothDevices
