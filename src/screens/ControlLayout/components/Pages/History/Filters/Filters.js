import React, { useState, useRef, Fragment, } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Animated, Easing, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux'
import FastImage from 'react-native-fast-image';
import Collapsible from 'react-native-collapsible';
import { DURATION } from 'react-native-easy-toast'
import styles from './styles'

import { deviceWidth } from '@dimensions'

import SharedButton from '@shared/SharedButton';
import { getFormattedDate, getSubstractDate, } from '@dateFormatter';
import { loadReceipts, loadDetails, } from '@reducers/OrdersReducer'
import { setHistoryParams, } from '@reducers/TempReducer'

function Filters(props) {
  const { toastRef, setSideMenuStatus, } = props

  const dispatch = useDispatch()

  const details = useSelector(state => state.orders.details)
  const historyParams = useSelector(state => state.temp.historyParams)

  const [detailsExpanded, setExpandedDetailsStatus] = useState(false)

  const loadAgain = async () => {
    try {
      toastRef.current.show("Оновлення чеків", DURATION.FOREVER);

      await dispatch(loadReceipts())
      await dispatch(loadDetails())
    } catch (error) {
      console.log('error - Filters - loadAgain', error)
    } finally {
      toastRef.current.close()
    }
  }


  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: '49%', }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setExpandedDetailsStatus(prev => !prev)}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Деталі за {getFormattedDate('DD.MM.YY', historyParams.date)}</Text>
              <FastImage
                style={{ width: 12, height: 12, marginLeft: 10, }}
                source={require('@images/down-arrow.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setSideMenuStatus(prev => !prev)}
            activeOpacity={0.8}
          >
            <FastImage
              style={{ width: 16, height: 16, marginRight: 10, }}
              source={require('@images/calendar.png')}
            />
            <Text style={styles.buttonText}>Дата</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => dispatch(setHistoryParams({ ...historyParams, sort: { type: historyParams.sort.type === 'asc' ? 'desc' : 'asc', fields: ['transaction_time_end'] }, }))}
            activeOpacity={0.8}
          >
            <FastImage
              style={{ width: 16, height: 16, marginRight: 10, }}
              source={historyParams.sort.type === 'asc' ? require('@images/arrow-asc.png') : require('@images/arrow-desc.png')}
            />
            <Text style={styles.buttonText}>Сортування</Text>
          </TouchableOpacity>
          <View style={[styles.button, { paddingLeft: 20, paddingRight: 25 }]}>
            <SharedButton
              onPress={loadAgain}
              style={{ width: 25, height: 25, marginRight: 10, backgroundColor: '#FFFFFF00' }}
              iconStyle={{ width: 22, height: 22, }}
              source={require('@images/reload.png')} scale={0.6}
              rotateOnPress loadAgain={loadAgain}
            />
          </View>
        </View>
      </View>

      <Collapsible style={{ width: deviceWidth * 0.38, paddingVertical: 15, paddingHorizontal: 25, }} collapsed={!detailsExpanded}>
        <View style={styles.paymentDetails}>
          <Text style={styles.paymentDetailsHeadingText}><Text>Безготівковий підсумок</Text>:</Text>
          <Text style={styles.paymentDetailsText}>{details && details.payments.debit.total || 0} грн</Text>
        </View>

        <View style={styles.paymentDetails}>
          <Text style={styles.paymentDetailsHeadingText}><Text>Готівковий підсумок</Text>:</Text>
          <Text style={styles.paymentDetailsText}>{details && details.payments.cash.total || 0} грн</Text>
        </View>

        <View style={styles.paymentDetails}>
          <Text style={styles.paymentDetailsHeadingText}><Text>Всього</Text>:</Text>
          <Text style={styles.paymentDetailsText}>{(details && details.total || 0) + (0 || 0) || 0} грн</Text>
        </View>

        <View style={styles.paymentDetails}>
          <Text style={styles.paymentDetailsHeadingText}><Text>Витрати</Text>:</Text>
          <Text style={styles.paymentDetailsText}>{details && details.transactions.outcome && `-${details.transactions.outcome}` || 0} грн</Text>
        </View>

        <View style={styles.paymentDetails}>
          <Text style={styles.paymentDetailsHeadingText}><Text>Інкасації</Text>:</Text>
          <Text style={styles.paymentDetailsText}>{details && details.transactions.incasations && `-${details.transactions.incasations}` || 0} грн</Text>
        </View>

        <View style={styles.paymentDetails}>
          <Text style={styles.paymentDetailsHeadingText}><Text>Прибуток</Text>:</Text>
          <Text style={styles.paymentDetailsText}>{details && details.transactions.outcome || 0} грн</Text>
        </View>

        <View style={styles.paymentDetails}>
          <Text style={styles.paymentDetailsHeadingText}><Text>Підсумок</Text>:</Text>
          <Text style={styles.paymentDetailsText}>{details ? ((details.payments.cash.total || 0) + (details.payments.debit.total || 0) - (details.transactions.outcome || 0) - (details.transactions.incasations || 0) + (details.transactions.income || 0)) : 0} грн</Text>
        </View>
      </Collapsible>
    </View>
  )
}

export default Filters
