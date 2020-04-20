import React, { useState, useEffect, } from 'react'
import { View, Text, ScrollView, TextInput, TouchableOpacity, Animated, Easing, } from 'react-native'
import Collapsible from 'react-native-collapsible';
import styles from './styles'

import PaymentSubmit from '../PaymentSubmit'
import CardPaymentStatus from './CardPaymentStatus'

import SharedButton from '@shared/SharedButton'
import FastImage from 'react-native-fast-image';

import { deviceHeight } from '@dimensions'

function PaymentType(props) {
  const {
    selectedType, enteredSum, toBePaid, invalidColor, status, setStatus,
    initialStatuses, resetStatus, setPaymentModalVisibility, buttonAccessible,
    handleChangeSum, receipt, saveReceipt, setAmountFocused,
    isVisible, discounts, setActiveDiscount, activeDiscount, comment, setComment,
  } = props

  const [spinComment, setSpinComment] = useState(new Animated.Value(0))
  const [spinDiscount, setSpinDiscount] = useState(new Animated.Value(1))
  const [discountCollapsed, setDiscountCollapsed] = useState(true)
  const [commentCollapsed, setCommentCollapsed] = useState(false)

  const expandComment = () => {
    Animated.timing(
      spinDiscount,
      {
        toValue: 0,
        duration: 100,
        easing: Easing.ease,
      }
    ).start()

    Animated.timing(
      spinComment,
      {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
      }
    ).start()

    setDiscountCollapsed(true)
    setCommentCollapsed(false)
  }

  const collapseComment = () => {
    Animated.timing(
      spinComment,
      {
        toValue: 0,
        duration: 100,
        easing: Easing.ease,
      }
    ).start()

    Animated.timing(
      spinDiscount,
      {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
      }
    ).start()

    setDiscountCollapsed(false)
    setCommentCollapsed(true)
  }

  const expandDiscount = () => {
    Animated.timing(
      spinDiscount,
      {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
      }
    ).start()

    Animated.timing(
      spinComment,
      {
        toValue: 0,
        duration: 100,
        easing: Easing.ease,
      }
    ).start()

    setDiscountCollapsed(false)
    setCommentCollapsed(true)
  }

  const collapseDiscount = () => {
    Animated.timing(
      spinComment,
      {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
      }
    ).start()

    Animated.timing(
      spinDiscount,
      {
        toValue: 0,
        duration: 100,
        easing: Easing.ease,
      }
    ).start()

    setDiscountCollapsed(true)
    setCommentCollapsed(false)
  }

  const handleExpand = (collapsed, type) => {
    if (type === 'comment') {
      if (collapsed) {
        expandComment()
      } else {
        collapseComment()
      }
    }

    if (type === 'discount') {
      if (collapsed) {
        expandDiscount()
      } else {
        collapseDiscount()
      }
    }
  }

  const handleChangeText = (value) => {
    setComment(value)
  }

  useEffect(() => {
    setActiveDiscount(0)
    setComment('')

    setSpinComment(new Animated.Value(0))
    setSpinDiscount(new Animated.Value(1))
    setDiscountCollapsed(true)
    setCommentCollapsed(false)
  }, [isVisible])

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
          <Text style={styles.toByPaidText}>{toBePaid} {activeDiscount > 0 ? ` (-${discounts[activeDiscount].percent}%) ` : ''}грн до сплати</Text>
        </View>

        {selectedType.index === 0 && (
          <View style={[styles.secondContainer, { justifyContent: 'space-between', paddingRight: '7%', }]}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <TextInput
                style={[styles.paidInput, invalidColor ? { color: '#E35E62', borderColor: '#E35E62', } : { color: '#39B14C', borderColor: '#39B14C', }]}
                value={`${enteredSum}`}
                onChangeText={handleChangeSum}
                keyboardType='number-pad'
                maxLength={4}
                textAlign={'center'}
                onFocus={() => {
                  handleChangeSum('')
                  setAmountFocused(true)
                }}
                onBlur={() => {
                  setAmountFocused(false)

                  if (enteredSum == '') {
                    handleChangeSum(`${toBePaid}`)
                  }
                }}
              />
              <Text style={styles.paidText}>грн внесено</Text>
            </View>
            <Text style={styles.changeText}>Решта: {((+enteredSum) - toBePaid).toFixed(2).replace(".00", "")}</Text>
          </View>
        )}

        {selectedType.index === 1 && (
          <CardPaymentStatus
            status={status}
            setStatus={setStatus}
            initialStatuses={initialStatuses}
            resetStatus={resetStatus}
            isVisible={isVisible}
          />
        )}
      </View>

      <View>
        <TouchableOpacity
          style={{ alignItems: 'center', flexDirection: 'row' }}
          onPress={() => handleExpand(discountCollapsed, 'discount')}
          activeOpacity={0.8}
        >
          <Text style={styles.headingText}>Знижка</Text>
          <AnimatedImage
            style={[styles.arrowStyles, { transform: [{ rotate: spinD }] }]}
            source={require('@images/down-arrow.png')}
          />
        </TouchableOpacity>


        <Collapsible style={styles.discountWrapper} collapsed={discountCollapsed}>
          <ScrollView
            style={styles.discountContainer}
            contentContainerStyle={{ paddingBottom: 2, }}
            horizontal
          >
            {discounts && discounts.map((item, index) => (
              <View style={[styles.discountItem, index === activeDiscount && styles.activeDiscountItem]}>
                <SharedButton
                  style={{ flex: 1, width: '100%', }}
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

      <View style={{}}>
        <TouchableOpacity
          style={{ alignItems: 'center', flexDirection: 'row', }}
          onPress={() => handleExpand(commentCollapsed, 'comment')}
          activeOpacity={0.8}
        >
          <Text style={styles.headingCommentText}>Коментар</Text>
          <AnimatedImage
            style={[styles.arrowCommentStyles, { transform: [{ rotate: spinC }] }]}
            source={require('@images/down-arrow.png')}
          />
        </TouchableOpacity>


        <Collapsible style={{ paddingTop: '4%' }} collapsed={commentCollapsed}>
          <TextInput
            value={comment}
            onChangeText={handleChangeText}
            style={styles.commentContainer}
            placeholder='Ваш коментар'
            multiline
          />
        </Collapsible>
      </View>

      <PaymentSubmit
        status={status}
        buttonAccessible={buttonAccessible}
        selectedType={selectedType}
        setPaymentModalVisibility={setPaymentModalVisibility}
        saveReceipt={saveReceipt} receipt={receipt}
      />
    </>
  )
}

export default PaymentType
