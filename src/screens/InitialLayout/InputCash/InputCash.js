import React, { useState, } from "react";
import { View, Text, } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import Ripple from 'react-native-material-ripple';
import FastImage from 'react-native-fast-image'
import { syncSessions, } from '@requests'
import styles from './styles'

import { cashKeyboardLayout } from '@keyboards'

import { currentAccountSelector } from '@selectors'
import { setStartCash, updateCurrentSession, restoreDefaultShift, } from '@reducers/UserReducer'
import { setEndOfSessionStatus } from '@reducers/TempReducer'

import LoginLoader from '@shared/LoginLoader';
import SharedButton from '@shared/SharedButton';

function InputCash(props) {
  const { navigation, } = props;

  const dispatch = useDispatch();

  const endOfSession = useSelector(state => state.temp.endOfSession)

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

  const handleBackPress = () => {
    if (endOfSession) {
      navigation.navigate('SalesLayout')
    } else {
      navigation.navigate('Login')
    }
  }

  const handleProceed = async () => {
    if (endOfSession) {
      try {
        setLoadingStatus(true)
        dispatch(updateCurrentSession({ status: 'end', endCash: currentInput }))
        dispatch(restoreDefaultShift())

        await syncSessions(() => { }, null, 1)

        dispatch(setEndOfSessionStatus(false))

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
      <Text style={styles.loginHeading}>Cума в касі на {endOfSession ? 'кінці' : 'початку'} зміни</Text>
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
          <FastImage style={styles.buttonImageKey} source={require('@images/key.png')} fadeDuration={0} />
        </Ripple>
        <Ripple style={styles.lsNum} onPress={() => handleKeyPress('0')} rippleColor={'#858585'} rippleContainerBorderRadius={50} rippleCentered>
          <Text style={styles.lsNumText}>0</Text>
        </Ripple>
        <Ripple style={styles.lsNum} onPress={handleDeleteSign} rippleColor={'#858585'} rippleContainerBorderRadius={50} rippleCentered>
          <FastImage style={styles.buttonImageArrow} source={require('@images/back.png')} fadeDuration={0} />
        </Ripple>
      </View>

      <LoginLoader active={loading} />


      {!loading && (
        <SharedButton
          style={styles.backButton}
          onPress={handleBackPress}
          scale={0.9}
        >
          <View style={{ paddingHorizontal: 30, paddingVertical: 20, }}>
            <Text style={styles.backButtonText}>Назад</Text>
          </View>
        </SharedButton>
      )}
    </View>
  )
}

export default InputCash;