import React, { Component, useState, useRef } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch, } from 'react-redux';
import axios from 'axios';
import moment from 'moment-timezone'
import { useNetInfo } from "@react-native-community/netinfo";
import Toast, {DURATION} from 'react-native-easy-toast'
import styles from './styles'

import { API_URL } from '../../../../config/api';

import LoginLoader from '@shared/LoginLoader';

import EmployeesList from "./components/EmployeesList";

import { currentAccountSelector } from '@selectors'
import { updateCurrentSession, setEmployees, setStartCash, } from '../../../../reducers/UserReducer';

function InputEmployees({ navigation }) {

  const currentAccount = useSelector(currentAccountSelector)
  const employees = currentAccount.employees
  const shift_start = currentAccount.shift_start
  const shift_end = currentAccount.shift_end
  const { startCash, } = useSelector(state => ({ 
    startCash: state.user.startCash,
  }))

  const toast = useRef(null)

  const dispatch = useDispatch();
  const netInfo = useNetInfo();

  const [checked, setCheckedEmployees] = useState([])
  const [loading, setLoadingStatus] = useState(false)

  const handleCheck = (name, index) => {
    const newCheckedEmployees = checked.includes(index) ? checked.filter((item, key) => index !== item) : [...checked, index]

    if(name !== 'Пусто') {
      setCheckedEmployees(newCheckedEmployees)
    }
  }

  const handleProceed = async () => {
    const { token, } = currentAccount

    if(checked.length === 0) {
      return
    }

    setLoadingStatus(true)

    try {
      const selectedEmployees = employees.filter((item, index) => checked.includes(index)).map(item => item.name)

      let newSession = {
        startSum: startCash,
        employees: selectedEmployees,
        incasations: [],
        shift_start,
        shift_end,
      }

      // if(netInfo.isConnected && netInfo.isInternetReachable) {
      //   await axios.post(`${API_URL}/user/session/init/${token}`, newSessionObj)

      //   const { data } = await axios.get(`${API_URL}/user/session/${token}`)
      //   newSessionObj = data.current_session;
      // } else {
      //   newSessionObj = {
      //     ...newSessionObj,
      //   }
      // }

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
        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed} activeOpacity={1}>
          <Image style={{ width: 20, height: 15, }} source={require('@images/tick_light.png')} fadeDuration={0}></Image>
        </TouchableOpacity>
      ) : (
        <View style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 2, borderColor: '#D2D2D226', marginTop: 45, }}></View>
      )}

      {/* <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('InputCash')} activeOpacity={1}>
        <Image style={{ width: 18, height: 18, transform: [{ rotate: '180deg' }] }} source={require('@images/erase.png')} fadeDuration={0}></Image>
      </TouchableOpacity> */}

      <LoginLoader active={loading} />
      <Toast ref={toast}/>
    </View>
  )
}

export default InputEmployees;