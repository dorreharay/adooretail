import React, { Component, useState, } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch, } from 'react-redux';
import axios from 'axios';
import styles from './styles'

import { API_URL } from '../../../../../config/api';

import LoginLoader from '@shared/LoginLoader';

import EmployeesList from "./components/EmployeesList";

import { setCurrentSession, setEmployees, setStartCash, } from '../../../../../reducers/UserReducer';

function InputEmployees({ sliderRef }) {

  const { employees, startCash, token, } = useSelector(state => ({ 
    employees: state.user.employees,
    startCash: state.user.startCash,
    token: state.user.token,
  }))

  const dispatch = useDispatch();

  const [checked, setCheckedEmployees] = useState([])
  const [loading, setLoadingStatus] = useState(false)

  const handleCheck = (name, index) => {
    const newCheckedEmployees = checked.includes(index) ? checked.filter((item, key) => index !== item) : [...checked, index]

    if(name !== 'Пусто') {
      setCheckedEmployees(newCheckedEmployees)
    }
  }

  const handleProceed = async () => {
    if(checked.length === 0) {
      return
    }

    setLoadingStatus(true)

    try {
      const selectedEmployees = employees.filter((item, index) => checked.includes(index)).map(item => item.name)

      const newSessionObj = {
        startSum: startCash,
        employees: selectedEmployees,
        incasations: [],
      }

      await axios.post(`${API_URL}/user/session/init/${token}`, newSessionObj)

      const { data } = await axios.get(`${API_URL}/user/session/${token}`)
      const currentSession = data.current_session;

      dispatch(setCurrentSession(currentSession))
      dispatch(setEmployees([]))
      dispatch(setStartCash(0))

      navigation.navigate('SalesLayout')

      setTimeout(() => {
        setLoadingStatus(false)
        setCheckedEmployees([])
      }, 400)

    } catch (e) {
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
        <View style={{ width: 10, height: 50, marginTop: 45, }}></View>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => sliderRef.current.scrollBy(-1)} activeOpacity={1}>
        <Image style={{ width: 18, height: 18, transform: [{ rotate: '180deg' }] }} source={require('@images/erase.png')} fadeDuration={0}></Image>
      </TouchableOpacity>

      <LoginLoader active={loading} />
    </View>
  )
}

export default InputEmployees;