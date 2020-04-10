import React from 'react'
import { View, Text } from 'react-native'
import Collapsible from 'react-native-collapsible'
import FastImage from 'react-native-fast-image'
import styles from './styles'

import SharedButton from '@shared/SharedButton'

function Menu(props) {
  const { navigation, menuOpened, } = props

  return (
    <Collapsible style={styles.container} collapsed={!menuOpened}>
      <View style={[styles.tab, styles.activeTab]}>
        <Text style={styles.tabText}>Історія</Text>
      </View>
      <View style={styles.tab}>
        <Text style={styles.tabText}>Транзакції</Text>
      </View>
      <View style={styles.tab}>
        <Text style={styles.tabText}>Девайси</Text>
      </View>
      <View style={styles.tab}>
        <Text style={styles.tabText}>Стрічка</Text>
      </View>
      <View style={styles.tab}>
        <Text style={styles.tabText}>Налаштування</Text>
      </View>
      <View style={styles.tab}>
        <Text></Text>
      </View>
    </Collapsible>
  )
}

export default Menu
