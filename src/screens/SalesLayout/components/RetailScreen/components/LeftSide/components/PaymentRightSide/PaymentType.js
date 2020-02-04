import React, { useState, useEffect, } from 'react'
import { View, Text, ScrollView, TextInput, TouchableOpacity, Animated, Easing, } from 'react-native'
import Collapsible from 'react-native-collapsible';
import styles from './styles'

import PaymentSubmit from '../PaymentSubmit'
import CardPaymentStatus from './CardPaymentStatus'

import SharedButton from '@shared/SharedButton'
import FastImage from 'react-native-fast-image';

function PaymentType(props) {
  const {
    selectedType, enteredSum, toByPaid, invalidColor, status, setStatus,
    initialStatuses, resetStatus, setPaymentModalVisibility, buttonAccessible,
    handleChangeSum, receipt, saveReceipt, clearCurrentReceipt,
    isVisible, discounts, setActiveDiscount, activeDiscount,
  } = props

  const [spinComment, setSpinComment] = useState(new Animated.Value(0))
  const [spinDiscount, setSpinDiscount] = useState(new Animated.Value(1))
  const [discountCollapsed, setDiscountCollapsed] = useState(true)
  const [commentCollapsed, setCommentCollapsed] = useState(false)

  useEffect(() => {
    setActiveDiscount(0)

    setSpinComment(new Animated.Value(0))
    setSpinDiscount(new Animated.Value(1))
    setDiscountCollapsed(true)
    setCommentCollapsed(false)
  }, [isVisible])

  const handleExpand = (collapsed, type) => {
    if (type === 'discount') {
      if (collapsed) {
        Animated.timing(
          spinDiscount,
          {
            toValue: 1,
            duration: 100,
            easing: Easing.ease,
          }
        ).start()

        setDiscountCollapsed(false)
      } else {
        Animated.timing(
          spinDiscount,
          {
            toValue: 0,
            duration: 100,
            easing: Easing.ease,
          }
        ).start()

        setDiscountCollapsed(true)
      }
    }

    if (type === 'comment') {
      if (collapsed) {
        Animated.timing(
          spinComment,
          {
            toValue: 1,
            duration: 100,
            easing: Easing.ease,
          }
        ).start()

        setCommentCollapsed(false)
      } else {
        Animated.timing(
          spinComment,
          {
            toValue: 0,
            duration: 100,
            easing: Easing.ease,
          }
        ).start()

        setCommentCollapsed(true)
      }
    }

  }

  const spinD = spinDiscount.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  })

  const spinC = spinComment.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  })

  const AnimatedImage = Animated.createAnimatedComponent(FastImage)

  return (
    <>
      <View style={styles.totalDetails}>
        <View style={styles.toByPaid}>
          <Text style={styles.toByPaidText}>{toByPaid} грн до сплати</Text>
        </View>

        {selectedType.index === 0 && (
          <View style={[styles.secondContainer, { justifyContent: 'space-between', paddingRight: '7%', }]}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <TextInput
                style={[styles.paidInput, invalidColor ? { color: '#E35E62', borderColor: '#E35E62', } : { color: '#39B14C', borderColor: '#39B14C', }]}
                value={`${enteredSum}`}
                onChangeText={handleChangeSum}
                keyboardType='number-pad'
              />
              <Text style={styles.paidText}>грн внесено</Text>
            </View>
            <Text style={styles.changeText}>Решта: {((+enteredSum) - toByPaid).toFixed(2).replace(".00", "")}</Text>
          </View>
        )}

        {selectedType.index === 1 && (
          <CardPaymentStatus
            status={status}
            setStatus={setStatus}
            initialStatuses={initialStatuses}
            resetStatus={resetStatus}
          />
        )}
      </View>

      <View>
        <TouchableOpacity
          style={{ alignItems: 'center', flexDirection: 'row' }}
          onPress={() => handleExpand(discountCollapsed, 'discount')}
          activeOpacity={0.8}
        >
          <Text style={[styles.headingText, { paddingBottom: 0, }]}>Знижка</Text>
          <AnimatedImage
            style={{ width: 13, height: 13, marginLeft: '2%', marginTop: '7.5%', transform: [{ rotate: spinD }] }}
            source={require('@images/down-arrow.png')}
          />
        </TouchableOpacity>


        <Collapsible style={{ paddingTop: '5%' }} collapsed={discountCollapsed}>
          <ScrollView
            style={styles.discountContainer}
            contentContainerStyle={{ paddingBottom: 2, }}
            horizontal
          >
            {discounts && discounts.map((item, index) => (
              <View style={[styles.discountItem, index === activeDiscount && styles.activeDiscountItem]}>
                <SharedButton
                  style={{ flex: 1, width: '100%',}}
                  onPress={() => setActiveDiscount(index)}
                  scale={0.8}
                  key={index}
                >
                  <Text style={[styles.discountItemText, index === activeDiscount && styles.activeDiscountItemText]}>{item.percent}%</Text>
                </SharedButton>
              </View>

            ))}
          </ScrollView>
        </Collapsible>
      </View>

      <View>
        <TouchableOpacity
          style={{ alignItems: 'center', flexDirection: 'row' }}
          onPress={() => handleExpand(commentCollapsed, 'comment')}
          activeOpacity={0.8}
        >
          <Text style={[styles.headingText, { paddingBottom: 0, }]}>Коментар</Text>
          <AnimatedImage
            style={{ width: 13, height: 13, marginLeft: '2%', marginTop: '7.5%', transform: [{ rotate: spinC }] }}
            source={require('@images/down-arrow.png')}
          />
        </TouchableOpacity>


        <Collapsible style={{ paddingTop: '5%' }} collapsed={commentCollapsed}>
          <TextInput
            style={styles.commentContainer}
            placeholder='Ваш коментар'
            multiline
          />
        </Collapsible>
      </View>

      {/* <View style={{ height: '40%', }}>
        <Text style={styles.headingText}>Замовлення</Text>

        <ScrollView style={styles.orderContainer} contentContainerStyle={{ paddingBottom: 2, }}>
          {receipt && receipt.map((item, index) => (
            <View style={styles.orderItem} key={index}>
              <Text style={[styles.orderItemText, { width: '65%', }]}>{item.title} x {item.quantity}</Text>
              <Text style={styles.orderItemText}>{item.price} грн</Text>
            </View>
          ))}
        </ScrollView>
      </View> */}

      <PaymentSubmit
        status={status}
        buttonAccessible={buttonAccessible}
        selectedType={selectedType}
        setPaymentModalVisibility={setPaymentModalVisibility}
        saveReceipt={saveReceipt} receipt={receipt}
        clearCurrentReceipt={clearCurrentReceipt}
      />
    </>
  )
}

export default PaymentType
