import React, { useState } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import Modal, { SlideAnimation, ModalContent, } from 'react-native-modals';
import * as Progress from 'react-native-progress';

import { FUTURA_LIGHT, PROBA_REGULAR, } from '@fonts'

import SharedButton from '@shared/SharedButton';

import { setInitialSlide, setEmployees, setStartCash, } from '../../../../reducers/UserReducer'
import { setEndOfSessionStatus } from '../../../../reducers/TempReducer'

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

  return (
    <Modal
      visible={isVisible}
      modalAnimation={new SlideAnimation({
        slideFrom: 'bottom',
        animationDuration: 30,
        useNativeDriver: true,
      })}
    >
      <ModalContent>
        <View style={styles.modal}>
          {noSessionCreated ? (
            <>
              <Text style={styles.modalCaption}>Сессія не створена</Text>
              <Text style={styles.modalCaption}>розпочніть нову</Text>
              <SharedButton
                onPress={startSession}
                forceStyles={styles.linearButton}
                buttonSizes={{ width: '100%', }}
                scale={0.92} onStart
              >
                <LinearGradient
                  style={styles.linearButtonGradient}
                  start={{ x: -1, y: -1 }} end={{ x: 1, y: 1 }}
                  colors={['#FF7675', '#FD9C6C']}
                >
                  {loading ? (
                    <Progress.Circle
                      endAngle={0.9} size={25} color={'#FFFFFF'}
                      borderWidth={2} indeterminate={true}
                    />
                  ) : (
                      <Text style={styles.linearButtonText}>РОЗПОЧАТИ ЗМІНУ</Text>
                    )}
                </LinearGradient>
              </SharedButton>

            </>
          ) : (
              <>
                <Text style={styles.modalHeading}>Зміну завершено</Text>
                <Text style={styles.modalCaption}>Розпочніть нову</Text>
                <Image style={{ width: 180, height: 160, marginTop: 50, }} source={require('@images/sprint.png')}></Image>
                <SharedButton
                  onPress={endSession}
                  forceStyles={styles.linearButton}
                  buttonSizes={{ width: '100%', }}
                  scale={0.92} onStart
                >
                  <LinearGradient
                    style={styles.linearButtonGradient}
                    start={{ x: -1, y: -1 }} end={{ x: 1, y: 1 }}
                    colors={['#FF7675', '#FD9C6C']}
                  >
                    {loading ? (
                      <Progress.Circle
                        endAngle={0.9} size={25} color={'#FFFFFF'}
                        borderWidth={2} indeterminate={true}
                      />
                    ) : (
                        <Text style={styles.linearButtonText}>ЗАКІНЧИТИ ЗМІНУ</Text>
                      )}
                  </LinearGradient>
                </SharedButton>
              </>
            )}

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
    marginTop: 25,
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
  linearButtonGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 3,
  },
  linearButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: PROBA_REGULAR,
  },
})

export default SessionModal
