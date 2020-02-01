import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import styles from './styles'
import FastImage from 'react-native-fast-image'

import { currentAccountSelector } from '@selectors';

function ControlPanel(props) {
  const { activeCategory, tabs } = props

  const { deviceWidth } = useSelector(state => state.temp.dimensions)
  const currentAccount = useSelector(currentAccountSelector)

  return (
    <View style={[styles.container, { width: deviceWidth * 0.2, }]}>
      <View style={styles.businessContainer}>
        <FastImage
          style={styles.businessIcon}
          source={require('@images/session_process.png')}
        />
        <Text style={[styles.bussinessNameText, styles.primaryColor]}>{currentAccount.business_name}</Text>
      </View>
      <View style={{ justifyContent: 'space-between', flex: 1, paddingVertical: 30, }}>
        <View style={styles.tabsContainer}>
          <Text style={styles.sectionTitle}>{'ОСНОВНІ'}</Text>
          {tabs.slice(0, tabs.length - 1).map((tab, index) => (
            <TouchableOpacity
              style={[styles.tab, activeCategory === tab.index && { backgroundColor: '#2E2C2F', }]}
              onPress={tab.onPress}
              activeOpacity={1}
              key={index}
            >
              <FastImage
                style={styles.tabIcon}
                source={tab.iconSource}
              />
              <Text style={styles.tabText}>{tab.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.settingsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeCategory === tabs[tabs.length - 1].index && { backgroundColor: '#2E2C2F', }]}
            onPress={tabs[tabs.length - 1].onPress}
            activeOpacity={1}
            key={tabs[tabs.length - 1].index}
          >
            <FastImage
              style={styles.tabIcon}
              source={tabs[tabs.length - 1].iconSource}
            />
            <Text style={styles.tabText}>{tabs[tabs.length - 1].title}</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default ControlPanel
