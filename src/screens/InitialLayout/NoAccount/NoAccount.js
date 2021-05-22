import React, { useState, useEffect, useRef, } from "react";
import {
  View, Text, Keyboard, TouchableOpacity,
  KeyboardAvoidingView, TextInput, ScrollView,
} from "react-native";
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DeviceInfo from 'react-native-device-info';
import FastImage from "react-native-fast-image";
import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';
import BackgroundTimer from 'react-native-background-timer';
import styles from './styles';

import API from '@api'

import { addAccount } from '@reducers/UserReducer'

import ChangeView from './ChangeView'

function NoAccount(props) {
  const { navigation, } = props

  const dispatch = useDispatch()

  const inputRef = useRef(null)

  const [accountCode, setAccountCode] = useState('')
  const [loading, setLoadingStatus] = useState(false)
  const [errorVisible, setErrorVisible] = useState('')
  const [error, setError] = useState('')

  const setCode = async (text) => {
    setAccountCode(text)
  }

  const handleCode = async () => {
    const value = accountCode

    if (value.length < 10) {
      return
    }

    try {
      setLoadingStatus(true)
      inputRef.current && inputRef.current.blur()
      Keyboard.dismiss()

      const deviceId = await DeviceInfo.getUniqueId();

      const data = await API.requestAccount({
        tablet_identifier: `EGABJDFDKJ-${value}-DDJIJIHLDF`,
        new_device_id: deviceId,
      })

      if (!data) throw new Error('Invalid response')

      dispatch(addAccount(data))

      setLoadingStatus(false)

      navigation.jumpTo('Login')
    } catch (error) {
      setErrorVisible(true)
      setError('Аккаунт не знайдено')

      BackgroundTimer.setTimeout(() => {
        setLoadingStatus(false)
      }, 500)
    }
  }

  const reset = () => {
    setErrorVisible(false)

    BackgroundTimer.setTimeout(() => {
      setError('')
    }, 500)
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
      keyboardShouldPersistTaps={'handled'}
    >
      <TouchableOpacity
        style={styles.helpContainer}
        onPressIn={() => { }}
        activeOpacity={0.7}
      >
        <Text style={styles.helpText}>Де такий знайти?</Text>
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior='position'
        keyboardVerticalOffset={-130}
      >
        <View style={{ width: "100%", height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <FastImage
            style={styles.headingLogo}
            source={require('@images/logo-heading.png')}
          />

          <Text style={styles.heading}>Прив’язка планшета до Adoo Cloud</Text>
          {/* <Text style={styles.caption}>Введіть унікальний ідентифікатор закладу Adoo для початку роботи.</Text> */}

          <View style={styles.midContainer}>
            <ChangeView
              visible={errorVisible}
              duration={300}
              first={
                <>
                  <View>
                    <Text style={styles.inputLabelText}>Ідентифікатор закладу</Text>
                    <TextInput
                      ref={inputRef}
                      style={styles.input}
                      value={accountCode}
                      onChangeText={(text) => setCode(text)}
                      onSubmitEditing={handleCode}
                      placeholder='Ідентифікатор закладу'
                      placeholderTextColor='#CCCCCC88'
                      maxLength={10}
                      keyboardType='decimal-pad'
                      autoCapitalize='characters'
                    />
                    <TouchableOpacity
                      style={styles.clearButton}
                      onPress={() => setCode('')}
                      activeOpacity={0.6}
                    >
                      {accountCode.length > 0 &&
                        <FastImage
                          style={{ width: 18, height: 18, }}
                          source={require('@images/x_icon.png')}
                        />
                      }
                    </TouchableOpacity>
                  </View>

                  <View>
                    <Text style={styles.inputLabelText}>Пароль доступу</Text>
                    <TextInput
                      ref={inputRef}
                      style={styles.input}
                      value={accountCode}
                      onChangeText={(text) => setCode(text)}
                      onSubmitEditing={handleCode}
                      placeholder='Пароль доступу'
                      placeholderTextColor='#CCCCCC88'
                      maxLength={10}
                      keyboardType='decimal-pad'
                      autoCapitalize='characters'
                    />
                    <TouchableOpacity
                      style={styles.clearButton}
                      onPress={() => setCode('')}
                      activeOpacity={0.6}
                    >
                      {accountCode.length > 0 &&
                        <FastImage
                          style={{ width: 18, height: 18, }}
                          source={require('@images/x_icon.png')}
                        />
                      }
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={[styles.submitButton, accountCode.length < 10 && styles.disabled]}
                    onPress={handleCode}
                    activeOpacity={0.8}
                  >
                    {loading ? (
                      error ? (
                        <FastImage
                          style={{ width: '30%', height: '30%', }}
                          source={require('@images/x_icon.png')}
                        />
                      ) : (
                          <Progress.Circle
                            endAngle={0.7} size={25} color={'#FFFFFF'}
                            borderWidth={1.5} indeterminate={true}
                          />
                        )
                    ) : (
                        <Text style={styles.submitText}>Підтвердити</Text>
                      )}
                  </TouchableOpacity>
                </>
              }
              second={
                <View style={styles.errorContainer}>
                  <LottieView
                    style={styles.llamaError}
                    source={require('@lottie/lama-error.json')}
                    autoPlay
                    loop
                  />

                  <Text style={[styles.caption, { width: '100%', fontSize: 20, }]}>{error}</Text>

                  <TouchableOpacity
                    style={styles.retryButton}
                    onPress={reset}
                    activeOpacity={0.8}
                  >
                    <FastImage
                      style={{ width: '35%', height: '35%', }}
                      source={require('@images/reload.png')}
                    />
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}



export default NoAccount;
