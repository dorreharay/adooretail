import React, { useState, useEffect, useMemo, Fragment, } from 'react'
import { View, Text, TouchableOpacity, Alert, ScrollView, } from 'react-native'
import { BluetoothManager, BluetoothEscposPrinter, } from 'react-native-bluetooth-escpos-printer';
import { useSelector } from 'react-redux'
import * as Progress from 'react-native-progress';
import styles from './styles'

import SharedButton from '@shared/SharedButton'
import { printReceipt, connectToDevice, unpairDevice, } from '@printer'

function ScannedBluetoothDevices(props) {
  const { status, setScanLoading, } = props

  const { paired, found } = useSelector(state => state.temp.bluetoothDevices)
  const [pairedloadingItemIndex, setPairedLoadingForItem] = useState(null)
  const [foundloadingItemIndex, setFoundLoadingForItem] = useState(null)

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
    status !== 2 ? (
      <View
        style={styles.container}
      >
        <Fragment>
          <View style={styles.listHeading}>
            <Text style={styles.listHeadingText}>Під'єднані</Text>
          </View>
          <ScrollView style={styles.pairedList} scrollEnabled={paired.length > 0}>
            {paired.length > 0 ? paired.map((p, index) => (
              <TouchableOpacity style={styles.pairedItem} onPress={() => printReceipt(null, p.address)}>
                <Text style={styles.pairedText}>{p.name}</Text>

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

          <View style={styles.listHeading}>
            <Text style={styles.listHeadingText}>Знайдені</Text>
          </View>
          <ScrollView style={[styles.foundList, { marginTop: 5, }]} scrollEnabled={found.length > 0}>
            {found.length > 0 ? found.map((f, index) => (
              <View style={styles.foundItem}>
                <Text style={styles.foundText}>{f.name || 'Невідомий девайс'}</Text>

                <TouchableOpacity
                  style={styles.foundButton}
                  onPress={() => connect(f.address, index)}
                  activeOpacity={0.8}
                >
                  {foundloadingItemIndex === index ? (
                    <Progress.Circle
                      endAngle={0.7}
                      size={15} color={'#FFFFFF'}
                      borderWidth={1.5} indeterminate={true}
                    />
                  ) : (
                    <Text style={styles.foundButtonText}>Під'єднати</Text>
                  )}
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
