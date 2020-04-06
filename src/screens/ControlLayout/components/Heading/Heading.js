import React from 'react'
import { View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import styles from './styles'

import SharedButton from '@shared/SharedButton'

function Heading(props) {
  const { navigation, } = props

  return (
    <View style={styles.container}>
      <SharedButton
        style={styles.backButton}
        onPress={() => navigation.navigate('SalesLayout')}
        scale={0.9}
      >
        <View style={styles.backButtonInner}>
          <FastImage
            style={styles.backIcon}
            source={require('@images/back.png')}
          />
          <Text style={styles.backIconText}>
            Назад
          </Text>
        </View>
      </SharedButton>

      <SharedButton
        style={styles.backButton}
        onPress={() => { }}
        scale={0.9}
      >
        <View style={styles.backButtonInner}>
          <FastImage
            style={styles.accountIcon}
            source={require('@images/session_process.png')}
          />

          <Text style={styles.accountName}>
            Ho Chu Bo dev
          </Text>
        </View>
      </SharedButton>
    </View>
  )
}

export default Heading
