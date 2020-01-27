import React, { useState, useRef, Fragment, } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Animated, Easing, } from 'react-native'
import { useSelector, } from 'react-redux'
import FastImage from 'react-native-fast-image'
import styles from './styles'
import Collapsible from 'react-native-collapsible'
import moment from 'moment/min/moment-with-locales';
moment.locale('uk');

import { currentAccountSelector, } from '@selectors'

function History(props) {
  const currentAccount = useSelector(currentAccountSelector)

  const [expandedIndex, setExpandedIndex] = useState(null)
  const [spinValue] = useState(new Animated.Value(1))

  const scrollRef = useRef(null)

  const handleExpand = (index) => {
    if (expandedIndex === index) {
      Animated.timing(
        spinValue,
        {
          toValue: 0,
          duration: 300,
          easing: Easing.ease,
        }
      ).start()

      setExpandedIndex(null)
    } else {
      Animated.timing(
        spinValue,
        {
          toValue: 0.5,
          duration: 300,
          easing: Easing.ease,
        }
      ).start()

      scrollRef.current.scrollTo(index * 70)

      setExpandedIndex(index)
    }
  }

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  const AnimatedImage = Animated.createAnimatedComponent(FastImage)

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 0, }}
      scrollEnabled={expandedIndex === null}
    >
      {currentAccount.localSessions.map((day, index) => {
        const employeesLength = day.employees ? day.employees.length : 0
        const sessionTotal = day.receipts.reduce((accumulator, currentValue) => accumulator + (currentValue.total), false)

        return (
          <Fragment key={index}>
            <TouchableOpacity
              style={styles.dayHeader}
              onPress={() => handleExpand(index)}
              activeOpacity={1}
            >
              <FastImage
                style={{ width: 20, height: 20, marginRight: 20, }}
                source={require('@images/session_process.png')}
              />
              <Text style={styles.dayHeaderDate}>{moment(day.startTime).format('dddd DD.MM.YY').charAt(0).toUpperCase() + moment(day.startTime).format('dddd DD.MM.YY').slice(1)}</Text>
              <Text style={styles.dayHeaderTotal}>Всього за зміну: {sessionTotal}</Text>
              <Text style={styles.dayHeaderEmployees}>Працівників на зміні: {employeesLength}</Text>
              <View style={styles.dayHeaderIcon}>
                <AnimatedImage
                  style={[{ width: 15, height: 15 }, expandedIndex === index && { transform: [{ rotate: spin }] }]}
                  source={require('@images/down-arrow.png')}
                />
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={expandedIndex !== index}>
              <View style={{ width: '100%', maxHeight: 600, paddingLeft: 40, backgroundColor: '#FFFFFF' }}>
                {/* <View style={styles.employeesContainer}>
                <View style={styles.employeeBlock}>
                  <View style={styles.employee}>
                    <FastImage
                      style={styles.employeeImage}
                      source={require('@images/background-adv1.png')}
                    />
                  </View>
                  <Text style={styles.employeeName}>Андрій - Бариста</Text>
                </View>
                <View style={styles.employeeBlock}>
                  <View style={styles.employee}>
                    <FastImage
                      style={styles.employeeImage}
                      source={require('@images/background-adv1.png')}
                    />
                  </View>
                  <Text style={styles.employeeName}>Андрій - Бариста</Text>
                </View>

                <Text style={styles.total}>
                  2303 грн всього
                </Text>
              </View> */}

                <ScrollView
                  style={styles.historyInstanceContainer}
                  contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 30, }}
                  scrollEnabled={expandedIndex === index}
                >
                  {day.receipts.slice(day.receipts.length - 20, day.receipts.length).reverse().map((item, index) => (
                    <View style={styles.historyInstance} key={index}>
                      <View style={{ width: '60%', }}>
                        <Text style={styles.receiptTime}>Час: {moment(item.transaction_time_end).format('HH:mm')}</Text>
                        <Text style={styles.receiptType}>Тип оплати: {true ? 'Готівка' : 'Картка'}</Text>
                        <Text style={styles.receiptTotal}>Всього: {item.receipt.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), false)} грн</Text>
                      </View>


                      <Collapsible style={styles.collapsedReceiptContent} collapsed={false}>
                        {item.receipt.map((elem, id) => (
                          <Text style={styles.receiptItem} key={id}>{elem.title} - {elem.price * elem.quantity} грн</Text>
                        ))}
                      </Collapsible>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </Collapsible>
          </Fragment>
        )
      })}
    </ScrollView>
  )
}

export default History
