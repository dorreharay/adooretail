import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import styles from './styles'
import FastImage from 'react-native-fast-image'

function ControlPanel(props) {
  const { activeCategory, tabs } = props

  const { deviceWidth } = useSelector(state => state.temp.dimensions)

  return (
    <View style={[styles.container, { width: deviceWidth * 0.2, }]}>
      <View style={styles.businessContainer}>
        <FastImage
          style={styles.businessIcon}
          source={require('@images/session_process.png')}
        />
        <Text style={[styles.bussinessNameText, styles.primaryColor]}>Poilka Barista 1</Text>
      </View>
      <View style={{ justifyContent: 'space-between', flex: 1, paddingVertical: 30, }}>
        <View style={styles.tabsContainer}>
          <Text style={styles.sectionTitle}>{Object.keys(tabs)[0].toUpperCase()}</Text>
          {tabs['Основні'].map((tab, index) => (
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
          {tabs['Налаштування'].map((tab, index) => (
            <TouchableOpacity
              style={[styles.tab, activeCategory === tab.index && { backgroundColor: '#2E2C2F', }]}
              onPress={tab.onPress}
              activeOpacity={1}
              key={index}
            >
              <FastImage
                style={[styles.tabIcon, tab.sizes && { width: tab.sizes.width, height: tab.sizes.height }]}
                source={tab.iconSource}
              />
              <Text style={styles.tabText}>{tab.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

    </View>
  )
}

export default ControlPanel
