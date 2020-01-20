import React, { Fragment, useState, } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import Modal, { SlideAnimation, ModalContent, } from 'react-native-modals';
import FastImage from 'react-native-fast-image'

import { FUTURA_REGULAR, PROBA_MEDIUM, PROBA_LIGHT, PROBA_REGULAR, } from '@fonts'

import { setEmployees, setStartCash, addFiveMinutesToShift, } from '@reducers/UserReducer'
import { setEndOfSessionStatus } from '@reducers/TempReducer'

function SessionModal(props) {
  const {
    navigation, intervalRef,
    modalStatus, setModalStatus,
    openChangeAccountOverview,
  } = props

  const dispatch = useDispatch()

  const endSession = () => {
    dispatch(setEmployees([]))
    dispatch(setStartCash(0))
    dispatch(setEndOfSessionStatus(true))
    setModalStatus('')

    clearInterval(intervalRef.current)

    navigation.navigate('InputCash')
  }

  const startSession = () => {
    dispatch(setEmployees([]))
    dispatch(setStartCash(0))
    setModalStatus('')

    clearInterval(intervalRef.current)

    navigation.navigate('InputCash')
  }

  const handleBackButton = () => {
    setModalStatus('')
    openChangeAccountOverview()
  }

  const addFiveMinutes = () => {
    setModalStatus('')

    clearInterval(intervalRef.current)
    dispatch(addFiveMinutesToShift())
  }

  return (
    <Modal
      visible={modalStatus !== ''}
      modalAnimation={new SlideAnimation({
        slideFrom: 'bottom',
        animationDuration: 30,
        useNativeDriver: true,
      })}
      modalStyle={{ borderRadius: 11, }}
    >
      <ModalContent>
        <View style={styles.modal}>
          {modalStatus.type !== 'no_time' && (
            <TouchableOpacity
              style={styles.closeIconButton}
              onPress={handleBackButton}
              activeOpacity={1}
            >
              <FastImage style={styles.closeIcon} source={require('@images/back_modal.png')} />
            </TouchableOpacity>
          )}

          <Fragment>
            <View>
              <Text style={styles.modalRegularText}>{modalStatus.first}</Text>
              <Text style={styles.modalRegularText}>{modalStatus.second}</Text>
            </View>

            {modalStatus.type === 'end' && (
              <TouchableOpacity
                style={styles.additonalButton}
                onPress={addFiveMinutes}
              >
                <Text style={styles.additonalButtonText}>Ще 5 хвилин</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => {
                if (modalStatus.type === 'start') startSession()

                if (modalStatus.type === 'end') endSession()

                if (modalStatus.type === 'no_time') setModalStatus('')
              }}
              style={styles.linearButton}
              activeOpacity={1}
            >
              <LinearGradient
                style={styles.linearButtonGradient}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#DB3E47', '#EF9058']}
              >
                <Text style={styles.linearButtonText}>{modalStatus.button}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Fragment>
        </View>
      </ModalContent>
    </Modal>
  )
}

const styles = StyleSheet.create({
  closeIconButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  closeIcon: {
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
  additonalButton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 80,
    width: '100%',
    padding: 20,
    // marginLeft: 10,
  },
  additonalButtonText: {
    color: '#343434',
    fontSize: 16,
    fontFamily: FUTURA_REGULAR,
  }
})

export default SessionModal
