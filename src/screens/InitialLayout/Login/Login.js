import React, { useState, useRef, } from "react";
import { View, Text, Animated, Easing, TouchableOpacity, Keyboard, KeyboardAvoidingView, } from "react-native";
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import FastImage from "react-native-fast-image";
import Toast, { DURATION } from 'react-native-easy-toast'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import styles from './styles';

import { lastSessionSelector } from '@selectors'

import { setEndOfSessionStatus, setSessionModalState, } from '@reducers/TempReducer'

import LoginLoader from '@shared/LoginLoader'

function Login(props) {
  const { navigation, } = props;

  const toast = useRef(null)

  const dispatch = useDispatch();

  const account = useSelector(state => state.account)

  const lastSession = useSelector(lastSessionSelector)

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

  const handleCode = async (code) => {
    const { passcodes } = account?.secure_data

    setLoadingStatus(true)

    try {
      setDisabledState(true)

      console.log('passcodes', passcodes)

      if (!passcodes.map(item => item.slice(0, 5)).includes(code)) {
        throw new Error('Не дійсний пін код')
      }

      dispatch(setEndOfSessionStatus(false))

      if (!lastSession || !lastSession?.summary?.time_start) {
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
                onCodeFilled={handleCode}
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
