import React from 'react'
import { View, Text, TouchableOpacity, } from 'react-native'
import FastImage from 'react-native-fast-image';
import styles from './styles'

import { deviceWidth, deviceHeight } from '@dimensions';
import SharedButton from '@shared/SharedButton';

function PanelInstance(props) {
  const {
    children, isVisible, closePanelInstance,
    panelScreenState, selectedDate, handleNewDate,
  } = props

  return (
    <View style={styles.panelContainer}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHeading}>
          <Text style={styles.panelHeadingText}>
            {panelScreenState.history && panelScreenState.history}
            {panelScreenState.devices && panelScreenState.devices}
            {panelScreenState.transactions && panelScreenState.transactions}
          </Text>
          {selectedDate && (
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 50, }}
              onPress={() => handleNewDate(false)}
              activeOpacity={1}
            >
              <Text style={[styles.panelHeadingText, { fontSize: 25 }]}>
                {selectedDate.date}
              </Text>
              <FastImage style={{ width: 16, height: 16, marginLeft: 15, marginBottom: 2, }} source={require('@images/split_orders.png')} />
            </TouchableOpacity>
          )}          
        </View>
        <SharedButton
          buttonSizes={styles.closePanelInstanceButton}
          iconSizes={{ width: styles.closePanelInstanceButton.width - 30, height: styles.closePanelInstanceButton.height - 30, }}
          source={require('@images/x_icon.png')}
          onPress={closePanelInstance}
          backgroundColor={'#F6F6F600'}
          borderRadius={50}
          scale={0.9} onStart
        />
      </View>
      <View style={styles.panelContent}>
        {children}
      </View>
    </View>
  )
}

export default PanelInstance
