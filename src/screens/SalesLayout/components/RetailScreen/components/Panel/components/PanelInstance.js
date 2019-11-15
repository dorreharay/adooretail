import React from 'react'
import { View, Text, TouchableOpacity, } from 'react-native'
import Modal, { FadeAnimation, ModalContent, } from 'react-native-modals';
import styles from './styles'

import { deviceWidth, deviceHeight } from '@dimensions';
import SharedButton from '@shared/SharedButton';

function PanelInstance(props) {
  const {
    children, isVisible, closePanelInstance,
    panelScreenState,
  } = props

  return (
    <View style={styles.panelWrapper}>
      <View style={styles.panelContainer}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHeading}>
            <Text style={styles.panelHeadingText}>
              {panelScreenState.history && panelScreenState.history}
              {panelScreenState.devices && panelScreenState.devices}
              {panelScreenState.transactions && panelScreenState.transactions}
            </Text>
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

        {children}
      </View>
    </View>
  )
}

export default PanelInstance
