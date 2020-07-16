import React, { useState, } from 'react'
import { View, Text, TouchableOpacity, ScrollView, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux';
import Ripple from 'react-native-material-ripple';
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'

import { currentAccountSelector, currentSessionSelector } from '@selectors'

import SharedButton from '@shared/SharedButton';
import { setCurrentService } from '@reducers/UserReducer';

function DeliveryPickerOld(props) {
  const { visible, onClickOutside, } = props

  const dispatch = useDispatch()

  const currentAccount = useSelector(state => state.user.currentAccount)

  const renderServiceIcon = (id) => {
    if (id === 0) {
      return require('@images/question.png')
    }
    if (id === 1) {
      return require('@images/glovo-icon.png')
    }
    if (id === 2) {
      return require('@images/raketa-icon.png')
    }
    if (id === 3) {
      return require('@images/misteram-icon.png')
    }
    if (id === 4) {
      return require('@images/ubereats-icon.png')
    }
  }

  if (!visible) return null

  return (
    <TouchableOpacity
      style={styles.employeesListContainer}
      onPress={() => onClickOutside(false)}
      activeOpacity={1}
    >
      <View style={{ width: '37%', height: '70%', borderRadius: 3, backgroundColor: '#FFFFFF' }}>
        <Text style={styles.employeesListHeading}>Доставка</Text>
        <ScrollView
          style={styles.employeesList}
          contentContainerStyle={{ paddingLeft: '6%', paddingRight: '10%', paddingBottom: 50, }}
        >
          {currentAccount.available_services.map((item, key) => (
            <Ripple
              style={styles.employeesListItem}
              onPress={() => {
                dispatch(setCurrentService(key))
                onClickOutside(false)
              }}
              rippleColor={`#CCC`}
              rippleFades
              key={key}
            >
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <FastImage
                  style={{ width: 50, height: 50, backgroundColor: '#DDDDDD', borderRadius: 100, }}
                  source={renderServiceIcon(key)}
                />
                <Text style={styles.employeesListItemName}>{item.name}</Text>
              </View>
            </Ripple>
          ))}
        </ScrollView>
      </View>
    </TouchableOpacity>
  )
}

export default DeliveryPickerOld