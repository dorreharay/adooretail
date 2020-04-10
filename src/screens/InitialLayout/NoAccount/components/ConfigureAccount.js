import React, { useState, useEffect, useRef, } from "react";
import { View, Text, Keyboard, TouchableOpacity, KeyboardAvoidingView, TextInput, } from "react-native";
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { RNCamera } from 'react-native-camera';
import DeviceInfo from 'react-native-device-info';
import * as Progress from 'react-native-progress';
import styles from '../styles';

import API from '@api'

import { addAccount } from '@reducers/UserReducer'

function ConfigureAccount(props) {
  const { loading, setLoadingStatus, navigation, } = props

  const dispatch = useDispatch()

  const inputRef = useRef(null)

  const [cameraVisible, setCameraVisibility] = useState(true)
  const [accountCode, setAccountCode] = useState('')

  const setCode = async (text) => {
    setAccountCode(text)

    if (text.length === 10) {
      try {
        setLoadingStatus(true)
        inputRef.current && inputRef.current.blur()
        Keyboard.dismiss()

        console.log('text', text.length)

        const deviceId = await DeviceInfo.getUniqueId();

        const data = await API.requestAccount({
          tablet_identifier: `EGABJDFDKJ-${text}-DDJIJIHLDF`,
          new_device_id: deviceId,
        })

        if (!data) throw new Error('Invalid response')

        dispatch(addAccount(data))

        setLoadingStatus(false)
        invokeAnimation(true)
      } catch (error) {
        setLoadingStatus(false)
        invokeAnimation(false)
        console.log(error)
      }
    }
  }

  const invokeAnimation = (success) => {
    if (success) {
      props.invokeSuccessAnimation(gotoLogin)
    } else {
      props.invokeFailAnimation()
    }
  }

  const handleQRCode = async ({ barcodes }) => {
    if (!loading) {
      const qr = barcodes[0].data

      if (qr.slice(0, 11) === 'EGABJDFDKJ-' && qr.slice(21) === '-DDJIJIHLDF') {
        const deviceId = qr.slice(11, 21)

        setLoadingStatus(true)

        try {
          await setCode(deviceId)

          setTimeout(() => {
            setLoadingStatus(false)
          }, 2000)
        } catch (error) {
          setLoadingStatus(false)
        }
      } else {
        console.log('invalid')
        setLoadingStatus(false)
      }
    }
  }

  const gotoLogin = () => {
    navigation.navigate('Login')
  }

  return (
    <>
      {cameraVisible ? (
        <>
          <Text style={styles.loginHeading}>Проскануйте QR-код аккаунту</Text>

          <View style={styles.cameraContainer}>
            {loading && (
              <View style={styles.loadingWrapper}>
                <Text style={styles.loadingWrapperText}>Обробка...</Text>
              </View>
            )}
            <RNCamera
              style={{ height: '100%', }}
              type={RNCamera.Constants.Type.back}
              androidCameraPermissionOptions={{
                title: 'Доступ до камери',
                message: 'Програма потребує дозвіл використання камери для зчитування QR-кодів',
                buttonPositive: 'Дозволити',
                buttonNegative: 'Відхилити',
              }}
              onGoogleVisionBarcodesDetected={handleQRCode}
            />
          </View>

          <TouchableOpacity
            style={styles.loginCaption}
            onPress={() => setCameraVisibility(!cameraVisible)}
            activeOpacity={1}
          >
            <Text style={styles.loginCaptionText}>ввести код аккаунту самостійно</Text>
          </TouchableOpacity>
        </>
      ) : (
          <>
            <Text style={styles.loginHeading}><Text style={styles.loginHeadingSuper}>В</Text>ведіть код аккаунту</Text>
            <Text style={styles.loginHeadingCaption}>10 символів</Text>

            <KeyboardAvoidingView behavior="padding">
              <View style={styles.inputContainer}>
                <TextInput
                  ref={inputRef}
                  style={styles.input}
                  value={accountCode}
                  onChangeText={(text) => setCode(text)}
                  keyboardType='decimal-pad'
                  autoCapitalize='characters'
                  autoFocus
                />
              </View>
            </KeyboardAvoidingView>

            <TouchableOpacity
              style={styles.loginCaption}
              onPress={() => setCameraVisibility(!cameraVisible)}
              activeOpacity={1}
            >
              <Text style={styles.loginCaptionText}>просканувати QR-код</Text>
            </TouchableOpacity>
          </>
        )}
    </>
  )
}



export default ConfigureAccount;
