import React, { useState, useEffect, useRef, } from "react";
import { View, Text, Keyboard, TouchableOpacity, KeyboardAvoidingView, TextInput, } from "react-native";
import axios from 'axios';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { RNCamera } from 'react-native-camera';
import API from '@rest/api'
import styles from '../styles';

import { addAccount } from '@reducers/UserReducer'

function ConfigureAccount(props) {
  const { setLoadingStatus, navigation, } = props

  const dispatch = useDispatch()

  const inputRef = useRef(null)
  const [cameraVisible, setCameraVisibility] = useState(true)
  const [accountCode, setAccountCode] = useState('')

  const setCode = async (text) => {
    setAccountCode(text)

    if (text.length === 10) {
      setLoadingStatus(true)
      inputRef.current.blur()
      Keyboard.dismiss()

      try {
        const data = await API.requestAccount({
          tablet_identifier: text,
        })

        if (!data) throw new Error('Не вірні дані')

        dispatch(addAccount(data))

        setLoadingStatus(false)
        invokeAnimation(true)
      } catch (error) {
        setLoadingStatus(false)
        invokeAnimation(false)
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

  const gotoLogin = () => {
    navigation.navigate('Login')
  }

  return (
    <>
      {cameraVisible ? (
        <>
          <Text style={styles.loginHeading}>Проскануйте QR-код аккаунту</Text>

          <View style={styles.cameraContainer}>
            <RNCamera
              style={{ height: '100%', }}
              type={RNCamera.Constants.Type.back}
              androidCameraPermissionOptions={{
                title: 'Доступ до камери',
                message: 'Програма потребує дозвіл використання камери для зчитування QR-кодів',
                buttonPositive: 'Дозволити',
                buttonNegative: 'Відхилити',
              }}
              onGoogleVisionBarcodesDetected={({ barcodes }) => {
                // setTimeout(() => navigation.navigate('Login'), 250)
              }}
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
