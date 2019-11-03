import React from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import Modal, { SlideAnimation, ModalContent, ModalButton, } from 'react-native-modals';

import { deviceHeight } from '@dimensions'
import { FUTURA_LIGHT, PROBA_REGULAR, } from '@fonts'

import SharedButton from '../../../components/SharedButton'
import { setEndOfSessionStatus } from '../../../../reducers/UserReducer'

function EndOfSessionModal({ navigation, isVisible, setModalVisibility, }) {
  const dispatch = useDispatch()

  const endSession = () => {
    dispatch(setEndOfSessionStatus({ status: true }))
    setModalVisibility(false)
    navigation.navigate('InitialLayout')
  }

  return (
    <Modal
			visible={isVisible}
			modalAnimation={new SlideAnimation({
				slideFrom: 'bottom',
				animationDuration: 30,
				useNativeDriver: true,
			})}
			// swipeDirection={['up', 'down']}
			// onSwipeOut={() => setPaymentModalVisible(false)}
			// onTouchOutside={() => setPaymentModalVisible(false)}
		>
      <ModalContent>
        <View style={styles.modal}>
          <Text style={styles.modalHeading}>Зміну завершено</Text>
          <Text style={styles.modalCaption}>Розпочніть нову</Text>
          <Image style={{ width: 180, height: 160, marginTop: 50, }} source={require('@images/sprint.png')}></Image>
          <SharedButton
            onPress={endSession}
            forceStyles={styles.linearButton}
            buttonSizes={{ width: '100%', backgroundColor: 'yellow' }}
            scale={0.9}
          >
            <LinearGradient
              style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', borderRadius: 3, }}
              start={{x: -1, y: -1}} end={{x: 1, y: 1}}
              colors={['#FF7675', '#FD9C6C']}
            >
              <Text style={styles.linearButtonText}>ЗАКІНЧИТИ ЗМІНУ</Text>
            </LinearGradient>
          </SharedButton>
        </View>
      </ModalContent>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 80,
    paddingTop: 30,
    paddingBottom: 35,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  modalHeading: {
    color: '#000000',
    fontSize: 35,
    fontFamily: FUTURA_LIGHT,
  },
  modalCaption: {
    marginTop: 20,
    color: '#000000',
    fontSize: 27,
    fontFamily: FUTURA_LIGHT,
  },
  linearButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 70,
    marginTop: 60,
  },
  linearButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: PROBA_REGULAR,
  },
})

export default EndOfSessionModal
