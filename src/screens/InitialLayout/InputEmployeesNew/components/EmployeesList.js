import React, { useMemo, } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import styles from './styles'

import { currentAccountSelector, } from '@selectors'

function EmployeesList(props) {
  const { employees, checked, handleCheck, } = props

  const currentAccount = useSelector(state => state.user.currentAccount)

  function chunkArray(myArray, chunk_size) {
    var results = [];

    while (myArray.length) {
      results.push(myArray.splice(0, chunk_size));
    }

    return results;
  }

  const employeesList = useMemo(() => {
    return currentAccount ? chunkArray(currentAccount?.employees, 3) : []
  }, [currentAccount])

  return (
    <View style={styles.сontainer} contentContainerStyle={styles.contentContainerStyle}>
      {employeesList.map((row, index) => (
        <View style={styles.row} key={index}>
          {row.map((employee, key) => (
            <View style={styles.card} key={key}>
              <FastImage
                style={styles.cardImage}
                source={{ uri: "https://instagram.fdnk1-1.fna.fbcdn.net/v/t51.2885-19/s320x320/77409661_452414792350499_6055318509087358976_n.jpg?_nc_ht=instagram.fdnk1-1.fna.fbcdn.net&_nc_ohc=eMppTw7ns2wAX9sPr32&oh=a29d35f4d3cd5bbf88c8da482f63b0be&oe=5F1FB0C5" }}
              />
              <View style={styles.cardTitle}>
                <Text style={styles.cardText}>{employee.name}</Text>
              </View>
            </View>
          ))}
          {/* <View style={styles.card}>
            <FastImage
              style={styles.cardImage}
              source={{ uri: "https://instagram.fdnk1-1.fna.fbcdn.net/v/t51.2885-19/s320x320/66893691_992430047594050_7169319432374714368_n.jpg?_nc_ht=instagram.fdnk1-1.fna.fbcdn.net&_nc_ohc=bBOAxnk788AAX96pZfx&oh=b318302d6d468a2e51bc251eab5038ce&oe=5F1FEBAE" }}
            />
            <View style={styles.cardTitle}>
              <Text style={styles.cardText}>Ніка Д.</Text>
            </View>
          </View>
          <View style={styles.card}>
            <FastImage
              style={styles.cardImage}
              source={{ uri: "https://instagram.fdnk1-1.fna.fbcdn.net/v/t51.2885-19/s320x320/75430288_498813534042146_4153996397646970880_n.jpg?_nc_ht=instagram.fdnk1-1.fna.fbcdn.net&_nc_ohc=hBfHi5pWwqQAX_dmZkC&oh=ba104b6726f8d35663806d4177d44c7c&oe=5F1F6B5C" }}
            />
            <View style={styles.cardTitle}>
              <Text style={styles.cardText}>Іра О.</Text>
            </View>
          </View> */}
        </View>
      ))}
      <View style={styles.row}>
        <View style={styles.card}></View>
        <View style={styles.card}></View>
        <View style={styles.card}></View>
      </View>
    </View>

  )
}



export default EmployeesList