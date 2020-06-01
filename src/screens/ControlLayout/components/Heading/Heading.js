import React from 'react'
import { View, Text, TouchableOpacity, } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector, } from 'react-redux'
import styles from './styles'

import { currentAccountSelector, } from '@selectors'

import SharedButton from '@shared/SharedButton'

function Heading(props) {
  const { navigation, activeTab, setActiveTab, } = props

  const currentAccount = useSelector(state => state.user.currentAccount)

  return (
    <View style={styles.container}>
      <SharedButton
        style={styles.backButton}
        onPress={() => navigation.jumpTo('SalesLayout')}
        scale={0.9}
      >
        <View style={styles.backButtonInner}>
          <FastImage
            style={styles.backIcon}
            source={require('@images/back.png')}
          />
          <Text style={styles.backIconText}>
            Назад до меню
          </Text>
        </View>
      </SharedButton>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={[styles.menuButton, activeTab === 0 && styles.activeMenuButton]}
          onPress={() => setActiveTab(0)}
          activeOpacity={1}
        >
          <Text style={styles.menuItemActiveText}>
            Операції
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[styles.menuButton, activeTab === 1 && styles.activeMenuButton]}
          onPress={() => setActiveTab(1)}
          activeOpacity={1}
        >
          <Text style={styles.menuItemActiveText}>
            Транзакції
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[styles.menuButton, activeTab === 2 && styles.activeMenuButton]}
          onPress={() => setActiveTab(2)}
          activeOpacity={1}
        >
          <Text style={styles.menuItemActiveText}>
            Девайси
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[styles.menuButton, activeTab === 3 && styles.activeMenuButton]}
          onPress={() => setActiveTab(3)}
          activeOpacity={1}
        >
          <Text style={styles.menuItemActiveText}>
            Стрічка
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[styles.menuButton, activeTab === 4 && styles.activeMenuButton]}
          onPress={() => setActiveTab(4)}
          activeOpacity={1}
        >
          <Text style={styles.menuItemActiveText}>
            Налаштування
          </Text>
        </TouchableOpacity>
      </View>


      <SharedButton
        style={styles.accountButton}
        onPress={() => { }}
        scale={0.9}
      >
        <View style={styles.accountButtonInner}>
          <FastImage
            style={styles.accountIcon}
            source={require('@images/session_process.png')}
          />

          <Text style={styles.accountName}>
            {currentAccount ? currentAccount.business_name : ''}
          </Text>
        </View>
      </SharedButton>
    </View>
  )
}

export default Heading
