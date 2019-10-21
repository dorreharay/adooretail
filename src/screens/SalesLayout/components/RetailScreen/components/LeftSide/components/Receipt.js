import React from 'react';
import { View, Text, TouchableOpacity, Image, } from 'react-native';
import styles from '../styles'

function Receipt({ receipt, setReceipts, }) {

  const deleteItem = (receiptIndex) => {
    const newReceipt = receipt.filter((item, index) => index !== receiptIndex)

    setReceipts(newReceipt)
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', paddingRight: 10, }}>
      {receipt.map((item, index) => (
        <View style={styles.receiptItem} key={index}>
          <View style={styles.receiptTitle}>
            <Text style={styles.receiptTitleText}>{item.title}</Text>
          </View>
          <View style={styles.receiptDetails}>
            <View style={styles.receiptOnePriceContainer}>
              <Text style={styles.receiptOnePrice}>@{item.price}, -</Text>
            </View>
            <View style={styles.receiptQtyContainer}>
              <TouchableOpacity style={styles.receiptQty} onPress={() => {}} activeOpacity={1}>
                <Text style={styles.receiptQtyText}>{item.quantity}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.receiptPrice}>
              <Text style={{ height: '100%', textAlign: 'center', color: '#343434', fontSize: 18, fontFamily: 'futura_light' }}>{item.quantity * item.price} грн</Text>
            </View>
            <TouchableOpacity
              style={styles.receiptDeleteIcon}
              onPress={() => deleteItem(index)}
              activeOpacity={1}
            >
              <Image style={{ width: '30%', height: '30%', }} source={require('@images/x_icon.png')} fadeDuration={0} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  )
}

export default Receipt
