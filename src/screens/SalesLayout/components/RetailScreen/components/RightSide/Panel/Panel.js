import React, { useRef, useState, useEffect, } from 'react'
import { Text, View, Image, TextInput, Alert, Animated, Easing, TouchableOpacity, } from 'react-native'
import Modal, { FadeAnimation, ModalContent, } from 'react-native-modals';
import styles from '../styles'

import SharedButton from '@shared/SharedButton';


function Panel(props) {
  const { endSession, modalOpacity, closeMenu, openMenu, } = props

  const [menuVisible, setMenuVisibility] = useState(false)

  const [menuButtons] = useState([
    { name: 'Історія замовлень', onPress: () => {} },
    { name: 'Пристрої', onPress: () => {} },
    { name: 'Змінити аккаунт', onPress: () => {} },
    { name: 'Інкасації', onPress: () => {} },
  ])

  return (
    <Animated.View
      style={[styles.modalWrapper, { opacity: modalOpacity }]}
      onTouchStart={closeMenu}
    >
      <View style={styles.modalContainer}>
        <SharedButton
          onPress={closeMenu}
          buttonSizes={styles.closeModal}
          iconSizes={{ width: styles.menu.width - 24, height: styles.menu.height - 27,  }}
          source={require('@images/menu.png')}
          scale={0.9} backgroundColor={'#FFFFFF'} onStart
        />
        <View style={styles.modal}>
          {menuButtons.map((button, index) => (
            <TouchableOpacity 
              style={[styles.modalItem, index === 0 && styles.withTopBorderRadius]}
              onPress={closeMenu}
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