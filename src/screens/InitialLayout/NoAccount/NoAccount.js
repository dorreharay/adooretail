import React, { useState, useEffect, useRef, } from "react";
import {
  View, Text, Keyboard, TouchableOpacity,
  KeyboardAvoidingView, TextInput, ScrollView,
} from "react-native";
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DeviceInfo from 'react-native-device-info';
import FastImage from "react-native-fast-image";
import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';
import BackgroundTimer from 'react-native-background-timer';
import styles from './styles';

import Logo from '@images/logo-default.svg'

import API from '@api'

import { addAccount } from '@reducers/UserReducer'

import ChangeView from './ChangeView'

function NoAccount(props) {
  const { navigation, } = props

  const dispatch = useDispatch()

  const inputRef = useRef(null)

  const [cameraVisible, setCameraVisibility] = useState(true)
  const [accountCode, setAccountCode] = useState('')
  const [loading, setLoadingStatus] = useState(false)
  const [errorVisible, setErrorVisible] = useState('')
  const [error, setError] = useState('')

  const setCode = async (text) => {
    setAccountCode(text)
  }

  const handleCode = async (code) => {
    const value = code ? code : accountCode

    if (value.length < 10) {
      return
    }

    try {
      setLoadingStatus(true)
      inputRef.current && inputRef.current.blur()
      Keyboard.dismiss()

      const deviceId = await DeviceInfo.getUniqueId();

      const data = await API.requestAccount({
        tablet_identifier: `EGABJDFDKJ-${value}-DDJIJIHLDF`,
        new_device_id: deviceId,
      })

      if (!data) throw new Error('Invalid response')

      dispatch(addAccount(data))

      setLoadingStatus(false)

      navigation.jumpTo('Login')
    } catch (error) {
      console.log('error - handleCode', error)

      // if (error.message === 'Invalid response') {
      //   setError('Аккаунт не знайдено')
      // }
      setErrorVisible(true)
      setError('Аккаунт не знайдено')

      BackgroundTimer.setTimeout(() => {
        setLoadingStatus(false)
      }, 500)
    }
  }

  const handleQRCode = async ({ barcodes }) => {
    if (!loading) {
      const qr = barcodes[0].data

      if (qr.slice(0, 11) === 'EGABJDFDKJ-' && qr.slice(21) === '-DDJIJIHLDF') {
        const deviceId = qr.slice(11, 21)

        setLoadingStatus(true)

        try {
          await handleCode(deviceId)

          BackgroundTimer.setTimeout(() => {
            setLoadingStatus(false)
          }, 2000)
        } catch (error) {
          setLoadingStatus(false)
        }
      } else {
        setLoadingStatus(false)
      }
    }
  }

  const reset = () => {
    // setCode('')
    setErrorVisible(false)

    BackgroundTimer.setTimeout(() => {
      setError('')
    }, 500)
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
      keyboardShouldPersistTaps={'handled'}
    >
      <View style={styles.logoContainer}>
        <Logo width={50} height={50} />
      </View>

      <TouchableOpacity
        style={styles.helpContainer}
        onPressIn={() => { }}
        activeOpacity={0.7}
      >
        <Text style={styles.helpText}>Де такий знайти?</Text>
      </TouchableOpacity>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.awareContentContainerStyles}
        resetScrollToCoords={{ x: 0, y: 0 }}
        extraScrollHeight={40}
        keyboardOpeningTime={0}
        enableOnAndroid
        keyboardShouldPersistTaps={'handled'}
      >

        <Text style={styles.heading}>Код-ідентифікатор закладу</Text>
        <Text style={styles.caption}>Введіть 10-значний код закладу Adoo для початку роботи.</Text>

        <View style={styles.midContainer}>
          <ChangeView
            visible={errorVisible}
            duration={300}
            first={
              <KeyboardAvoidingView behavior="height">
                <View>
                  <TextInput
                    ref={inputRef}
                    style={styles.input}
                    value={accountCode}
                    onChangeText={(text) => setCode(text)}
                    maxLength={10}
                    keyboardType='decimal-pad'
                    autoCapitalize='characters'
                  />
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={() => setCode('')}
                    activeOpacity={0.6}
                  >
                    <FastImage
                      style={{ width: 16, height: 16, }}
                      source={require('@images/x_icon.png')}
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => handleCode()}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    error ? (
                      <FastImage
                        style={{ width: '30%', height: '30%', }}
                        source={require('@images/x_icon.png')}
                      />
                    ) : (
                        <Progress.Circle
                          endAngle={0.7} size={20} color={'#000000'}
                          borderWidth={1.5} indeterminate={true}
                        />
                      )
                  ) : (
                      <FastImage
                        style={{ width: '30%', height: '30%', }}
                        source={require('@images/tick.png')}
                      />
                    )}
                </TouchableOpacity>
              </KeyboardAvoidingView>
            }
            second={
              <View style={styles.errorContainer}>
                <LottieView
                  style={styles.llamaError}
                  source={require('@lottie/lama-error.json')}
                  autoPlay
                  loop
                />

                <Text style={[styles.caption, { width: '100%', fontSize: 20, }]}>{error}</Text>

                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={reset}
                  activeOpacity={0.8}
                >
                  <FastImage
                    style={{ width: '35%', height: '35%', }}
                    source={require('@images/reload.png')}
                  />
                </TouchableOpacity>
              </View>
            }
          />
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  )
}



export default NoAccount;
