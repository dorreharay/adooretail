import React, { useState, useRef, Fragment, } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Animated, Easing, } from 'react-native'
import { useSelector, } from 'react-redux'
import FastImage from 'react-native-fast-image';
import { DURATION } from 'react-native-easy-toast'
import styles from './styles'

import SharedButton from '@shared/SharedButton';

function Filters(props) {
  const { loadReceipts, toastRef, } = props

  const loadAgain = async () => {
    try {
      toastRef.current.show("Оновлення чеків", DURATION.FOREVER);

      await loadReceipts()
    } catch (error) {
      console.log('error - Filters - loadAgain', error)
    } finally {
      toastRef.current.close()
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Деталі</Text>
        <FastImage
          style={{ width: 12, height: 12, marginLeft: 10, }}
          source={require('@images/down-arrow.png')}
        />
      </TouchableOpacity>

      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Фільтр</Text>
        </TouchableOpacity>
        <View style={[styles.button, { paddingLeft: 10, paddingRight: 25 }]}>
          <SharedButton
            onPress={loadAgain}
            style={{ width: 25, height: 25, marginRight: 10, backgroundColor: '#FFFFFF00' }}
            iconStyle={{ width: 22, height: 22, }}
            source={require('@images/reload.png')} scale={0.6}
            rotateOnPress loadAgain={loadAgain}
          />
        </View>
      </View>
    </View>
  )
}

export default Filters
