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
    <Modal
      visible={isVisible}
      modalAnimation={new FadeAnimation({
        animationDuration: 30,
        useNativeDriver: true,
      })}
      onTouchOutside={closePanelInstance}
      // swipeDirection={['left', 'right']}
      onSwipeOut={closePanelInstance}
    >
      <ModalContent>
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
              iconSizes={{ width: styles.closePanelInstanceButton.width * 0.35, height: styles.closePanelInstanceButton.height * 0.35, }}
              source={require('@images/x_icon.png')}
              onPress={closePanelInstance}
              backgroundColor={'#F0F0F0'} 
              borderRadius={50} 
              scale={0.9} onStart
            />
          </View>

          {children}
        </View>
      </ModalContent>
    </Modal>
  )
}

export default PanelInstance
