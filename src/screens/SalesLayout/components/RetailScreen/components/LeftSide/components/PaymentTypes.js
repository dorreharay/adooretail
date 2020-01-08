import React, { Fragment, useState, } from 'react'
import { View, Text, TouchableOpacity, } from 'react-native'
import { useSelector } from 'react-redux'
import Svg, { Circle, Rect } from 'react-native-svg';
import styles from '../../../styles'

import { PROBA_LIGHT, PROBA_MEDIUM } from '@fonts'
import LinearGradient from 'react-native-linear-gradient';

function PaymentTypes() {
  const { deviceWidth, deviceHeight } = useSelector(state => state.temp.dimensions)

  const [types, setTypes] = useState(['Картка', 'Готівка', 'Сертифікат'])
  const [selectedPaymentTypeIndex, setSelectedPaymentTypeIndex] = useState(0)

  return (
    <View style={styles.paymentTypesContainer}>
      {types.map((type, index) => (
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={
            selectedPaymentTypeIndex === index ? ['#484848', '#969696'] : ['#FFFFFF', '#FFFFFF']
          }
          // ['#E1E1E1', '#B2B2B2']
          style={[
            styles.paymentType,
            {
              marginRight: deviceWidth * 0.015,
              marginBottom: deviceWidth * 0.015,
              backgroundColor: selectedPaymentTypeIndex === index ? '#EF9058' : '#FFFFFF00',
              borderColor: selectedPaymentTypeIndex === index ? '#FFFFFF' : '#000000',
            }
          ]}
          key={index}
        >
          <TouchableOpacity onPress={() => setSelectedPaymentTypeIndex(index)} activeOpacity={1}>
            {/* <LinearGradient
            onPress={() => setSelectedPaymentTypeIndex(index)}
            style={[
              styles.paymentType,
              {
                marginRight: deviceWidth * 0.02,
                marginBottom: deviceWidth * 0.02,
                backgroundColor: selectedPaymentTypeIndex === index ? '#EF9058' : '#FFFFFF00',
                borderColor: selectedPaymentTypeIndex === index ? '#EF9058' : '#000000'
              }
            ]}
            activeOpacity={1}
            key={index}
          > */}
            {/* <View style={{ position: 'relative' }}>
            <Svg width={styles.dot.width} height={styles.dot.height}>
              <Rect
                width={styles.dot.width}
                height={styles.dot.width}
                r={0}
                strokeWidth="1.5"
                stroke="#000000"
                fill={"#33333300"}
              />
            </Svg>
            {selectedPaymentTypeIndex === index && (
              <Svg style={{ position: 'absolute', top: 7, left: 7 }} width={styles.dot.width} height={styles.dot.height}>
                <Rect
                  width={styles.dot.width - 14}
                  height={styles.dot.width - 14}
                  r={0}
                  strokeWidth="1.5"
                  stroke="#000000"
                  fill={'#000000'}
                />
              </Svg>
            )}
          </View> */}

            <Text style={[
              styles.paymentTypeName,
              {
                color: selectedPaymentTypeIndex === index ? '#FFFFFF' : '#343434',
                fontFamily: selectedPaymentTypeIndex === index ? PROBA_MEDIUM : PROBA_LIGHT
              }
            ]}>{type}</Text>
          </TouchableOpacity>

        </LinearGradient>
      ))}
    </View>
  )
}

export default PaymentTypes
