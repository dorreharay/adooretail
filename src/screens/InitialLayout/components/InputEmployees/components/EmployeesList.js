import React from 'react'
import { View , Text, Image, TouchableOpacity, StyleSheet, } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

import { COMFORTAA_REGULAR, } from '../../../../../../config/fonts'

function EmployeesList({ employees, checked, handleCheck, }) {
  return (
    <View style={styles.сontainer}>
      {employees.map((employee, index) => (
        checked.includes(index) ? (
          <TouchableOpacity
            style={{ width: '100%', flexDirection: 'row', alignItems: 'center', }}
            onPress={() => handleCheck(employee.name, index)}
            activeOpacity={1} key={index}
          >
            <LinearGradient
              start={{x: 0, y: 0}} end={{x: 2, y: 0}}
              colors={['#FF7675', '#FD9C6C']}
              style={[
                styles.employee,
                { borderBottomColor: '#DD8B71' },
                index === 0 && { borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomColor: '#DD8B71', },
                index === employees.length - 1 && { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderBottomWidth: 0, },
              ]}
              key={index} activeOpacity={1}
            >
              {employee.icon !== '' ? (
                <Image style={{ width: 41, height: 41, marginRight: 20,  }} source={{ uri: employee.icon }} fadeDuration={0}></Image>
              ) : (
                <View style={[styles.iconPlaceholder, { backgroundColor: '#9F9F9FD9', }]} />
              )} 
              <Text style={styles.employeeName}>{employee.name}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[
              styles.employee,
              index === 0 && { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
              index === employees.length - 1 && { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderBottomWidth: 0, },
            ]} onPress={() => handleCheck(employee.name, index)}
            key={index} activeOpacity={1}
          >
            {employee.icon !== '' ? (
              <Image style={{ width: 41, height: 41, marginRight: 20,  }} source={{ uri: employee.icon }} fadeDuration={0}></Image>
            ) : (
              <View style={styles.iconPlaceholder} />
            )} 
            <Text style={styles.employeeName}>{employee.name}</Text>
          </TouchableOpacity>
        )
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  сontainer: {
    marginTop: 45,
    width: 350,
    height: 360,
    zIndex: 100,
  },
  employee: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 70,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#4D4D4D',
    backgroundColor: '#D2D2D233',
  },
  iconPlaceholder: {
    width: 41,
    height: 41,
    marginRight: 20,
    borderRadius: 22,
    backgroundColor: '#9F9F9F33',
  },
  employeeName: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: COMFORTAA_REGULAR,
  },
})



export default EmployeesList