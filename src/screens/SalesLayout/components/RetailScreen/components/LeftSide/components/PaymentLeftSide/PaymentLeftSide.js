import React from 'react'
import { View, Text, TouchableOpacity, } from 'react-native'
import { useSelector, } from 'react-redux';
import FastImage from 'react-native-fast-image';
import styles from './styles'

import { currentAccountSelector } from '@selectors'

import EditIcon from '@images/edit.svg'

import SharedButton from '@shared/SharedButton';

function PaymentLeftSide(props) {
  const { 
    selectedType, pTypes, selectPType,
    setEmployeesListVisibility, currentEmployee,
  } = props

  const currentAccount = useSelector(currentAccountSelector)

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Спосіб оплати</Text>
      {pTypes.map((item, index) => (
        <TouchableOpacity
          style={[styles.paymentType, selectedType.index === index && { backgroundColor: '#2E2C2E', }]}
          onPress={() => selectPType(item)}
          activeOpacity={1}
          key={index}
        >
          {item.imageSource && (
            <FastImage
              style={{ width: 30, height: 30, marginRight: 15, }}
              source={item.imageSource}
            />
          )}

          <Text style={[styles.paymentTypeName, selectedType.index === index && { color: '#FFFFFF', }]}>{item.name}</Text>
        </TouchableOpacity>
      ))}
      <View style={{ position: 'relative', alignItems: 'center', flexDirection: 'row', }}>
        <Text style={styles.heading}>Працівник</Text>
        <SharedButton
          style={styles.editButton}
          onPress={() => setEmployeesListVisibility(true)}
        >
          <EditIcon width={15} height={15} />
        </SharedButton>
      </View>


      <View style={styles.currentEmployee}>
        <FastImage
          style={styles.currentEmployeeImage}
          source={{ uri: currentAccount.img_url }}
        />
        <View style={styles.currentEmployeeBorder} />
        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.currentEmployeeName}>{currentEmployee}</Text>
      </View>
    </View >
  )
}

export default PaymentLeftSide