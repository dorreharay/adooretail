import React, { useState, useRef, } from 'react'
import { View, Text, ScrollView, TouchableOpacity, } from 'react-native'
import FastImage from 'react-native-fast-image';
import Collapsible from 'react-native-collapsible'
import styles from '../styles'

import DatesList from './DatesList'
import SharedButton from '@shared/SharedButton'
import LinearGradient from 'react-native-linear-gradient';

function History({ selectedDate, handleNewDate, }) {
  const scrollRef = useRef(null)

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

  const [availableSortTypes] = useState([
    { main: 'Раніше', reverse: 'Пізніше', },
    { main: 'Сума чеку', reverse: 'Сума чеку', }
  ])

  const [activeSortIndex, setActiveSortIndex] = useState(0)
  const [individualSortingIndex, setIndividual] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState(0)

  const handleSortPick = (newIndex) => {
    setIndividual(individualSortingIndex === 0 ? 1 : 0)

    setActiveSortIndex(newIndex)
  }

  const handleExpand = (index) => {
    scrollRef.current.scrollTo({ x: 0, y: ((index) * 70) + (index * 14) })

    setExpandedIndex(expandedIndex === index ? false : index)
  }

  return (
    <View style={styles.receiptsHistoryContainer}>
      {!selectedDate ? (
        <DatesList
          days={days}
          handleNewDate={handleNewDate}
        />
      ) : (
          <View style={styles.receiptsHistoryContent}>
            <Collapsible collapsed={expandedIndex !== false}>
              <View style={styles.receiptsHistoryHeader}>
                <Text style={styles.sortingHeadingText}>Сортування:</Text>
                {availableSortTypes.map((sortType, index) => (
                  <SharedButton
                    onPress={() => handleSortPick(index)}
                    forceStyles={[styles.sortButton, activeSortIndex === index && { borderColor: '#FFFFFF', }]}
                    scale={0.95} duration={100}
                    key={index} onStart
                  >
                    <LinearGradient
                      style={styles.sortButtonGradient}
                      start={{ x: 2, y: 2 }}
                      end={{ x: 2, y: -1 }}
                      colors={activeSortIndex === index ? ['#DB3E69', '#EF9058'] : ['#DB3E6900', '#EF905800']}
                    >
                      <Text style={[styles.sortButtonText, activeSortIndex === index && { color: '#FFFFFF', }]}>
                        {activeSortIndex === index && individualSortingIndex === 0 ? sortType.main : sortType.reverse}
                      </Text>
                      <FastImage style={{ width: 15, height: 14, marginLeft: 10, }} source={require('@images/recent_arrow.png')} />
                    </LinearGradient>
                  </SharedButton>
                ))}
              </View>
            </Collapsible>
            <ScrollView
              ref={scrollRef}
              style={styles.receiptsList}
              contentContainerStyle={{ paddingBottom: 200, }}
              showsVerticalScrollIndicator={false}
            >
              <View style={{ flex: 1, }} activeOpacity={1}>
                {selectedDate.receipts.map((day, index) => (
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={() => handleExpand(index)}
                      style={styles.receiptsListItem}
                      activeOpacity={1}
                    >
                      <View style={styles.receiptsListItemBlock}>
                        <Text style={styles.receiptsListItemBlockTextMain}>Час:</Text>
                        <Text style={styles.receiptsListItemBlockTextSecondary}>15:31 </Text>
                      </View>
                      <View style={styles.receiptsListItemBlock}>
                        <Text style={styles.receiptsListItemBlockTextMain}>Тип оплати:</Text>
                        <Text style={styles.receiptsListItemBlockTextSecondary}>Картка </Text>
                      </View>
                      <View style={styles.receiptsListItemBlock}>
                        <Text style={styles.receiptsListItemBlockTextMain}>Сума:</Text>
                        <Text style={styles.receiptsListItemBlockTextSecondary}>75 грн </Text>
                      </View>
                      <View style={styles.receiptsListItemBlock}>
                        <Text style={styles.receiptsListItemBlockTextMain}>К-сть товарів у чеку:</Text>
                        <Text style={styles.receiptsListItemBlockTextSecondary}>4 шт</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleExpand(index)}
                      style={styles.receiptExpandIconContainer}
                      activeOpacity={1}
                    >
                      <FastImage style={{ width: 8, height: 18, transform: [{ rotate: expandedIndex === index ? '40deg' : '270deg' }] }} source={require('@images/back_thin.png')} />
                    </TouchableOpacity>
                    <Collapsible collapsed={expandedIndex !== index} key={index}>
                      <View style={{ width: '100%', height: 400, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', }}></View>
                    </Collapsible>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
    </View>
  )
}

export default History
