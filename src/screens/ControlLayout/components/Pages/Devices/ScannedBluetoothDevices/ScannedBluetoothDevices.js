import React, { useState, useEffect, useMemo, Fragment, } from 'react'
import { View, Text, TouchableOpacity, Alert, ScrollView, } from 'react-native'
import { BluetoothManager, BluetoothEscposPrinter, } from 'react-native-bluetooth-escpos-printer';
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import styles from './styles'

import { printReceipt, connectToDevice, unpairDevice, } from '@printer'

function ScannedBluetoothDevices(props) {
  const { status, setScanLoading, } = props

  // const { paired, found } = useSelector(state => state.temp.bluetoothDevices)
  const [pairedloadingItemIndex, setPairedLoadingForItem] = useState(null)
  const [foundloadingItemIndex, setFoundLoadingForItem] = useState(null)

  const paired = [
    {
      name: 'Adoo POS Printer'
    }, 
    {
      name: 'Sony WH-1000n'
    },
  ]

  const connect = async (address, index) => {
    setFoundLoadingForItem(index)

    try {
      await connectToDevice(address) 
    } catch (error) {
      console.log(error)
    } finally {
      setFoundLoadingForItem(null)
    }
  }

  const unpair = async (address, index) => {
    setPairedLoadingForItem(index)

    try {
      await unpairDevice(address) 
    } catch (error) {
      console.log(error)
    } finally {
      setPairedLoadingForItem(null)
    }
  }

  return (
      <View style={styles.container}>
        <ScrollView style={styles.pairedList}>
          {paired.length > 0 ? paired.map((p, index) => (
            <TouchableOpacity 
              style={[styles.pairedItem, index === 0 && { borderTopWidth: 0, }]}
              onPress={() => printReceipt(null, p.address)}
              activeOpacity={1}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FastImage
                  style={{ width: 30, height: 30, marginRight: 20, }}
                  source={index === 0 ? require('@images/tprinter.png') : require('@images/headphones.png')}
                />

                <Text style={styles.pairedText}>{p.name}</Text>
              </View>

              <TouchableOpacity
                style={styles.foundButton}
                onPress={() => unpair(p.address, index)}
                activeOpacity={0.8}
              >
                {pairedloadingItemIndex === index ? (
                  <Progress.Circle
                    endAngle={0.7}
                    size={15} color={'#FFFFFF'}
                    borderWidth={1.5} indeterminate={true}
                  />
                ) : (
                  <Text style={styles.foundButtonText}>Від'єднати</Text>
                )}
              </TouchableOpacity>
            </TouchableOpacity>
          )) : (
              <Text style={styles.emptyText}>Пусто</Text>
            )}
        </ScrollView>
      </View>
  )
}

export default ScannedBluetoothDevices
