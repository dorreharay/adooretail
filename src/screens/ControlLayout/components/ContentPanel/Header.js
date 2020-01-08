import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

import SharedButton from '@shared/SharedButton'

function Header(props) {
  const { navigation } = props

  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={[styles.bussinessNameText, styles.primaryColor]}></Text>
      </View>
      <View style={styles.rightButtonsContainer}>
        <SharedButton
          forceStyles={styles.backButton}
          iconSizes={{ width: 20, height: 20, }}
          onPress={() => { }}
          backgroundColor={'#00000000'}
          borderRadius={0}
          scale={0.9}
        >
          <Text style={styles.menuButtonText}>Оновлення</Text>
        </SharedButton>
        <SharedButton
          forceStyles={styles.backButton}
          iconSizes={{ width: 20, height: 20, }}
          onPress={() => navigation.navigate('SalesLayout')}
          backgroundColor={'#00000000'}
          borderRadius={0}
          scale={0.9}
        >
          <Text style={[styles.menuButtonText, styles.primaryColor]}>Назад до продуктів</Text>
        </SharedButton>
      </View>
    </View>
  )
}

export default Header
