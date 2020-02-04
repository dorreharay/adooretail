import React, { useState, } from 'react'
import { Text, View, Animated, TouchableOpacity, } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Modal from "react-native-simple-modal";
import styles from '../RightSide/styles'

import { deviceHeight } from '@dimensions';

import { setEmployees, setStartCash, } from '@reducers/UserReducer'
import { setEndOfSessionStatus } from '@reducers/TempReducer';

import SharedButton from '@shared/SharedButton'

function Menu(props) {
  const { isVisible, closeMenu, navigation, openChangeAccountOverview, } = props

  const dispatch = useDispatch()

  const [menuButtons] = useState([
    {
      name: 'Панель керування',
      onPress: () => {
        navigation.navigate('ControlLayout')
        closeMenu()
      }
    },
    {
      name: 'Змінити аккаунт', onPress: () => {
        openChangeAccountOverview()
        closeMenu()
      }
    },
  ])

  const endSession = () => {
    dispatch(setEmployees([]))
    dispatch(setStartCash(0))
    dispatch(setEndOfSessionStatus(true))
    closeMenu()

    navigation.navigate('InputCash')
  }

  return (
    <>
      <Modal
        animationDuration={200}
        animationTension={100}
        closeOnTouchOutside={true}
        closeModal={closeMenu}
        containerProps={undefined}
        containerStyle={{
          justifyContent: "center"
        }}
        disableOnBackPress={false}
        modalDidClose={closeMenu}
        modalDidOpen={() => undefined}
        modalProps={undefined}
        modalStyle={{
          width: 320,
          height: 200,
          position: 'absolute',
          // top: 187,
          top: 242,
          right: 12,
          borderRadius: 2,
          margin: 20,
          // padding: 10,
          borderRadius: 5,
          // backgroundColor: "#FFFFFF",
          backgroundColor: "transparent",
        }}
        offset={-(deviceHeight * 0.23)}
        open={isVisible}
        overlayStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.55)",
          flex: 1
        }}
      >
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
      </Modal>
      {isVisible && (
        <SharedButton
          onPress={closeMenu}
          style={{ position: 'absolute', zIndex: 1000, top: 15, right: 23, width: styles.menu.width, height: styles.menu.height, backgroundColor: '#FFFFFF' }}
          iconStyle={{ width: styles.menu.width - 24, height: styles.menu.height - 30, }}
          source={require('@images/menu.png')} scale={0.9}
        />
      )}
    </>

  )
}

export default Menu 