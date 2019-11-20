import React, { useState, useEffect, useRef, } from 'react'
import { View, Text, ScrollView, TouchableOpacity, } from 'react-native'
import styles from '../styles'

import DatesList from './DatesList'
import ReceiptsList from './ReceiptsList';

function History({ selectedDate, handleNewDate, }) {
  const [days, setDays] = useState([
    { date: 'Сьогодні 02.11.19', total: '2034', receipts: [{}, {}, {}, {}] },
    { date: 'Вівторок 03.11.19', total: '2034', receipts: [{}, {}, {}, {}, {}, {}, {}, {}] },
    { date: 'Середа 04.11.19', total: '2034', receipts: [{}, {}, {}, {},] },
    { date: 'Четвер 05.11.19', total: '2034', receipts: [{}, {}, {}, {}, {}, {}, {}, {},] },
    { date: 'Пятниця 06.11.19', total: '2034', receipts: [{}, {}, {}, {}] },
    { date: 'Субота 07.11.19', total: '2034', receipts: [{}, {}, {}, {}, {}, {}, {}, {}] },
    { date: 'Понеділок 09.11.19', total: '2034', receipts: [{}, {}, {}, {}] },
    { date: 'Вівторок 10.11.19', total: '2034', receipts: [{}, {}, {}, {}, {}, {}, {}, {}] },
    { date: 'Середа 11.11.19', total: '2034', receipts: [{}, {}, {}, {},] },
    { date: 'Четвер 12.11.19', total: '2034', receipts: [{}, {}, {}, {}, {}, {}, {}, {},] },
    { date: 'Пятниця 13.11.19', total: '2034', receipts: [{}, {}, {}, {}] },
    { date: 'Субота 14.11.19', total: '2034', receipts: [{}, {}, {}, {}, {}, {}, {}, {}] },
    { date: 'Понеділок 16.11.19', total: '2034', receipts: [{}, {}, {}, {}] },
    { date: 'Вівторок 17.11.19', total: '2034', receipts: [{}, {}, {}, {}, {}, {}, {}, {}] },
    { date: 'Середа 18.11.19', total: '2034', receipts: [{}, {}, {}, {},] },
    { date: 'Четвер 19.11.19', total: '2034', receipts: [{}, {}, {}, {}, {}, {}, {}, {},] },
    { date: 'Пятниця 20.11.19', total: '2034', receipts: [{}, {}, {}, {}] },
    { date: 'Субота 21.11.19', total: '2034', receipts: [{}, {}, {}, {}, {}, {}, {}, {}] },
  ])
  const [daysLoading, setDaysLoadingStatus] = useState(false)

  const [availableSortTypes] = useState([
    { main: 'Раніше', reverse: 'Пізніше', },
    { main: 'Сума чеку', reverse: 'Сума чеку', }
  ])

  useEffect(() => {
    setDaysLoadingStatus(true)

    setTimeout(() => {
      setDaysLoadingStatus(false)
    }, 1000)
  }, [])


  return (
    <View style={styles.receiptsHistoryContainer}>
      {!selectedDate ? (
        <DatesList
          days={days}
          handleNewDate={handleNewDate}
          loading={daysLoading}
        />
      ) : (
          <ReceiptsList
            availableSortTypes={availableSortTypes}
            selectedDate={selectedDate}
          />
        )}
    </View>
  )
}

export default History
