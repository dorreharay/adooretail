import React, { useState, } from 'react'
import { View, Text, TouchableOpacity, ScrollView, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux';
import Ripple from 'react-native-material-ripple';
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'

import { currentAccountSelector, currentSessionSelector } from '@selectors'
import { setCurrentEmployee, } from '@reducers/UserReducer'

import SharedButton from '@shared/SharedButton';

function EmployeePicker(props) {
  const { visible, onClickOutside, } = props

  const dispatch = useDispatch()

  const currentEmployee = useSelector(state => state.user.currentEmployee) || 0
  const currentSession = useSelector(currentSessionSelector)
  const currentAccount = useSelector(currentAccountSelector)

  if (!visible) return null

  return (
    <TouchableOpacity
      style={styles.employeesListContainer}
      onPress={() => onClickOutside(false)}
      activeOpacity={1}
    >
      <View style={{ width: '37%', height: '70%', borderRadius: 3, backgroundColor: '#FFFFFF' }}>
        <Text style={styles.employeesListHeading}>Працівник</Text>

        <ScrollView style={styles.employeesList}>
          {currentSession && currentSession.employees && currentSession.employees.map((item, key) => (
            <Ripple
              style={styles.employeesListItem}
              onPress={() => {
                // if (currentEmployee === item) return

                onClickOutside(false)
                dispatch(setCurrentEmployee(key))
              }}
              rippleColor={`#C4C4C4`}
              rippleFades key={key}
            >
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <FastImage
                  style={{ width: 40, height: 40, backgroundColor: '#DDDDDD', borderRadius: 100, }}
                  source={{ uri: currentAccount && currentAccount.img_url || '' }}
                />
                <Text style={styles.employeesListItemName}>{currentSession.employees[key]}</Text>
              </View>
              <View style={styles.pickEmployeeButton}>
                <SharedButton>
                  <LinearGradient
                    style={styles.pickEmployeeButtonLinear}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 2 }}
                    colors={currentEmployee !== key ? ['#DB3E69', '#FD9C6C'] : ['#f4f4f4', '#f4f4f4']}
                  >
                    <Text style={[styles.pickEmployeeButtonText, currentEmployee === key && { color: '#A4A4A4' }]}>{currentEmployee === key ? 'обрано' : 'обрати'}</Text>
                  </LinearGradient>
                </SharedButton>
              </View>
            </Ripple>
          ))}
        </ScrollView>
      </View>
    </TouchableOpacity>
  )
}

export default EmployeePicker