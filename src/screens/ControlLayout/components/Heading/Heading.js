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
      {/* <TouchableOpacity
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
      </TouchableOpacity> */}

      <View>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => { }}
          activeOpacity={0.8}
        >
          <FastImage
            style={styles.accountIcon}
            source={require('@images/session_process.png')}
          />

          <Text style={styles.menuItemActiveText}>
            {currentAccount ? currentAccount.business_name : ''}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuButton, activeTab === 0 && styles.activeMenuButton]}
          onPress={() => setActiveTab(0)}
          activeOpacity={1}
        >
          <View style={styles.accountIcon} />
          <Text style={[styles.menuItemText, activeTab === 0 && styles.menuItemActiveText]}>
            Операції
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuButton, activeTab === 1 && styles.activeMenuButton]}
          onPress={() => setActiveTab(1)}
          activeOpacity={1}
        >
          <View style={styles.accountIcon} />
          <Text style={[styles.menuItemText, activeTab === 1 && styles.menuItemActiveText]}>
            Девайси
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuButton, activeTab === 2 && styles.activeMenuButton]}
          onPress={() => setActiveTab(2)}
          activeOpacity={1}
        >
          <View style={styles.accountIcon} />
          <Text style={[styles.menuItemText, activeTab === 2 && styles.menuItemActiveText]}>
            Налаштування
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.menuButton, { height: styles.menuButton.height + 15 }]}
        onPress={() => { }}
        activeOpacity={0.9}
      >
        <FastImage
          style={styles.accountIcon}
          source={require('@images/logout.png')}
        />

        <Text style={[styles.menuItemActiveText, { color: '#6D6D6D' }]}>
          Вийти з аккаунту
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Heading
