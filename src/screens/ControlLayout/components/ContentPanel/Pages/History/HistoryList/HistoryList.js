import React, { useState, useRef, Fragment, } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Animated, Easing, FlatList, } from 'react-native'
import { useSelector, } from 'react-redux'
import FastImage from 'react-native-fast-image'
import styles from './styles'
import Collapsible from 'react-native-collapsible'
import moment from 'moment/min/moment-with-locales';
moment.locale('uk');

import SharedButton from '@shared/SharedButton'

import ReceiptModal from './ReceiptModal'
import { deviceHeight } from '@dimensions';

function HistoryList(props) {
  const { data } = props

  const timerRef = useRef(null)

  const [expandedIndex, setExpandedIndex] = useState(null)
  const [receiptModalItem, setReceiptModalItem] = useState(false)
  const [receiptModalOpened, setReceiptModalVisibility] = useState(false)
  const [receiptModalState, setReceiptModalState] = useState(false)
  const [spinValue] = useState(new Animated.Value(1))
  const [showScrollTopButton, setScrollTopButtonVisibility] = useState(false)

  const scrollRef = useRef(null)

  const handleExpand = (index, sessionTotal) => {
    if (sessionTotal === 0) return

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

      scrollRef.current.scrollTo({ x: 0, y: index * 70 })

      setExpandedIndex(index)
    }
  }

  const AnimatedImage = Animated.createAnimatedComponent(FastImage)

  const showReceiptModal = (type, receipt) => {
    setReceiptModalState(type)
    setReceiptModalItem(receipt.hash_id)
    setReceiptModalVisibility(true)
  }

  const hideReceiptModal = () => {
    setReceiptModalVisibility(false)

    timerRef.current = setTimeout(() => {
      setReceiptModalState(null)

      clearTimeout(timerRef.current)
    }, 300)
  }

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 600, }}
      scrollEnabled={expandedIndex === null}
      onScroll={(e) => {
        setScrollTopButtonVisibility(e.nativeEvent.contentOffset.y > 50)
      }}
      scrollEventThrottle={100}
    // onScrollEndDrag={() => setScrollTopButtonVisibility(true)}
    >
      {data.map((day, index) => {
        const employeesLength = day.employees ? day.employees.length : 0
        const sessionTotal = day.receipts.reduce((accumulator, currentValue) => accumulator + (currentValue.total), false) || 0

        const spin = spinValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        })

        return (
          <Fragment key={index}>
            <TouchableOpacity
              style={styles.dayHeader}
              onPress={() => handleExpand(index, sessionTotal)}
              activeOpacity={1}
            >
              <FastImage
                style={{ width: 20, height: 20, marginRight: 28, }}
                source={require('@images/session_process.png')}
              />
              <Text style={styles.dayHeaderDate}>{moment(day.startTime).format('dddd').charAt(0).toUpperCase() + moment(day.startTime).format('dddd DD.MM - HH:mm').slice(1)}</Text>
              <Text style={styles.dayHeaderTotal}>Всього за зміну: {sessionTotal}</Text>
              <Text style={styles.dayHeaderEmployees}>Працівників на зміні: {employeesLength}</Text>
              <View style={styles.dayHeaderIcon}>
                <AnimatedImage
                  style={[{ width: 15, height: 15 }, expandedIndex === index && { transform: [{ rotate: spin }] }]}
                  source={require('@images/down-arrow.png')}
                />
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={expandedIndex !== index || sessionTotal === 0}>
              <View style={{ width: '100%', maxHeight: deviceHeight * 0.625, backgroundColor: '#FFFFFF' }}>
                <ScrollView
                  style={styles.historyInstanceContainer}
                  contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', }}
                  scrollEnabled={expandedIndex === index}
                >
                  <FlatList
                    data={day.receipts.slice(day.receipts.length - 20, day.receipts.length).reverse()}
                    initialNumToRender={20}
                    removeClippedSubviews
                    renderItem={({ item }) => (
                      <View style={styles.historyInstance}>
                        <View style={{ marginRight: 5, }}>
                          <SharedButton
                            style={{ marginTop: -15, width: 69, height: 69, }}
                            onPress={() => showReceiptModal('qr', item)}
                            scale={0.8}
                          >
                            <FastImage
                              style={{ width: '26%', height: '26%', }}
                              source={require('@images/qr-code.png')}
                            />
                          </SharedButton>
                          {/* <SharedButton
                            style={{ marginTop: -15, width: 58, height: 58, }}
                            onPress={() => showReceiptModal('email', item)}
                            scale={0.8}
                          >
                            <FastImage
                              style={{ width: '30%', height: '30%', }}
                              source={require('@images/email.png')}
                            />
                          </SharedButton> */}
                        </View>


                        <View style={styles.collapsedReceiptContent}>
                          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text style={styles.collapsedReceiptContenHeading}>Зміст:</Text>
                          </View>

                          {item.receipt.map((elem, id) => (
                            <Text style={styles.receiptItem} key={id}>{elem.title} x{elem.quantity} - {elem.price * elem.quantity} грн</Text>
                          ))}
                        </View>

                        <View style={{ width: '58%', padding: 10, }}>
                          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, }}>
                            <Text style={styles.receiptDetailHeading}>Тип оплати: <Text style={styles.receiptDetailContent}>{item.payment_type === 'cash' ? 'Готівка' : 'Картка'}</Text></Text>
                            <Text style={styles.receiptDetailHeading}>Внесено: <Text style={styles.receiptDetailContent}>{item.receipt.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), false)} грн</Text></Text>
                          </View>

                          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, marginTop: 20, }}>
                            <Text style={styles.receiptDetailHeading}>Час: <Text style={styles.receiptDetailContent}>{moment(item.transaction_time_end).format('HH:mm')}</Text></Text>
                            <Text style={styles.receiptDetailHeading}>До сплати: <Text style={styles.receiptDetailContent}>{item.receipt.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), false)} грн</Text></Text>
                          </View>

                          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, marginTop: 20, }}>
                            <Text style={styles.receiptDetailHeading}>Знижка: <Text style={styles.receiptDetailContent}>{item.discount}</Text></Text>
                            <Text style={styles.receiptDetailHeading}>Решта: <Text style={styles.receiptDetailContent}>{item.change} грн</Text></Text>
                          </View>

                          {item.comment !== '' && (
                            <View style={{ width: '100%', marginTop: 20, }}>
                              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, }}>
                                <Text style={styles.receiptDetailHeadingComment}>Коментар: <Text style={styles.receiptDetailContent}>{item.comment}</Text></Text>
                              </View>
                            </View>
                          )}
                        </View>
                      </View>
                    )}
                    listKey={item => item.localId}
                  />
                </ScrollView>
              </View>
            </Collapsible>
          </Fragment>
        )
      })}

      {data.length > 2 && showScrollTopButton && (
        <View style={styles.scrollTopButton}>
          <SharedButton
            style={{ flex: 1, }}
            onPress={() => scrollRef.current.scrollTo({ x: 0, y: 0 })}
            scale={0.8}
          >
            <View style={styles.scrollTopButtonInner}>
              <FastImage
                style={{ width: '50%', height: '50%', }}
                source={require('@images/to_top.png')}
              />
            </View>
          </SharedButton>
        </View>
      )}

      <ReceiptModal
        isVisible={receiptModalOpened}
        receiptModalItem={receiptModalItem}
        receiptModalState={receiptModalState}
        hideReceiptModal={hideReceiptModal}
      />
    </ScrollView>
  )
}

export default HistoryList
