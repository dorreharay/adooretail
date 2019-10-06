import React, { Component, useState, useEffect, useRef, } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Easing, Alert, } from "react-native";
import axios from 'axios';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';
import DeviceInfo from 'react-native-device-info';
import Toast, {DURATION} from 'react-native-easy-toast'
import Svg, { Circle } from 'react-native-svg';
import styles from './styles';

import { API_URL } from '../../../../../config/api';
import { loginKeyboardLayout } from '../../../../../helpers/keyboards'
import { setAuthToken, setCurrentSession } from '../../../../../reducers/UserReducer';

import LoginLoader from '../../../../components/LoginLoader';

function Login(props) {
  const { navigation, sliderRef, } = props;

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
  const [passwordArray, setPasswordArray] = useState(initialPassword)
  const [loading, setLoadingStatus] = useState(false)
  const [error, setError] = useState(false)
  const [currentInput, setCurrentInput] = useState('')

  const [promptPosition] = useState(new Animated.Value(-400))
  const [animatedValue] = useState(new Animated.Value(0))

  const dispatch = useDispatch();

  const resetState = () => {
    setPasswordArray(initialPassword)
    setLoadingStatus(false)
    setError(false)
    setCurrentInput('')
  }

  const togglePrompt = (status) => {
    Animated.timing(promptPosition, {
      toValue: status ? 40 : -400,
      duration: 300,
      easing: Easing.linear
    }).start()
  }

  const handleAnimation = () => {
    Animated.sequence([

      Animated.timing(animatedValue, { toValue: 10.0, duration: 50, easing: Easing.linear }),

      Animated.timing(animatedValue, { toValue: -10.0, duration: 50, easing: Easing.linear }),

      Animated.timing(animatedValue, { toValue: 0.0, duration: 50, easing: Easing.linear }),

    ]).start();
  }

  const validateDeviceID = async (deviceId) => {
    setLoadingStatus(true)

    try {
      const { data } = await axios.get(`${API_URL}/user/token/${deviceId}`)

      if (data.token.length === 0) 
        throw new Error('Device ID is incorrect')
      
      const token = data.token[0]._id;
      const serverIds = data.deviceUniqueId[0].deviceUniqueId;      

      const uniqueId = await DeviceInfo.getUniqueId();

      // if (!serverIds.includes(uniqueId))
      //   throw new Error('Device ID is incorrect')
      
      const currentSession = data.current_session[0].current_session;
      
      dispatch(setAuthToken(token))

      dispatch(setCurrentSession(currentSession))

      if (_.isEmpty(currentSession))
        sliderRef.current.snapToNext()
      else
        navigation.navigate('SalesLayout')

      resetState()
    } catch (e) {
      toast.current.show(e.message, DURATION.LENGTH_LONG)
      console.log(e.message)
      setLoadingStatus(false)
      handleAnimation()
      resetState()
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

  useEffect(() => {
    // validateDeviceID('1111222')

    return () => {};
  }, [])

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
          <Image style={{ width: 32, height: 27, marginRight: 5, }} source={require('@images/erase.png')} fadeDuration={0} />
        </Ripple>
      </View>
      <LoginLoader active={loading} />
      <Toast ref={toast}/>
      <Animated.View style={[styles.startPagePrompt, { left: promptPosition }]}>
        <View style={{ alignItems: 'center', width: '100%', height: '40%', paddingTop: '10%', paddingLeft: '7%', paddingRight: '10%', }}>
          <Text style={[styles.promptButtonText, { color: '#F6F6F6', fontSize: 22, }]}>Зробити вхід стартовою сторінкою?</Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'flex-end', width: '100%', height: '60%', paddingBottom: '10%', }}>
          <Ripple style={styles.promptButton} onPress={() => handlePromptChoise(true)} rippleColor={'#F3F3F3'}>
            <Text style={styles.promptButtonText}>Так</Text>
          </Ripple>
          <Ripple style={[styles.promptButton, { marginTop: '7%', paddingBottom: '5%', }]} onPress={() => handlePromptChoise(false)} rippleColor={'#F3F3F3'}>
            <Text style={styles.promptButtonText}>Ні</Text>
          </Ripple>
        </View>
      </Animated.View>
    </View>
  )
}



export default Login;
