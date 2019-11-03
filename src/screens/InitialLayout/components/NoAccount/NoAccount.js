import React, { Component, useState, useEffect, useRef, } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Easing, Alert, } from "react-native";
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import Toast, {DURATION} from 'react-native-easy-toast'
import styles from './styles';

import LoginLoader from '../../../../components/LoginLoader';
import SharedButton from '../../../../components/SharedButton';
import ChooseAccount from './components/ChooseAccount';
import ConfigureAccount from './components/ConfigureAccount';

function NoAccount(props) {
  const { navigation, sliderRef, } = props

  const toast = useRef(null)

  const [contentOpacity] = useState(new Animated.Value(1))
  const [successOpacity] = useState(new Animated.Value(0))

  const accounts = useSelector(state => state.user.accounts)
  const currentAccount = useSelector(state => state.user.currentAccount)

  const [selectedAccount, selectAccount] = useState({ id: false, })
  const [cameraVisible, setCameraVisibility] = useState(false)
  const [loading, setLoadingStatus] = useState(false)
  const [contentVisible, setContentVisibility] = useState(true)
  const [successVisible, setSuccessVisibility] = useState(false)

  const dispatch = useDispatch();
  
  useEffect(() => {
    if(accounts.every(item => item.id === undefined)) {
      setCameraVisibility(true)
    }
  }, [accounts])

  useEffect(() => {
    if(_.isEmpty(currentAccount)) {
      setCameraVisibility(false)
    }
  }, [currentAccount])

  const addAccount = () => {
    setCameraVisibility(true)
  }
  

  const toggleAdd = () => {
    setCameraVisibility(!cameraVisible)
  }

  const invokeSuccessAnimation = (callback) => {
    Animated.timing(
      contentOpacity,
      {
        toValue: 0,
        duration: 600,
      },
    ).start(() => callback())
    setTimeout(() => {
      setContentVisibility(false)
      Animated.timing(
        successOpacity,
        {
          toValue: 1,
          duration: 600,
        },
      ).start()
      setSuccessVisibility('success')
      setTimeout(() => sliderRef.current.snapToNext(), 2000)
    }, 1000)
  }

  const invokeFailAnimation = () => {
    Animated.timing(
      contentOpacity,
      {
        toValue: 0,
        duration: 600,
      },
    ).start()
    setTimeout(() => {
      setContentVisibility(false)
      Animated.timing(
        successOpacity,
        {
          toValue: 1,
          duration: 600,
        },
      ).start()
      setSuccessVisibility('fail')

      setTimeout(() => {
        Animated.timing(
          successOpacity,
          {
            toValue: 0,
            duration: 600,
          },
        ).start()
        setTimeout(() => {
          setSuccessVisibility(false)
          Animated.timing(
            contentOpacity,
            {
              toValue: 1,
              duration: 600,
            },
          ).start()
          setTimeout(() => setContentVisibility(true), 600)
        }, 600)
      }, 1000)
    }, 600)
  }

  return (
    <View style={styles.container}>
      {successVisible && (
        <Animated.View style={[styles.success , { opacity: successOpacity}]}>
          {/* <Text style={styles.successHeading}>Аккаунт додано</Text> */}
          <Image style={{ width: 130, height: 130, }} source={successVisible === 'success' ? require('@images/success-white.png') : require('@images/fail-white.png')} />
        </Animated.View>
      )}

      {contentVisible && (
        <Animated.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', opacity: contentOpacity, }}>
          {cameraVisible ? (
            <ConfigureAccount
              loading={loading}
              setLoadingStatus={setLoadingStatus}
              sliderRef={sliderRef}
              invokeSuccessAnimation={invokeSuccessAnimation}
              invokeFailAnimation={invokeFailAnimation}
              setSuccessVisibility={setSuccessVisibility}
              setContentVisibility={setContentVisibility}
            />
          ) : (
            <ChooseAccount
              accounts={accounts}
              selectedAccount={selectedAccount}
              selectAccount={selectAccount}
              submitAccount={invokeSuccessAnimation}
              addAccount={addAccount}
              currentAccount={currentAccount}
            />
          )}
        </Animated.View>
      )}
     
      
      <LoginLoader active={loading} />
      <Toast ref={toast}/>
    </View>
  )
}



export default NoAccount;
