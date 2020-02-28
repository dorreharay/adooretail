import React, { useState, useEffect, useRef, } from "react";
import { View, Text, Image, Animated, Easing, } from "react-native";
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import Ripple from 'react-native-material-ripple';
import DeviceInfo from 'react-native-device-info';
import Toast, { DURATION } from 'react-native-easy-toast'
import Svg, { Circle } from 'react-native-svg';
import styles from './styles';

import { currentSessionSelector, currentAccountSelector, } from '@selectors'
import { loginKeyboardLayout } from '@keyboards'

import LoginLoader from '@shared/LoginLoader'

import { setNeedToReenter, } from '@reducers/UserReducer'
import { setEndOfSessionStatus } from '@reducers/TempReducer'

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

  const currentAccount = useSelector(currentAccountSelector)
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
    const { registered_device_ids, passcodes  } = currentAccount

    setLoadingStatus(true)

    try {
      const deviceId = await DeviceInfo.getUniqueId();

      if(enteredPinCode == '2050203') {
        toast.current && toast.current.show(deviceId, DURATION.FOREVER)
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

      if (!currentSession.endTime && currentSession.length !== 0) {
        navigation.navigate('SalesLayout')
      } else {
        navigation.navigate('InputCash')
      }

      resetState()
    } catch (e) {
      toast.current && toast.current.show(e.message, DURATION.LENGTH_LONG)
      handleAnimation()
      resetState()
    } finally {
      setLoadingStatus(false)
      dispatch(setEndOfSessionStatus(false))
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
    <View style={styles.container}>
      <Text style={styles.loginHeading}><Text style={styles.loginHeadingSuper}>В</Text>хід за допомогою Device ID</Text>
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

      <Text style={styles.loginCaption}>Device ID можна змінити в налаштування Adoo Cloud Account</Text>
      <View style={styles.lsNumpad}>
        {loginKeyboardLayout.map((num, index) => (
          <Ripple
            style={styles.lsNum}
            onPress={() => num.disabled ? null : handleKeyPress(num.value)}
            rippleColor={`#858585${num.disabled ? '00' : ''}`}
            rippleContainerBorderRadius={50} rippleFades rippleCentered key={index}
          >
            <Text style={styles.lsNumText}>{num.value}</Text>
          </Ripple>
        ))}
        <Ripple style={styles.lsNum} onPress={handleDeleteSign} rippleColor={'#858585'} rippleContainerBorderRadius={50} rippleCentered>
          <Image style={styles.erase} source={require('@images/erase.png')} fadeDuration={0} />
        </Ripple>
      </View>
      <LoginLoader active={loading} />
      <Toast ref={toast} />
    </View>
  )
}



export default Login;
