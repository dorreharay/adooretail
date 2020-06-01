import React, { Fragment, useState, } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import Modal, { SlideAnimation, ModalContent, } from 'react-native-modals';
import FastImage from 'react-native-fast-image'

import { FUTURA_REGULAR, PROBA_MEDIUM, PROBA_LIGHT, PROBA_REGULAR, } from '@fonts'
import { getFormattedDate, } from '@dateFormatter'

import { currentAccountSelector, } from '@selectors'
import { setEmployees, setStartCash, addFiveMinutesToShift, } from '@reducers/UserReducer'
import { setModalStatus, setEndOfSessionStatus } from '@reducers/TempReducer'

function SessionModal(props) {
  const {
    intervalRef, NavigationService,
    isVisible,
  } = props

  const dispatch = useDispatch()

  const currentAccount = useSelector(state => state.user.currentAccount)
  const modalStatus = useSelector(state => state.temp.modalStatus)

  const endSession = () => {
    dispatch(setEmployees([]))
    dispatch(setStartCash(0))
    dispatch(setEndOfSessionStatus(true))
    dispatch(setModalStatus(''))

    clearInterval(intervalRef.current)

    NavigationService.navigate('InputCash')
  }

  const startSession = () => {
    dispatch(setEmployees([]))
    dispatch(setStartCash(0))
    dispatch(setModalStatus(''))

    clearInterval(intervalRef.current)

    NavigationService.navigate('InputCash')
  }

  const handleBackButton = () => {
    dispatch(setModalStatus(''))
  }

  const addFiveMinutes = () => {
    dispatch(setModalStatus(''))

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
          {/* {modalStatus.type !== 'no_time' && (
            <TouchableOpacity
              style={styles.closeIconButton}
              onPress={handleBackButton}
              activeOpacity={1}
            >
              <FastImage style={styles.closeIcon} source={require('@images/back_modal.png')} />
            </TouchableOpacity>
          )} */}

          <Fragment>
            <View>
              <Text style={styles.modalRegularText}>{modalStatus ? modalStatus.first : ''}</Text>
              <Text style={styles.modalRegularText}>{modalStatus ? modalStatus.second : ''}</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                if(!modalStatus) {
                  return
                }

                if (modalStatus.type === 'start') startSession()

                if (modalStatus.type === 'end') endSession()

                if (modalStatus.type === 'not_on_shift') endSession()
              }}
              style={styles.linearButton}
              activeOpacity={1}
            >
              <LinearGradient
                style={styles.linearButtonGradient}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#DB3E47', '#EF9058']}
              >
                <Text style={styles.linearButtonText}>{modalStatus ? modalStatus.button : ''}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Fragment>

          {/* {settings.shifts.enabled && (
            <Text style={styles.modalShiftText}>Робочі години:
              {currentAccount && currentAccount.shift_start && (
                getFormattedDate(' HH:mm', { hours: currentAccount.shift_start.hours, minutes: currentAccount.shift_start.minutes, seconds: 0, })
              )}

              -

              {currentAccount && currentAccount.shift_end && (
                getFormattedDate('HH:mm', { hours: currentAccount.shift_end.hours, minutes: currentAccount.shift_end.minutes, seconds: 0, })
              )}
            </Text>
          )} */}
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
  modalShiftText: {
    position: 'absolute',
    bottom: 120,
    left: 40,
    color: '#363636',
    fontSize: 25,
    fontFamily: PROBA_MEDIUM,
    lineHeight: 37,
    textDecorationLine: 'underline',
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
    fontFamily: PROBA_MEDIUM,
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
