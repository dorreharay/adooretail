import React, { Component, useState, useEffect, } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Ripple from 'react-native-material-ripple';
import styles from './styles'

import { API_URL } from '../../../../config/api';
import { cashKeyboardLayout } from '../../../../helpers/keyboards'
import { setEmployees, setStartCash, updateCurrentSession } from '../../../../reducers/UserReducer'
import { setEndOfSessionStatus } from '../../../../reducers/TempReducer'

import LoginLoader from '@shared/LoginLoader';

function InputCash(props) {
  const { navigation, sliderRef, } = props;

  const currentAccount = useSelector(state => state.user.currentAccount)
  const endOfSession = useSelector(state => state.temp.endOfSession)
  const employees = useSelector(state => state.user.currentAccount.employees)
  const startCash = useSelector(state => state.user.startCash)

  const dispatch = useDispatch();

  const [currentInput, setCurrentInput] = useState('0')
  const [loading, setLoadingStatus] = useState(false)


  const handleKeyPress = (input) => {
    let newInput = currentInput;

    if (newInput == '0') {
      newInput = ''
    }

    if (newInput.length < 8) {
      newInput = newInput + input;
    } else {
      return
    }

    setCurrentInput(newInput)
  }

  const handleDeleteSign = () => {
    let newInput = currentInput;

    if (currentInput.length > 0) {
      newInput = currentInput.slice(0, -1);
    } else {
      return
    }

    if (currentInput.length === 1) {
      newInput = '0'
    }

    setCurrentInput(newInput)
  }

  const handleProceed = async () => {
    const { token } = currentAccount

    if (endOfSession) {
      try {
        setLoadingStatus(true)

        // await axios.post(`${API_URL}/user/session/terminate/${token}`, { session_id, endSum: currentInput })

        dispatch(setEndOfSessionStatus(false))
        dispatch(updateCurrentSession({ status: 'end' }))

        navigation.navigate('Login')
      } catch (e) {
        console.log(e.message)
      } finally {
        setLoadingStatus(false)

        return
      }
    }

    try {
      setLoadingStatus(true)

      dispatch(setStartCash(currentInput))

      navigation.navigate('InputEmployee')

      setLoadingStatus(false)
    } catch (e) {
      console.log(e.message)
      setLoadingStatus(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.loginHeading}><Text style={styles.loginHeadingSuper}>C</Text>ума в касі на {endOfSession ? 'кінці' : 'початку'} зміни</Text>
      <Text style={styles.loginCaption}>{currentInput}</Text>
      <View style={styles.lsNumpad}>
        {cashKeyboardLayout.map((num, index) => (
          <Ripple
            style={styles.lsNum}
            onPress={() => num.enterKey ? handleProceed() : handleKeyPress(num.value)}
            rippleColor={`#858585`}
            rippleContainerBorderRadius={50} rippleCentered key={index}
          >
            <Text style={styles.lsNumText}>{num.value}</Text>
          </Ripple>
        ))}

        <Ripple style={styles.lsNum} onPress={handleProceed} rippleColor={'#858585'} rippleContainerBorderRadius={50} rippleCentered>
          <Image style={{ width: 30, height: 30, marginRight: 5, }} source={require('@images/key.png')} fadeDuration={0} />
        </Ripple>
        <Ripple style={styles.lsNum} onPress={() => handleKeyPress('0')} rippleColor={'#858585'} rippleContainerBorderRadius={50} rippleCentered>
          <Text style={styles.lsNumText}>0</Text>
        </Ripple>
        <Ripple style={styles.lsNum} onPress={handleDeleteSign} rippleColor={'#858585'} rippleContainerBorderRadius={50} rippleCentered>
          <Image style={{ width: 34, height: 28, marginRight: 5, }} source={require('@images/erase.png')} fadeDuration={0} />
        </Ripple>
      </View>
      <LoginLoader active={loading} />
    </View>
  )
}

export default InputCash;