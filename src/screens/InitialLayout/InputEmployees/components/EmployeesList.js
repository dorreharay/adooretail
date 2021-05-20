import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import styles from './styles'

import { currentAccountSelector, } from '@selectors'

function EmployeesList(props) {
  const { employees, checked, handleCheck, } = props

  const currentAccount = useSelector(state => state.user.currentAccount)

  return (
    <View style={styles.сontainer}>
      <ScrollView
        style={styles.scrollview}
        scrollEnabled={employees.length > 5}
        showsVerticalScrollIndicator={false}
      >
        {employees.map((employee, index) => (
          checked.includes(index) ? (
            <TouchableOpacity
              style={{ width: '100%', flexDirection: 'row', alignItems: 'center', }}
              onPress={() => handleCheck(employee.name, index)}
              activeOpacity={1} key={index}
            >
              <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                colors={['#E76F5F', '#E46162']}
                style={[
                  styles.employee,
                  { borderBottomColor: '#E96B62' },
                  index === 0 && { borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomColor: '#DD8B71', },
                  index === employees.length - 1 && { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderBottomWidth: 0, },
                ]}
                key={index} activeOpacity={1}
              >
                <FastImage style={[styles.employeeIcon, styles.checkedIcon]} source={{ uri: employee.icon !== '' ? employee.icon : currentAccount?.img_url }} fadeDuration={0}></FastImage>
                <Text style={[styles.employeeName, styles.checkedName]}>{employee.name}</Text>
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
                <FastImage style={styles.employeeIcon} source={{ uri: employee.icon !== '' ? employee.icon : currentAccount?.img_url }} fadeDuration={0}></FastImage>
                <Text style={styles.employeeName}>{employee.name}</Text>
              </TouchableOpacity>
            )
        ))}
      </ScrollView>
    </View>

  )
}



export default EmployeesList