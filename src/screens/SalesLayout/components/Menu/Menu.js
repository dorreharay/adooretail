import React, { useState, } from 'react'
import { Text, View, TouchableOpacity, TouchableHighlight, Alert, } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import styles from './styles'

import { deviceWidth, deviceHeight } from '@dimensions'

import { setStartCash, } from '@reducers/UserReducer'
import { setEndOfSessionStatus, setMenuVisibility, setTransactionModalVisibility, setSessionModalState, } from '@reducers/TempReducer';

import FastImage from 'react-native-fast-image';

function Menu(props) {
  const {} = props

  const dispatch = useDispatch()
  const navigation = useNavigation()

  const menuVisibility = useSelector(state => state.temp.menuVisibility)

  const [menuButtons] = useState([
    {
      name: 'Історія замовлень',
      onPress: () => {
        navigation.jumpTo('ControlLayout', {
          screen: 0,
        })
        dispatch(setMenuVisibility(false))
      }
    },
    {
      name: 'Створити транзакцію',
      onPress: () => {
        dispatch(setTransactionModalVisibility(true))
        dispatch(setMenuVisibility(false))
      }
    },
    {
      name: 'Налаштування',
      onPress: () => {
        navigation.jumpTo('ControlLayout', {
          screen: 3,
        })
        dispatch(setMenuVisibility(false))
      }
    },
  ])

  const endSession = () => {
    dispatch(setSessionModalState(true))
    dispatch(setStartCash(0))
    dispatch(setEndOfSessionStatus(true))
    dispatch(setMenuVisibility(false))

    // navigation.jumpTo('InputCash')
  }

  return (
    <>
      {menuVisibility && (
        <>
        <TouchableOpacity 
          style={{ position: 'absolute', top: 0, left: 0, width: deviceWidth, height: deviceHeight, backgroundColor: '#00000066' }}
          onPress={() => dispatch(setMenuVisibility(false))}
        />
        <View style={styles.modal}>
          {menuButtons.map((button, index) => (
            <TouchableHighlight
              style={[styles.modalItem, index === 0 && styles.withTopBorderRadius]}
              onPress={() => {
                if (index === 1) {
                  dispatch(setTransactionModalVisibility(true))
                }
                button.onPress()
              }}
              underlayColor='#F3F3F3'
              key={index}
            >
              <>
                {index === 1 && (
                  <FastImage
                    style={{ width: 16, height: 16, marginRight: 12 }}
                    source={require('@images/right-arrow.png')}
                  />
                )}

                <Text style={styles.modalItemText}>{button.name}</Text>
              </>
            </TouchableHighlight>
          ))}

          <TouchableOpacity
            style={[styles.modalItemRed, styles.withBottomBorderRadius]}
            onPress={endSession}
            activeOpacity={1}
          >
            <Text style={[styles.modalItemText, styles.redText]}>Закінчити зміну</Text>
          </TouchableOpacity>
        </View>
        </>
      )}

      {/* <Modal
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
        </ModalContent> */}
      {/* </Modal> */}
    </>

  )
}

export default Menu 