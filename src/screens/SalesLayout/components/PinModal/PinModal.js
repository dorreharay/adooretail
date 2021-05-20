import React, { Fragment, useState, useEffect, } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { View, Text, Animated, Easing, TouchableOpacity, } from 'react-native';
import Modal, { SlideAnimation, ModalContent, } from 'react-native-modals';
import BackgroundTimer from 'react-native-background-timer';
import styles from './styles'

import { getFormattedDate, } from '@dateFormatter'

function PinModal(props) {
  const {
    isVisible, setVisible,
  } = props

  const currentAccount = useSelector(state => state.user.currentAccount)

  const [keys, setKeys] = useState([
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['x', '0', '<'],
  ])

  const [pin, setPin] = useState(['', '', '', '',])
  const [animatedValue] = useState(new Animated.Value(0))

  useEffect(() => {
    const final = pin.join('')

    if (final.length === 4) {
      if (currentAccount && currentAccount?.pins.includes(final)) {
        BackgroundTimer.setTimeout(() => {
          setVisible(false)

          BackgroundTimer.setTimeout(() => {
            resetPin()
          }, 400)
        }, 200)
      } else {
        BackgroundTimer.setTimeout(() => {
          handleAnimation()
          resetPin()
        }, 200)
      }
    }
  }, [pin])

  const handleAnimation = () => {
    Animated.sequence([

      Animated.timing(animatedValue, { toValue: 10.0, duration: 50, easing: Easing.linear }),

      Animated.timing(animatedValue, { toValue: -10.0, duration: 50, easing: Easing.linear }),

      Animated.timing(animatedValue, { toValue: 0.0, duration: 50, easing: Easing.linear }),

    ]).start();
  }

  const handleKey = (value) => {
    const firstEmpty = pin.indexOf('')

    setPin(pin.map((item, index) => index === firstEmpty ? value : item))
  }

  const deleteLastKey = () => {
    let lastEmpty = pin.indexOf('')

    if (lastEmpty === -1) lastEmpty = 4

    setPin(pin.map((item, index) => index === lastEmpty - 1 ? '' : item))
  }

  const resetPin = () => {
    setPin(['', '', '', ''])
  }

  return (
    <Modal
      visible={isVisible}
      modalAnimation={new SlideAnimation({
        slideFrom: 'bottom',
        animationDuration: 30,
        useNativeDriver: true,
      })}
      width={420}
      height={500}
      modalStyle={{ borderRadius: 10, }}
      overlayBackgroundColor={'#000000'}
      // overlayOpacity={0.6}
    >
      <ModalContent>
        <View style={styles.modal}>
          <View style={{ width: '100%', paddingHorizontal: '3%', }}>
            <Text style={styles.pinHeading}>Код доступу</Text>
            <Text style={styles.modalRegularText}>{''}</Text>
          </View>

          <Animated.View style={[styles.pinValues, { left: animatedValue }]}>
            {pin.map((item, index) => (
              <View style={styles.pinItem} key={index}>
                <Text style={[styles.pinValue, !item && { color: '#CCCCCC' }]}>{item || '-'}</Text>
              </View>
            ))}
          </Animated.View>

          <View style={styles.pinKeys}>
            {keys.map((row, index) => (
              <View style={styles.pinKeysRow} key={index}>
                {row.map((itemKey, key) => (
                  <TouchableOpacity
                    style={styles.pinKey}
                    underlayColor={'red'}
                    onPress={() => {
                      if (itemKey === '<') {
                        deleteLastKey()
                      } else if (itemKey === 'x') {
                        resetPin()
                      } else {
                        handleKey(itemKey)
                      }
                    }}
                    activeOpacity={1}
                    key={key}
                  >
                    <Text style={styles.pinKeyText}>{itemKey}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
      </ModalContent>
    </Modal>
  )
}

export default PinModal
