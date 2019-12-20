import React, { Fragment, useState, } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import Modal, { SlideAnimation, ModalContent, } from 'react-native-modals';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image'

import { PROBA_MEDIUM, PROBA_LIGHT, PROBA_REGULAR, } from '@fonts'

import SharedButton from '@shared/SharedButton';

import { setInitialSlide, setEmployees, setStartCash, } from '../../../../../reducers/UserReducer'
import { setEndOfSessionStatus } from '../../../../../reducers/TempReducer'

function SessionModal({ navigation, isVisible, invalidSessions, setInvalidSessions, index, noSessionCreated, }) {
  const dispatch = useDispatch()

  const [loading, setLoadingStatus] = useState(false)

  const endSession = () => {
    dispatch(setEmployees([]))
    dispatch(setStartCash(0))
    dispatch(setEndOfSessionStatus(true))
    setInvalidSessions(invalidSessions.map((item, key) => false))

    navigation.navigate('InputCash')
  }

  const startSession = () => {
    dispatch(setEmployees([]))
    dispatch(setStartCash(0))
    setInvalidSessions(invalidSessions.map((item, key) => false))

    navigation.navigate('InputCash')
  }

  const relativeText = {
    start: {
      first: 'Попередня зміна закінчена.',
      second: 'Введіть остаточну касу за зміну та розпочніть нову.',
      button: 'РОЗПОЧАТИ ЗМІНУ'
    },
    end: {
      first: 'Створіть першу зміну в новому аккаунті.',
      second: 'Попередні зміни не будуть втарачені.',
      button: 'ЗАКІНЧИТИ ЗМІНУ'
    }
  }

  const currentText = relativeText[noSessionCreated ? 'start' : 'end']

  return (
    <Modal
      visible={isVisible}
      modalAnimation={new SlideAnimation({
        slideFrom: 'bottom',
        animationDuration: 30,
        useNativeDriver: true,
      })}
      modalStyle={{ borderRadius: 11, }}
    >
      <ModalContent>
        <View style={styles.modal}>
          <FastImage style={styles.closeIcon} source={require('@images/back_modal.png')}></FastImage>
          <Fragment>
            <View>
            <Text style={styles.modalRegularText}>{currentText.first}</Text>
              <Text style={styles.modalRegularText}>{currentText.second}</Text>
            </View>
            
            <SharedButton
              onPress={endSession}
              forceStyles={styles.linearButton}
              buttonSizes={{ width: '100%', }}
              scale={0.92} onStart
            >
              <LinearGradient
                style={styles.linearButtonGradient}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#DB3E47', '#EF9058']}
              >
                {loading ? (
                  <Progress.Circle
                    endAngle={0.9} size={25} color={'#FFFFFF'}
                    borderWidth={2} indeterminate={true}
                  />
                ) : (
                    <Text style={styles.linearButtonText}>{currentText.button}</Text>
                  )}
              </LinearGradient>
            </SharedButton>
          </Fragment>
        </View>
      </ModalContent>
    </Modal>
  )
}

const styles = StyleSheet.create({
  closeIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 22,
    height: 18,
  },
  modal: {
    justifyContent: 'space-between',
    width: 450,
    height: 430,
    paddingTop: 30,
    paddingBottom: 0,
    marginLeft: -18,
    marginBottom: -24,
  },
  modalRegularText: {
    width: '70%',
    marginHorizontal: 40,
    marginBottom: 20,
    color: '#363636',
    fontSize: 30,
    fontFamily: PROBA_MEDIUM,
    lineHeight: 37,
  },
  changeAccountButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 85,
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  changeAccountButtonText: {
    color: '#7D7D7D',
    fontSize: 17,
    fontFamily: PROBA_LIGHT,
  },
  linearButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 470,
    height: 75,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  linearButtonGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingBottom: 1,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  linearButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: PROBA_REGULAR,
  },
})

export default SessionModal
