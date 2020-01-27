import React from 'react'
import { Text, View, Animated, TouchableOpacity, } from 'react-native'
import styles from '../RightSide/styles'

import SharedButton from '@shared/SharedButton';

function Panel(props) {
  const { endSession, modalOpacity, closeMenu, menuButtons = [], } = props

  return (
    <Animated.View
      style={[styles.modalWrapper, { opacity: modalOpacity }]}
      onTouchStart={closeMenu}
    >
      <View style={styles.modalContainer}>
        <SharedButton
          onPress={closeMenu}
          style={styles.closeModal}
          iconStyle={{ width: styles.menu.width - 24, height: styles.menu.height - 30, }}
          source={require('@images/menu.png')}
          scale={0.9}
        />
        <View style={styles.modal}>
          {menuButtons.map((button, index) => (
            <TouchableOpacity
              style={[styles.modalItem, index === 0 && styles.withTopBorderRadius]}
              onPress={button.onPress}
              activeOpacity={1}
              key={index}
            >
              <Text style={styles.modalItemText}>{button.name}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.modalItemRed, styles.withBottomBorderRadius]}
            onPress={endSession}
            activeOpacity={1}
          >
            <Text style={[styles.modalItemText, styles.redText]}>Закінчити зміну</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  )
}

export default Panel 