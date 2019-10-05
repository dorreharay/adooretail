import React, { useState, useEffect, } from 'react'
import { Text, TouchableOpacity, View, ScrollView, StyleSheet, Alert, } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';
import axios from 'axios'

import moment from 'moment/min/moment-with-locales';
moment.locale('uk');

import { API_URL } from '../../../../../../../../config/api';

function ReceiptsHistoryList({ token }) {
  const [days] = useState([
    { date: moment().format('DD.MM.YYYY'), filterDate: moment().format('YYYY-MM-DD') },
    { date: moment().subtract(1, 'days').format('DD.MM.YYYY'), filterDate: moment().subtract(1, 'days').format('YYYY-MM-DD') },
    { date: moment().subtract(2, 'days').format('DD.MM.YYYY'), filterDate: moment().subtract(2, 'days').format('YYYY-MM-DD') },
    { date: moment().subtract(3, 'days').format('DD.MM.YYYY'), filterDate: moment().subtract(3, 'days').format('YYYY-MM-DD') },
    { date: moment().subtract(4, 'days').format('DD.MM.YYYY'), filterDate: moment().subtract(4, 'days').format('YYYY-MM-DD') },
    { date: moment().subtract(5, 'days').format('DD.MM.YYYY'), filterDate: moment().subtract(5, 'days').format('YYYY-MM-DD') },
    { date: moment().subtract(6, 'days').format('DD.MM.YYYY'), filterDate: moment().subtract(6, 'days').format('YYYY-MM-DD') },
  ], [])

  const [checked, setCheckedReceiptIndex] = useState(0)
  const [currentReceipt, setCurrentReceipt] = useState([])
  const [receiptsHistory, setReceiptsHistory] = useState([])
  const [receiptsLoading, setLoadingStatus] = useState(true)

  const validateDate = (value, index, history) => {
    const newCurrent = history.filter((item) => item.time.substring(0, 10) === value.filterDate)

    setCheckedReceiptIndex(index)
    setCurrentReceipt(newCurrent.length === 0 ? [] : newCurrent)
  }

  const loadReceipts = async () => {
    try {
      setLoadingStatus(true)

      const serverReceipts = await axios.get(`${API_URL}/user/receipts/history/${token}`)

      const sorted = serverReceipts.data.month.data.sort((a, b) => moment(b.time) - moment(a.time)) 

      setReceiptsHistory(sorted)

      validateDate(days[0], 0, sorted)

      setLoadingStatus(false)
    } catch (e) {
      setLoadingStatus(false)
      // Alert.alert(e.code)
    }
  }

  useEffect(() => { loadReceipts() }, []);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '100%', }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', width: '32%', height: '100%', }}>
        <View style={{ alignItems: 'center', width: '100%', height: '90%', borderRightWidth: 1, borderRightColor: '#EEEEEE' }}>
          <ScrollView
            style={{ width: '100%', height: '100%',}}
            contentContainer={{ alignItems: 'center', paddingTop: 20, paddingBottom: 20, }}
            showsVerticalScrollIndicator={false}
          >
            {days.map((item, index) => (
              <TouchableOpacity onPress={() => validateDate(item, index, receiptsHistory)} activeOpacity={1}>
                <LinearGradient style={styles.sideListItem} start={{x: -1, y: -1}} end={{x: 1, y: 1}} colors={checked === index ? ['#FF7675', '#FD9C6C'] : ['#FFFFFF', '#FFFFFF']}>
                  <View style={styles.sideListItemInnerTop}>
                    <Text style={[styles.sideListText, { fontSize: 30, }, checked === index && { color: '#ffffff', fontFamily: 'futura_regular',  }]}>{item.date}</Text>
                    <Text style={[styles.sideListText, checked === index && { color: '#ffffff', fontFamily: 'futura_regular',  }]}></Text>
                  </View>
                  <View style={styles.sideListItemInnerBottom}>
                    <Text style={[styles.sideListText, checked === index && { color: '#ffffff', fontFamily: 'futura_regular', }]}>Чеків: {receiptsHistory.filter((elem) => elem.time.substring(0, 10) === item.filterDate).length}</Text>
                    <Text></Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={{ width: '68%', height: '100%', }}>
        <View style={{ alignItems: 'flex-start', flexDirection: 'row', width: '100%', marginTop: 50, paddingLeft: 40, borderBottomWidth: 1, borderBottomColor: '#EEEEEE', }}>
          <Text style={{ color: '#545454', fontSize: 35, fontFamily: 'futura_regular', marginBottom: 35, }}>ІСТОРІЯ</Text>
          <Text style={{ color: '#545454', fontSize: 25, fontFamily: 'futura_light', marginLeft: 50, marginTop: 5, }}>{currentReceipt && currentReceipt.reduce((a,b) => a + b.total, 0)} грн за {checked === 0 ? 'сьогодні' : days[checked].date}</Text>
        </View>
        {receiptsLoading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: '20%', }}>
            <Progress.Circle 
              endAngle={0.3} size={50} color={'#A7A7A7'} 
              borderWidth={2} indeterminate={true} 
            />
          </View>
        ) : (
          currentReceipt.length === 0 ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ color: '#545454', fontSize: 25, fontFamily: 'futura_light', marginLeft: 50, marginTop: 5, }}>Немає чеків за цю дату</Text>
            </View>
          ) : (
            <ScrollView contentContainerStyles={{ paddingBottom: 50, }} showsVerticalScrollIndicator={false}>
              {currentReceipt.map((item, index) => (
                <View style={styles.receiptsHistoryListItem} key={index}>
                  <View style={{ width: '33%', flexWrap: 'wrap', }}>
                    <Text style={[{ width: '70%', marginBottom: 10, }, styles.receiptHistoryHeading]}>Зміст:</Text>
                    {item.receipt.map((receiptItem, key) => (
                      <View style={{ width: '90%', marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={[{ width: '85%', }, styles.receiptHistoryCaption]}>{receiptItem.title}</Text>
                        <Text style={styles.receiptHistoryCaption}>x{receiptItem.quantity}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={{ width: '40%', paddingLeft: 30, }}>
                    <Text style={[styles.receiptHistoryHeading, { marginBottom: 40, }]}>Тип оплати:  <Text style={styles.receiptHistoryCaption}>{item.ptype === 'cash' ? 'Готівка' : 'Картка'}</Text></Text>
                    <Text style={styles.receiptHistoryHeading}>Час:  <Text style={styles.receiptHistoryCaption}>{moment(item.time).format('D MMMM | HH:mm')}</Text></Text>
                  </View>
                  <View style={{ width: '27%', paddingLeft: 30, }}>
                    <Text style={[styles.receiptHistoryHeading, { marginBottom: 40, }]}>Сума:  <Text style={styles.receiptHistoryCaption}>{item.total}₴</Text></Text>
                    <Text style={styles.receiptHistoryHeading}>Внесено: <Text style={styles.receiptHistoryCaption}>{item.input}₴</Text></Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          )
          
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  sideListItem: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 130,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  sideListItemInnerTop: {
    paddingTop: 30,
    paddingHorizontal: 0,
    height: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sideListItemInnerBottom: {
    paddingBottom: 30,
    paddingHorizontal: 0,
    height: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sideListText: {
    color: '#ABABAB',
    fontSize: 20,
    fontFamily: 'futura_light'
  },
  receiptsHistoryListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '92%',
    padding: 40,
    borderRadius: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: 'white',
  },
  receiptHistoryHeading: {
    color: '#00071F',
    fontSize: 22,
    fontFamily: 'futura_light',
  },
  receiptHistoryCaption: {
    color: '#787878',
    fontSize: 19,
    fontFamily: 'futura_light',
  },
})

export default ReceiptsHistoryList
