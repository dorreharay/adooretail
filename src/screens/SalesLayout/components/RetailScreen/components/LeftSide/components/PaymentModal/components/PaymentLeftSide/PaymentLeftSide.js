import React from 'react'
import { View, Text, TouchableOpacity, } from 'react-native'
import { useSelector, } from 'react-redux';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import styles from './styles'

import { currentAccountSelector, currentSessionSelector, } from '@selectors'

import EditIcon from '@images/edit.svg'
import { deviceHeight } from '@dimensions'

import SharedButton from '@shared/SharedButton';

function PaymentLeftSide(props) {
  const {
    selectedType, pTypes, selectPType,
    setEmployeesListVisibility,
    setDeliveryListVisibility,
  } = props

  const currentSession = useSelector(currentSessionSelector)
  const currentService = useSelector(state => state.user.currentService) || 0
  const currentEmployee = useSelector(state => state.user.currentEmployee) || 0
  const currentAccount = useSelector(state => state.user.currentAccount)

  const renderServiceIcon = () => {
    if (currentService === 0) {
      return require('@images/question.png')
    }
    if (currentService === 1) {
      return require('@images/glovo-icon.png')
    }
    if (currentService === 2) {
      return require('@images/raketa-icon.png')
    }
    if (currentService === 3) {
      return require('@images/misteram-icon.png')
    }
    if (currentService === 4) {
      return require('@images/ubereats-icon.png')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { marginTop: '14%', }]}>Спосіб оплати</Text>

      <View style={{ marginTop: '10%', }}>
        {pTypes.map((item, index) => (
          <TouchableOpacity
            style={[styles.paymentType, selectedType.index === index && { backgroundColor: '#2E2C2E', }]}
            onPress={() => selectPType(item)}
            activeOpacity={1}
            key={index}
          >
            {item.imageSource && (
              <FastImage
                style={[{ width: 30, height: 30, marginRight: 15, }, selectedType.index !== index && { opacity: 0.5 }]}
                source={item.imageSource}
              />
            )}

            <Text style={[styles.paymentTypeName, selectedType.index === index && { color: '#FFFFFF', }]}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>


      <View>
        <View style={{ position: 'relative', alignItems: 'center', flexDirection: 'row', marginTop: '5%', marginBottom: 0, }}>
          <Text style={styles.heading}>Працівник</Text>
          <SharedButton
            style={styles.editButton}
            onPress={() => setEmployeesListVisibility(true)}
          >
            <EditIcon width={13} height={13} />
          </SharedButton>
        </View>

        <Ripple
          style={styles.currentEmployee}
          onPress={() => setEmployeesListVisibility(true)}
          rippleColor={`#C4C4C4`}
          rippleFades
        >
          <View style={styles.currentEmployeeImageWrapper}>
            <FastImage
              style={styles.currentEmployeeImage}
              source={{ uri: currentAccount && currentAccount.img_url || '' }}
            />
            <View style={styles.currentEmployeeBorder} />
          </View>

          <Text ellipsizeMode='tail' numberOfLines={1} style={styles.currentEmployeeName}>{currentSession && currentSession.employees ? currentSession.employees[currentEmployee] : ''}</Text>
        </Ripple>
      </View>


      {currentAccount && currentAccount.settings && !currentAccount.settings.printer_enabled && (
        <View>
          <View style={{ position: 'relative', alignItems: 'center', flexDirection: 'row', marginTop: '5%', marginBottom: 0, }}>
            <Text style={styles.heading}>Доставка</Text>
            <SharedButton
              style={styles.editButton}
              onPress={() => setDeliveryListVisibility(true)}
            >
              <EditIcon width={13} height={13} />
            </SharedButton>
          </View>

          <Ripple
            style={styles.currentEmployee}
            onPress={() => setDeliveryListVisibility(true)}
            rippleColor={`#C4C4C4`}
            rippleFades
          >
            <View style={styles.currentEmployeeImageWrapper}>
              <FastImage
                style={styles.serviceImage}
                source={renderServiceIcon()}
              />
            </View>

            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.currentEmployeeName}>{currentAccount && currentAccount.available_services ? currentAccount.available_services[currentService].name : ''}</Text>
          </Ripple>
        </View>
      )}
    </View>
  )
}

export default PaymentLeftSide