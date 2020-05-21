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

function DeliveryPicker(props) {
  const { visible, onClickOutside, } = props

  const dispatch = useDispatch()

  const currentAccount = useSelector(state => state.user.currentAccount)
  const currentService = useSelector(state => state.user.currentService) || 0

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

  return (
    <ScrollView 
      style={styles.employeesList}
      contentContainerStyle={{ paddingLeft: '6%', paddingRight: '10%', }}
      horizontal={true}
    >
      {currentAccount.available_services.map((item, key) => (
        <Ripple
          style={styles.employeesListItem}
          onPress={() => {
            dispatch(setCurrentService(key))
          }}
          rippleColor={`#E66960`}
          rippleFades
          rippleContainerBorderRadius={50}
          key={key}
        >
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <View style={[styles.frame, currentService === key && { borderColor: '#E66960' }]}>
              <FastImage
                style={{ width: 60, height: 60, backgroundColor: '#DDDDDD', borderRadius: 100, }}
                source={renderServiceIcon(key)}
              />
            </View>
            {/* <Text style={styles.employeesListItemName}>{item.name}</Text> */}
          </View>
        </Ripple>
      ))}
    </ScrollView>
  )
}

export default DeliveryPicker