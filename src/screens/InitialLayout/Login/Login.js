import React, { useState, useEffect, useRef, } from "react";
import { View, Text, Animated, Easing, TouchableOpacity, Keyboard, KeyboardAvoidingView, } from "react-native";
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import Ripple from 'react-native-material-ripple';
import DeviceInfo from 'react-native-device-info';
import Toast, { DURATION } from 'react-native-easy-toast'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Logo from '@images/logo-big.svg'
import styles from './styles';

import { currentSessionSelector, } from '@selectors'

import LoginLoader from '@shared/LoginLoader'

import { setNeedToReenter, } from '@reducers/UserReducer'
import { setEndOfSessionStatus, setSessionModalState, } from '@reducers/TempReducer'
import FastImage from "react-native-fast-image";

function Login(props) {
  const { navigation, } = props;

  const toast = useRef(null)

  const dispatch = useDispatch();

  const currentAccount = useSelector(state => state.user.currentAccount)
  const currentSession = useSelector(currentSessionSelector)

  const [loading, setLoadingStatus] = useState(false)
  const [pin, setPin] = useState('')
  const [disabled, setDisabledState] = useState(false)

  const [animatedValue] = useState(new Animated.Value(0))

  const resetState = () => {
    setPin('')
    setLoadingStatus(false)
  }

  const handleAnimation = () => {
    Animated.sequence([

      Animated.timing(animatedValue, { toValue: 20.0, duration: 50, easing: Easing.linear }),

      Animated.timing(animatedValue, { toValue: -20.0, duration: 50, easing: Easing.linear }),

      Animated.timing(animatedValue, { toValue: 0.0, duration: 50, easing: Easing.linear }),

      Animated.timing(animatedValue, { toValue: 20.0, duration: 50, easing: Easing.linear }),

      Animated.timing(animatedValue, { toValue: -20.0, duration: 50, easing: Easing.linear }),

      Animated.timing(animatedValue, { toValue: 0.0, duration: 50, easing: Easing.linear }),

    ]).start();
  }

  const validateDeviceID = async (code) => {
    if (!currentAccount || !currentAccount?.registered_device_ids) {
      navigation.jumpTo('NoAccount')
      resetState()

      return
    }

    const { registered_device_ids, passcodes } = currentAccount

    setLoadingStatus(true)

    try {
      setDisabledState(true)
      const deviceId = await DeviceInfo.getUniqueId();

      if (code == '00000') {
        toast.current && toast.current.show(deviceId, DURATION.FOREVER)
        setDisabledState(false)
        resetState()
        return
      }

      if (!passcodes.map(item => item.slice(0, 5)).includes(code)) {
        throw new Error('Не дійсний пін код')
      }

      if (!registered_device_ids.includes(deviceId)) {
        throw new Error('Не правильний Device Id')
      }

      dispatch(setNeedToReenter(false))

      dispatch(setEndOfSessionStatus(false))

      if (currentSession.endTime || currentAccount?.localSessions.length === 0) {
        dispatch(setSessionModalState(true))
      }

      navigation.jumpTo('SalesLayout')

      resetState()
    } catch (e) {
      toast.current && toast.current.show(e.message, DURATION.LENGTH_LONG)
      handleAnimation()
      resetState()
    } finally {
      setDisabledState(false)
      setLoadingStatus(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior='position'
      keyboardVerticalOffset={-300}
      style={{ width: "100%", height: '100%', }}
    >
      <TouchableOpacity
        style={{ width: "100%", height: '100%', }}
        onPress={() => Keyboard.dismiss()}
        activeOpacity={1}
      >
        <>
          <View
            style={styles.logoContainer}
            onPress={() => { }}
            scale={0.85}
          >
            <FastImage
              style={{ width: 50, height: 50, }}
              source={require('@images/logo-heading.png')}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.loginHeading}>Введіть пін-код</Text>
            <Animated.View style={{ left: animatedValue }}>
              <OTPInputView
                style={[styles.idDots, disabled && styles.disabled]}
                codeInputFieldStyle={styles.dot}
                pinCount={5}
                editable={!disabled}
                code={pin}
                onCodeChanged={code => setPin(code)}
                autoFocusOnLoad
                onCodeFilled={code => validateDeviceID(code)}
              />
            </Animated.View>

            <Text style={styles.loginCaption}>або дізнайдесь його у адміністратора</Text>

            <LoginLoader active={loading} />
            <Toast ref={toast} />
          </View>
        </>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}



export default Login;
