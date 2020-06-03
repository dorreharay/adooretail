import React, { useState, } from 'react'
import { Text, View, TouchableOpacity, TouchableHighlight, } from 'react-native'
import { useDispatch } from 'react-redux'
import { default as EModal } from "react-native-simple-modal";
import Modal, { SlideAnimation, ModalContent, ModalFooter, ModalButton, } from 'react-native-modals';
import styles from './styles'

import { deviceHeight } from '@dimensions';

import { setEmployees, setStartCash, } from '@reducers/UserReducer'
import { setEndOfSessionStatus } from '@reducers/TempReducer';

import SharedButton from '@shared/SharedButton'
import FastImage from 'react-native-fast-image';

function Menu(props) {
  const { isVisible, closeMenu, navigation, setTransactionModalVisiblity, } = props

  const dispatch = useDispatch()

  const [endPromptVisible, setEndPromptVisible] = useState(false)
  const [menuButtons] = useState([
    {
      name: 'Історія замовлень',
      onPress: () => {
        navigation.jumpTo('ControlLayout', {
          screen: 0,
        })
        closeMenu()
      }
    },
    {
      name: 'Створити транзакцію',
      onPress: () => {
        closeMenu()
      }
    },
    {
      name: 'Налаштування',
      onPress: () => {
        navigation.jumpTo('ControlLayout', {
          screen: 1,
        })
        closeMenu()
      }
    },
  ])

  const endSession = () => {
    setEndPromptVisible(false)
    dispatch(setEmployees([]))
    dispatch(setStartCash(0))
    dispatch(setEndOfSessionStatus(true))
    closeMenu()

    navigation.jumpTo('InputCash')
  }

  return (
    <>
      {/* {isVisible && (
        <SharedButton
          onPress={closeMenu}
          style={styles.menuPlaceholder}
          iconStyle={styles.menuPlaceholderIcon}
          source={require('@images/menu.png')} scale={0.9}
        />
      )} */}

      <Modal
        visible={isVisible}
        modalStyle={styles.modalComponent}
        overlayBackgroundColor={'rgba(0, 0, 0, 0.85)'}
        onTouchOutside={closeMenu}
        disableOnBackPress={false}
        swipeDirection={['up', 'down']}
        onHardwareBackPress={closeMenu}
        onSwipeOut={closeMenu}
        // offset={deviceHeight < 500 ? -(deviceHeight * 0.46) : -(deviceHeight * 0.23)}
      >
        <View style={styles.modal}>
          {menuButtons.map((button, index) => (
            <TouchableHighlight
              style={[styles.modalItem, index === 0 && styles.withTopBorderRadius]}
              onPress={() => {
                if (index === 1) {
                  setTransactionModalVisiblity(true)
                }
                button.onPress()
              }}
              underlayColor={'#F3F3F3'}
              activeOpacity={1}
              key={index}
            >
              <>
                {index === 1 && (
                  <FastImage
                    style={{ width: 16, height: 16, marginRight: 12 }}
                    source={require('@images/right-arrow.png')}
                  />
                )}

                {/* {index === 2 && (
                <FastImage
                  style={{ width: 16, height: 16, marginRight: 13 }}
                  source={require('@images/tprinter.png')}
                />
              )} */}

                <Text style={styles.modalItemText}>{button.name}</Text>
              </>
            </TouchableHighlight>
          ))}

          <TouchableHighlight
            style={[styles.modalItemRed, styles.withBottomBorderRadius]}
            onPress={() => {
              setEndPromptVisible(true)
              closeMenu()
            }}
            underlayColor={'#F3F3F3'}
            activeOpacity={1}
          >
            <Text style={[styles.modalItemText, styles.redText]}>Закінчити зміну</Text>
          </TouchableHighlight>
        </View>
      </Modal>

      <Modal
        visible={endPromptVisible}
        modalStyle={styles.promptStyle}
        overlayBackgroundColor={'rgba(0, 0, 0, 0.85)'}
        footer={
          <ModalFooter>
            <ModalButton
              text='Скасувати'
              textStyle={[styles.promptText, { color: '#DB3E5A' }]}
              onPress={() => setEndPromptVisible(false)}
            />
            <ModalButton
              text='Так'
              textStyle={[styles.promptText, { color: '#343434' }]}
              onPress={endSession}
            />
          </ModalFooter>
        }
      >
      
        <ModalContent>
          <Text style={styles.promptText}>Ви точно хочете закінчити зміну?</Text>
        </ModalContent>
      </Modal>
    </>

  )
}

export default Menu 