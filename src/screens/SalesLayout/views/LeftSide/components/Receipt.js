import React, { useRef, useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import BackgroundTimer from 'react-native-background-timer';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles';

import {
  addProductQuantity,
  substractProductQuantity,
  deleteCurrentReceiptItem,
} from '@reducers/TempReducer';
import { setToBePaidSum, setEnteredSum } from '@reducers/OrderReducer';

import { handleSize } from '@printer';

import { activeReceiptSelector } from '@selectors';

import SharedButton from '@shared/SharedButton';

function Receipt() {
  const activatedRef = useRef(null);

  const dispatch = useDispatch();

  const activeReceipt = useSelector(activeReceiptSelector);

  const [activatedIndex, setActivatedIndex] = useState(false);

  useEffect(() => {
    const receiptSum = activeReceipt?.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity,
      0,
    );

    dispatch(setToBePaidSum(receiptSum));
    dispatch(setEnteredSum(receiptSum));
  }, [activeReceipt]);

  const handleActivate = index => {
    setActivatedIndex(index);

    if (activatedIndex === false) {
      activatedRef.current = BackgroundTimer.setTimeout(() => {
        setActivatedIndex(false);
      }, 1500);
    }
  };

  const handlePress = (type, rowItem) => {
    if (type === 'plus') {
      dispatch(addProductQuantity(rowItem));
    } else {
      dispatch(substractProductQuantity(rowItem));
    }

    clearTimeout(activatedRef.current);

    activatedRef.current = BackgroundTimer.setTimeout(
      () => setActivatedIndex(false),
      1000,
    );
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column', paddingTop: 10 }}>
      {activeReceipt.map((item, index) => (
        <View style={styles.receiptItem} key={index}>
          <View style={styles.receiptTitle}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.receiptTitleText}
            >
              {item.title}
              {item.size ? `, ${handleSize(item.size)}` : ''}
            </Text>
          </View>
          <View style={styles.receiptDetails}>
            <View style={styles.receiptOnePriceContainer}>
              <Text style={styles.receiptOnePrice}>@{item.price}, -</Text>
            </View>
            <View style={styles.receiptQtyContainer}>
              {activatedIndex === index && (
                <SharedButton
                  style={styles.qtyButton}
                  onPress={() => handlePress('plus', item)}
                  scale={0.85}
                >
                  <FastImage
                    style={styles.qtyButtonIcon}
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
                  <Text
                    style={[
                      styles.receiptQtyText,
                      activatedIndex === index && styles.selectedText,
                    ]}
                  >
                    {item.quantity}
                  </Text>
                </View>
              </SharedButton>

              {activatedIndex === index && (
                <SharedButton
                  style={styles.qtyButton}
                  onPress={() => handlePress('minus', item)}
                  scale={0.85}
                >
                  <FastImage
                    style={styles.qtyButtonIcon}
                    source={require('@images/minus.png')}
                  />
                </SharedButton>
              )}
            </View>
            <View style={styles.receiptPrice}>
              <Text
                style={styles.receiptTotal}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {item?.quantity * item?.price} грн
              </Text>
            </View>
            <TouchableOpacity
              style={styles.receiptDeleteIcon}
              onPress={() => dispatch(deleteCurrentReceiptItem(index))}
              activeOpacity={1}
            >
              <Image
                style={{ width: 14, height: 14 }}
                source={require('@images/x_icon.png')}
                fadeDuration={0}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}

export default Receipt;
