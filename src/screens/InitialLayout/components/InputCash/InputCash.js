import React, { Component, useState, } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Ripple from 'react-native-material-ripple';
import styles from './styles'

import { API_URL } from '../../../../../config/api';
import { cashKeyboardLayout } from '../../../../../helpers/keyboards'
import { setEmployees, setStartCash, setEndOfSessionStatus } from '../../../../../reducers/UserReducer'

import LoginLoader from '../../../../components/LoginLoader';

function InputCash(props) {
  const { navigation, sliderRef, } = props;

  const { token, endOfSession } = useSelector(state => ({ token: state.user.token, endOfSession: state.user.endOfSession }))
  const employees = useSelector(state => state.user.employees)

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
    // if (endOfSession.status) {
    //   try {
    //     setLoadingStatus(true)

    //     asyncReceiptsStorage.find({}, async (err, localReceipts) => {

    //       await axios.put(`${API_URL}/user/receipts/${token}`, { localReceipts, session_id: endOfSession.sessionID })
    //     })

    //     await axios.post(`${API_URL}/user/session/terminate/${token}`, { session_id: endOfSession.sessionID, endSum: currentInput })

    //     asyncReceiptsStorage.remove({}, { multi: true }, async (err, productsDocs) => { })

    //     dispatch(setEndOfSessionStatus({ status: false, sessionID: '', }))
    //   } catch (e) {

    //     navigation.navigate('Login')
    //     console.log(e.message)
    //   }

    //   setLoadingStatus(false)

    //   return
    // }

    try {
      setLoadingStatus(true)

      const { data } = await axios.get(`${API_URL}/user/employees/${token}`)

      const employees = data.employees;

      dispatch(setEmployees(employees))
      dispatch(setStartCash(currentInput))

      sliderRef.current.snapToNext()

      setLoadingStatus(false)

      // setTimeout(() => {
      //   setCurrentInput('0')
      // }, 400)
    } catch (e) {
      console.log(e.message)
      setLoadingStatus(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.loginHeading}><Text style={styles.loginHeadingSuper}>C</Text>ума в касі на {endOfSession.status ? 'кінці' : 'початку'} зміни</Text>
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
          <Image style={{ width: 30, height: 30, marginRight: 5, }} source={require('../../../../../assets/images/key.png')} fadeDuration={0} />
        </Ripple>
        <Ripple style={styles.lsNum} onPress={() => handleKeyPress('0')} rippleColor={'#858585'} rippleContainerBorderRadius={50} rippleCentered>
          <Text style={styles.lsNumText}>0</Text>
        </Ripple>
        <Ripple style={styles.lsNum} onPress={handleDeleteSign} rippleColor={'#858585'} rippleContainerBorderRadius={50} rippleCentered>
          <Image style={{ width: 34, height: 28, marginRight: 5, }} source={require('../../../../../assets/images/erase.png')} fadeDuration={0} />
        </Ripple>
      </View>
      
      {employees.length !== 0 && (
        <TouchableOpacity style={styles.backButton} onPress={() => sliderRef.current.snapToNext()} activeOpacity={1}>
          <Image style={{ width: 18, height: 18, }} source={require('../../../../../assets/images/erase.png')} fadeDuration={0}></Image>
        </TouchableOpacity>
      )}
      <LoginLoader active={loading} />
    </View>
  )
}

export default InputCash;