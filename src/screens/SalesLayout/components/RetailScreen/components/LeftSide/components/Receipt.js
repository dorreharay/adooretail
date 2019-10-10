import React from 'react';
import { View, Text, TouchableOpacity, Image, } from 'react-native';

import styles from '../styles'

function Receipt({ receipt }) {
  return (
    <View style={{ flex: 1, flexDirection: 'column', paddingRight: 10, }}>
      {receipt.map((item, index) => (
        <View style={styles.receiptItem} key={index}>
          <View style={styles.receiptTitle}>
            <Text style={styles.receiptTitleText}>{item.title}</Text>
          </View>
          <View style={styles.receiptDetails}>
            <Text style={{ color: '#343434', fontSize: 18, fontFamily: 'futura_light' }}>@{item.price}, -</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>
              <TouchableOpacity style={styles.receiptQty} onPress={() => {}} activeOpacity={1}>
                <Text style={styles.receiptQtyText}>{item.quantity}</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ width: 60, textAlign: 'center', color: '#343434', fontSize: 18, fontFamily: 'futura_light' }}>{item.quantity * item.price}₴</Text>
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: 50, height: 30, }} onPress={() => {}} activeOpacity={1}>
              <Image style={{ width: 12, height: 12 }} source={require('@images/x_icon.png')} fadeDuration={0} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  )
}

export default Receipt
