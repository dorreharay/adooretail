import React, { Component, useState, useRef } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch, } from 'react-redux';
import { useNetInfo } from "@react-native-community/netinfo";
import Toast, { DURATION } from 'react-native-easy-toast'
import FastImage from 'react-native-fast-image'
import styles from './styles'

import LoginLoader from '@shared/LoginLoader';
import SharedButton from '@shared/SharedButton';

import EmployeesList from "./components/EmployeesList";

import { currentAccountSelector } from '@selectors'
import { updateCurrentSession, setEmployees, setStartCash, } from '@reducers/UserReducer';

function InputEmployees({ navigation }) {
  const toast = useRef(null)

  const dispatch = useDispatch();

  const currentAccount = useSelector(currentAccountSelector)
  const employees = currentAccount.employees
  const shift_start = currentAccount.shift_start
  const shift_end = currentAccount.shift_end
  const { startCash, } = useSelector(state => ({
    startCash: state.user.startCash,
  }))

  const [checked, setCheckedEmployees] = useState([])
  const [loading, setLoadingStatus] = useState(false)

  const handleCheck = (name, index) => {
    const newCheckedEmployees = checked.includes(index) ? checked.filter((item, key) => index !== item) : [...checked, index]

    if (name !== 'Пусто') {
      setCheckedEmployees(newCheckedEmployees)
    }
  }

  const handleBackPress = () => {
    navigation.navigate('InputCash')
  }

  const handleProceed = async () => {
    if (checked.length === 0) {
      return
    }

    setLoadingStatus(true)

    try {
      function guidGenerator() {
        let S4 = function () {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
      }

      const selectedEmployees = employees.filter((item, index) => checked.includes(index)).map(item => item.name)

      let newSession = {
        startSum: startCash,
        employees: selectedEmployees,
        incasations: [],
        receipts: [],
        shift_start,
        shift_end,
        localId: guidGenerator(),
        transactions: [],
      }

      dispatch(updateCurrentSession({ status: 'new', newSessionProp: newSession }))
      dispatch(setEmployees([]))
      dispatch(setStartCash(0))

      navigation.navigate('SalesLayout')

      setTimeout(() => {
        setLoadingStatus(false)
        setCheckedEmployees([])
      }, 400)

    } catch (e) {
      toast.current && toast.current.show(e.message, DURATION.LENGTH_LONG)
      console.log(e.message)
      setLoadingStatus(false)
    }
  }

  return (
    <View style={styles.container}>
      {employees.length !== 0 && <Text style={styles.loginHeading}>Робітники на зміні</Text>}

      <EmployeesList employees={employees} checked={checked} handleCheck={handleCheck} />

      {checked.length !== 0 ? (
        <SharedButton style={styles.proceedButton} onPress={handleProceed} scale={0.9}>
          <FastImage style={{ width: 20, height: 15, }} source={require('@images/tick_light.png')} fadeDuration={0}></FastImage>
        </SharedButton>
      ) : (
          <View style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 2, borderColor: '#D2D2D226', marginTop: 45, }}></View>
        )}

      <LoginLoader active={loading} />
      <Toast ref={toast} />

      <SharedButton
        style={styles.backButton}
        onPress={handleBackPress}
        scale={0.9}
      >
        <View style={{ paddingHorizontal: 30, paddingVertical: 20, }}>
          <Text style={styles.backButtonText}>Назад</Text>
        </View>
      </SharedButton>
    </View>
  )
}

export default InputEmployees;