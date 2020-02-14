import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'

function EmployeesList(props) {
  const { employees, checked, handleCheck, } = props

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
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#E75E66', '#EF9058']}
                style={[
                  styles.employee,
                  { borderBottomColor: '#E96B62' },
                  index === 0 && { borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomColor: '#DD8B71', },
                  index === employees.length - 1 && { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderBottomWidth: 0, },
                ]}
                key={index} activeOpacity={1}
              >
                {employee.icon !== '' ? (
                  <Image style={{ width: 41, height: 41, marginRight: 20, }} source={{ uri: employee.icon }} fadeDuration={0}></Image>
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
                  <Image style={{ width: 41, height: 41, marginRight: 20, }} source={{ uri: employee.icon }} fadeDuration={0}></Image>
                ) : (
                    <View style={styles.iconPlaceholder} />
                  )}
                <Text style={styles.employeeName}>{employee.name}</Text>
              </TouchableOpacity>
            )
        ))}
      </ScrollView>
    </View>

  )
}



export default EmployeesList