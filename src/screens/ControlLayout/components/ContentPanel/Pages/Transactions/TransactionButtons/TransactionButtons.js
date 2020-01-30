import React, { useState, } from 'react'
import { View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'

import SharedButton from '@shared/SharedButton'

function TransactionButtons({ activeButton, setActiveButton }) {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <SharedButton
          style={{ flex: 1, }}
          onPress={() => setActiveButton(0)}
          scale={0.9}
        >
          <LinearGradient
            style={styles.buttonInnerStyles}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={activeButton === 0 ? ['#DB3E69', '#FD9C6C'] : ['#00000000', '#00000000']}
          >
            <Text style={[styles.buttonText, activeButton === 0 && styles.activeButton]}>Поставка</Text>
          </LinearGradient>
        </SharedButton>
      </View>
      <View style={styles.button}>
        <SharedButton
          style={{ flex: 1, }}
          onPress={() => setActiveButton(1)}
          scale={0.9}
        >
          <LinearGradient
            style={styles.buttonInnerStyles}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={activeButton === 1 ? ['#DB3E69', '#FD9C6C'] : ['#00000000', '#00000000']}
          >
            <Text style={[styles.buttonText, activeButton === 1 && styles.activeButton]}>Витрата</Text>
          </LinearGradient>
        </SharedButton>
      </View>
      <View style={styles.button}>
        <SharedButton
          style={{ flex: 1, }}
          onPress={() => setActiveButton(2)}
          scale={0.9}
        >
          <LinearGradient
            style={styles.buttonInnerStyles}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={activeButton === 2 ? ['#DB3E69', '#FD9C6C'] : ['#00000000', '#00000000']}
          >
            <Text style={[styles.buttonText, activeButton === 2 && styles.activeButton]}>Прибуток</Text>
          </LinearGradient>
        </SharedButton>
      </View>
    </View>
  )
}

export default TransactionButtons
