import React, { useState, useEffect, useRef, } from "react";
import { View, Text, Keyboard, TouchableOpacity, KeyboardAvoidingView, TextInput, } from "react-native";
import axios from 'axios';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { RNCamera } from 'react-native-camera';
import styles from '../styles';

function ConfigureAccount(props) {
  const { setLoadingStatus, navigation, } = props

  const inputRef = useRef(null)
  const [cameraVisible, setCameraVisibility] = useState(true)
  const [accountCode, setAccountCode] = useState('')

  const setCode = (text) => {
    if(accountCode.length > 9 && text.length > accountCode.length) {
      return
    }

    if(accountCode.length === 9) {
      setLoadingStatus(true)
      inputRef.current.blur()
      Keyboard.dismiss()

      setTimeout(() => {
        setLoadingStatus(false)
        invokeAnimation(true)
      }, 1000)
    }

    setAccountCode(text)
  }

  const invokeAnimation = (success) => {
    if(success) {
      props.invokeSuccessAnimation()
    } else {
      props.invokeFailAnimation()
    }
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
