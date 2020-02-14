import React, { useRef, useState, useEffect, } from 'react';
import { View, Text, TouchableOpacity, Image, } from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from '../styles'

import { GILROY_REGULAR } from '@fonts'

import SharedButton from '@shared/SharedButton';

function Receipt(props) {
  const { receipt, setReceiptInstance, addProductQuantity, substractProductQuantity, } = props

  const activatedRef = useRef(null)

  const [activatedIndex, setActivatedIndex] = useState(false)

  const deleteItem = (receiptIndex) => {
    const newReceipt = receipt.filter((item, index) => index !== receiptIndex)

    setReceiptInstance(newReceipt)
  }

  const handleActivate = (index) => {
    setActivatedIndex(index)

    if (activatedIndex === false) {
      activatedRef.current = setTimeout(() => {
        setActivatedIndex(false)
      }, 1500)
    }
  }

  const handlePress = (type, rowItem) => {
    if (type === 'plus') {
      addProductQuantity(rowItem)
    } else {
      substractProductQuantity(rowItem)
    }

    clearTimeout(activatedRef.current)

    activatedRef.current = setTimeout(() => setActivatedIndex(false), 1000)
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', paddingTop: 10, paddingRight: 10, }}>
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
              {activatedIndex === index && (
                <SharedButton
                  style={{ width: 28, height: 28, }}
                  onPress={() => handlePress('plus', item)}
                  scale={0.85}
                >
                  <FastImage
                    style={{ width: 15, height: 15, }}
                    source={require('@images/plus.png')}
                  />
                </SharedButton>
              )}

              <SharedButton
                style={styles.receiptQty}
                onPress={() => handleActivate(index)}
                scale={0.85}
              >
                <View style={styles.receiptQtyInner}>
                  <Text style={[styles.receiptQtyText, activatedIndex === index && styles.selectedText]}>{item.quantity}</Text>
                </View>
              </SharedButton>

              {activatedIndex === index && (
                <SharedButton
                  style={{ width: 28, height: 28, }}
                  onPress={() => handlePress('minus', item)}
                  scale={0.85}
                >
                  <FastImage
                    style={{ width: 15, height: 15, }}
                    source={require('@images/minus.png')}
                  />
                </SharedButton>
              )}
            </View>
            <View style={styles.receiptPrice}>
              <Text 
                style={styles.receiptTotal}
                ellipsizeMode='tail'
                numberOfLines={1}
              >
                {item.quantity * item.price} грн
              </Text>
            </View>
            <TouchableOpacity
              style={styles.receiptDeleteIcon}
              onPress={() => deleteItem(index)}
              activeOpacity={1}
            >
              <Image
                style={{ width: '30%', height: '30%', }}
                source={require('@images/x_icon.png')}
                fadeDuration={0}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  )
}

export default Receipt
