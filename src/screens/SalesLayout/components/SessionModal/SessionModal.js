import React, { Fragment, useState, } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { View, Text, Image, TouchableOpacity, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import Modal, { SlideAnimation, ModalContent, } from 'react-native-modals';
import FastImage from 'react-native-fast-image'
import styles from './styles'

import { getFormattedDate, } from '@dateFormatter'

import { currentAccountSelector, } from '@selectors'
import { setEmployees, setStartCash, addFiveMinutesToShift, } from '@reducers/UserReducer'
import { setModalStatus, setEndOfSessionStatus } from '@reducers/TempReducer'

function SessionModal(props) {
  const {
    intervalRef, gotoInputCash,
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

    gotoInputCash()
  }

  const startSession = () => {
    dispatch(setEmployees([]))
    dispatch(setStartCash(0))
    dispatch(setModalStatus(''))

    clearInterval(intervalRef.current)

    gotoInputCash()
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
      width={400}
      height={290}
      modalStyle={{ borderRadius: 5, }}
    >
      <ModalContent>
        <View style={styles.modal}>
          <View style={{ width: '100%', paddingHorizontal: '3%', }}>
            <Text style={styles.modalHeadingext}>{modalStatus ? modalStatus.first : ''}</Text>
            <Text style={styles.modalRegularText}>{modalStatus ? modalStatus.second : ''}</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              if (!modalStatus) {
                return null
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
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              colors={['#DB3E69', '#EF9058']}
            >
              <Text style={styles.linearButtonText}>{modalStatus ? modalStatus.button : ''}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ModalContent>
    </Modal>
  )
}

export default SessionModal
