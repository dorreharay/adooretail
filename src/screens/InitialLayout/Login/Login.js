import React, { useState, useEffect, useRef, } from "react";
import { View, Text, Image, Animated, Easing, } from "react-native";
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import Ripple from 'react-native-material-ripple';
import DeviceInfo from 'react-native-device-info';
import Toast, { DURATION } from 'react-native-easy-toast'
import Svg, { Circle } from 'react-native-svg';
import Logo from '@images/logo-big.svg'
import styles from './styles';

import { currentSessionSelector, } from '@selectors'
import { loginKeyboardLayout } from '@keyboards'

import LoginLoader from '@shared/LoginLoader'
import SharedButton from '@shared/SharedButton'

import { setNeedToReenter, } from '@reducers/UserReducer'
import { setEndOfSessionStatus, setSessionModalState, } from '@reducers/TempReducer'

function Login(props) {
  const { navigation, } = props;

  const initialPassword = [
    { entered: false, },
    { entered: false, },
    { entered: false, },
    { entered: false, },
    { entered: false, },
    { entered: false, },
    { entered: false, },
  ]

  const toast = useRef(null)

  const dispatch = useDispatch();

  const currentAccount = useSelector(state => state.user.currentAccount)
  const currentSession = useSelector(currentSessionSelector)

  const [passwordArray, setPasswordArray] = useState(initialPassword)
  const [loading, setLoadingStatus] = useState(false)
  const [error, setError] = useState(false)
  const [currentInput, setCurrentInput] = useState('')

  const [animatedValue] = useState(new Animated.Value(0))

  const resetState = () => {
    setPasswordArray(initialPassword)
    setLoadingStatus(false)
    setError(false)
    setCurrentInput('')
  }

  const handleAnimation = () => {
    Animated.sequence([

      Animated.timing(animatedValue, { toValue: 10.0, duration: 50, easing: Easing.linear }),

      Animated.timing(animatedValue, { toValue: -10.0, duration: 50, easing: Easing.linear }),

      Animated.timing(animatedValue, { toValue: 0.0, duration: 50, easing: Easing.linear }),

    ]).start();
  }

  const validateDeviceID = async (enteredPinCode) => {
    if (!currentAccount || !currentAccount?.registered_device_ids) {
      navigation.jumpTo('NoAccount')
      resetState()

      return
    }

    const { registered_device_ids, passcodes } = currentAccount

    setLoadingStatus(true)

    try {
      const deviceId = await DeviceInfo.getUniqueId();

      if (enteredPinCode == '2050205') {
        toast.current && toast.current.show(deviceId, DURATION.FOREVER)
        console.log(deviceId)
        resetState()
        return
      }

      if (!passcodes.includes(enteredPinCode)) {
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
      setLoadingStatus(false)
    }
  }

  const handleKeyPress = (input) => {
    let newInput = currentInput;

    if (currentInput.length < passwordArray.length)
      newInput = currentInput + input;
    else
      return

    const enteredLength = passwordArray.filter(item => item.entered === true).length

    if (error)
      setError(false)

    const newPass = passwordArray.map((item, index) => index === enteredLength ? ({ ...item, entered: true, }) : item)

    setCurrentInput(newInput)
    setPasswordArray(newPass)

    if (newInput.length === passwordArray.length && !loading && !error) {
      validateDeviceID(newInput)
    }
  }

  const handleDeleteSign = () => {
    let newInput = currentInput;

    if (currentInput.length > 0)
      newInput = currentInput.slice(0, -1);
    else
      return

    const enteredLength = passwordArray.filter(item => item.entered === true).length

    const newPass = passwordArray.map((item, index) => index === enteredLength - 1 ? ({ ...item, entered: false, }) : item)

    setCurrentInput(newInput)
    setPasswordArray(newPass)
  }

  return (
    <View style={{ flex: 1, }}>
      <View
        style={styles.logoContainer}
        onPress={() => { }}
        scale={0.85}
      >
        <Logo width={40} height={40} />
      </View>
      <View style={styles.container}>
        <Text style={styles.loginHeading}>Введіть код доступу</Text>
        <Animated.View style={[styles.idDots, { left: animatedValue }]}>
          {passwordArray.map((item, index) => (
            <Svg width={styles.dot.width} height={styles.dot.height} key={index}>
              <Circle
                cx={styles.dot.cx}
                cy={styles.dot.cy}
                r={styles.dot.r}
                strokeWidth="1.5"
                stroke="white"
                fill={item.entered ? 'white' : "#33333300"}
              />
            </Svg>
          ))}
        </Animated.View>

        <Text style={styles.loginCaption}>Код можна змінити в налаштування Adoo Cloud Account</Text>
        <View style={styles.lsNumpad}>
          {loginKeyboardLayout.map((num, index) => (
            <Ripple
              style={styles.lsNum}
              onPress={() => num.disabled ? null : handleKeyPress(num.value)}
              rippleColor={`#FFFFFF66${num.disabled ? '00' : ''}`}
              rippleContainerBorderRadius={50} rippleFades rippleCentered key={index}
            >
              <Text style={styles.lsNumText}>{num.value}</Text>
            </Ripple>
          ))}
          <Ripple style={styles.lsNum} onPress={handleDeleteSign} rippleColor={'#FFFFFF'} rippleContainerBorderRadius={50} rippleCentered>
            <Image style={styles.erase} source={require('@images/erase.png')} fadeDuration={0} />
          </Ripple>
        </View>
        <LoginLoader active={loading} />
        <Toast ref={toast} />
      </View>
    </View>
  )
}



export default Login;
