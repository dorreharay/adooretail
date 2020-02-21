import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

import SharedButton from '@shared/SharedButton'

function Header(props) {
  const { navigation, heading } = props

  return (
    <View style={styles.headerContainer}>
      {/* <View>
        <Text style={[styles.bussinessNameText, styles.primaryColor]}></Text>
      </View> */}
      {heading}
      <View style={styles.rightButtonsContainer}>
        {/* <SharedButton
          style={styles.backButton}
          iconStyle={{ width: 20, height: 20, }}
          onPress={() => { }}
          borderRadius={0}
          scale={0.9}
        >
          <Text style={styles.menuButtonText}>Оновлення</Text>
        </SharedButton> */}
        <SharedButton
          style={styles.backButton}
          iconStyle={{ width: 20, height: 20, }}
          onPress={() => navigation.navigate('SalesLayout')}
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
