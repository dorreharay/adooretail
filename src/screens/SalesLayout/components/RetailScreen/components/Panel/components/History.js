import React, { useState, useRef, } from 'react'
import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Collapsible from 'react-native-collapsible';
import styles from './styles'
import FastImage from 'react-native-fast-image';

function History() {
  const [days, setDays] = useState([
    { date: 'Сьогодні 02.11.19', total: '2034', receipts: [{}, {}, {}, {}] },
    { date: 'Вівторок 03.11.19', total: '2034', receipts: [{}, {}, {}, {}, {}, {}, {}, {}] },
    { date: 'Середа 04.11.19', total: '2034', receipts: [{}, {}, {}, {},] },
    { date: 'Четвер 05.11.19', total: '2034', receipts: [{}, {}, {}, {}, {}, {}, {}, {},] },
    { date: 'Пятниця 06.11.19', total: '2034', receipts: [{}, {}, {}, {}] },
    { date: 'Субота 07.11.19', total: '2034', receipts: [{}, {}, {}, {}, {}, {}, {}, {}] },
  ])

  const [selectedReceipt, selectReceipt] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState(false)

  const receiptsListRef = useRef(null)

  const changeReceipt = (index) => {
    selectReceipt(index)
    setExpandedIndex(false)
    receiptsListRef.current.scrollTo(0)
  }

  const expandReceipt = (index) => {
    if (expandedIndex !== index) {
      receiptsListRef.current.scrollTo(86 * (index))
    }

    setExpandedIndex(expandedIndex === index ? false : index)
  }

  return (
    <View style={styles.receiptsHistoryContainer}>
      <ScrollView
        style={styles.daysList}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity activeOpacity={1}>
          {days.map((day, index) => (
            <LinearGradient
              style={[styles.historyDay, index === 0 && {  borderTopWidth: 1, borderTopColor: '#F0F0F0', }]}
              start={{ x: -1, y: -1 }}
              end={{ x: 1, y: 1 }}
              colors={selectedReceipt === index ? ['#FF7675', '#FD9C6C'] : ['#FFFFFF00', '#FFFFFF00']}
            >
              <TouchableOpacity
                style={{ width: '100%', height: 140, }}
                onPress={() => changeReceipt(index)}
                activeOpacity={1} key={index}
              >
                <Text style={[styles.historyDayHeadingText, selectedReceipt === index && styles.headingSelected]}>
                  {day.date}
                </Text>
                <Text style={[styles.historyDayCaptionText, selectedReceipt === index && styles.captionSelected]}>
                  {day.total} грн всього
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          ))}
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.receiptsList}>
        <ScrollView ref={receiptsListRef} style={{ flex: 1, }} contentContainerStyle={{ paddingBottom: 500, }}>
          <View style={{ flex: 1, }} activeOpacity={1}>
            {days[selectedReceipt].receipts.map((day, index) => (
              <>
                <TouchableOpacity
                  style={[styles.receiptsListItem, index === 0 && {  borderTopWidth: 1, borderTopColor: '#F0F0F0', }]}
                  onPress={() => expandReceipt(index)}
                  activeOpacity={1}
                >
                  <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', }}>
                    <View style={styles.receiptsListItemBlock}>
                      {/* <Text style={styles.receiptsListItemBlockTextMain}>Час:</Text> */}
                      <Text style={styles.receiptsListItemBlockTextSecondary}>15:31 </Text>
                    </View>
                    <View style={styles.receiptsListItemBlock}>
                      <Text style={styles.receiptsListItemBlockTextMain}></Text>
                      <Text style={styles.receiptsListItemBlockTextSecondary}>Тип оплати: Картка </Text>
                    </View>
                    <View style={styles.receiptsListItemBlock}>
                      <Text style={styles.receiptsListItemBlockTextMain}></Text>
                      <Text style={styles.receiptsListItemBlockTextSecondary}>Всього: 75 грн </Text>
                    </View>
                    <View style={styles.receiptsListItemBlock}>
                      <Text style={styles.receiptsListItemBlockTextMain}></Text>
                      <Text style={styles.receiptsListItemBlockTextSecondary}>Товарів у чеку: 4 шт</Text>
                    </View>
                    {/* <Fa stImage style={{ width: 7, height: 14, transform: [{ rotate: expandedIndex === index ? '40deg' : '270deg' }] }} source={require('@images/back_thin.png')} /> */}
                  </View>
                  {/* <View style={{ width: '100%', flexDirection: 'row',  }}>
                  <FastImage style={{ width: 10, height: 20, transform: [{ rotate: '270deg' }] }} source={require('@images/back_thin.png')} />
                </View> */}
                </TouchableOpacity>
                <Collapsible collapsed={expandedIndex !== index} key={index}>
                  <View style={styles.receiptDetails}>
                    <View style={styles.receiptDetailsBlock}>
                      <Text style={[styles.receiptDetailsBlockText1, styles.detailsHeading]}>Назва</Text>
                      <Text style={[styles.receiptDetailsBlockText2, styles.detailsHeading]}>К-сть</Text>
                      <Text style={[styles.receiptDetailsBlockText3, styles.detailsHeading]}>Всього</Text>
                    </View>
                    <View style={styles.receiptDetailsBlock}>
                      <Text style={styles.receiptDetailsBlockText1}>Еспресо 250мл</Text>
                      <Text style={styles.receiptDetailsBlockText2}>х14</Text>
                      <Text style={styles.receiptDetailsBlockText3}>120 грн</Text>
                    </View>
                    <View style={styles.receiptDetailsBlock}>
                      <Text style={styles.receiptDetailsBlockText1}>Еспресо 250мл</Text>
                      <Text style={styles.receiptDetailsBlockText2}>х14</Text>
                      <Text style={styles.receiptDetailsBlockText3}>120 грн</Text>
                    </View>
                    <View style={styles.receiptDetailsBlock}>
                      <Text style={styles.receiptDetailsBlockText1}>Еспресо 250мл</Text>
                      <Text style={styles.receiptDetailsBlockText2}>х14</Text>
                      <Text style={styles.receiptDetailsBlockText3}>120 грн</Text>
                    </View>
                    <View style={styles.receiptDetailsBlock}>
                      <Text style={styles.receiptDetailsBlockText1}>Еспресо 250мл</Text>
                      <Text style={styles.receiptDetailsBlockText2}>х14</Text>
                      <Text style={styles.receiptDetailsBlockText3}>120 грн</Text>
                    </View>
                  </View>
                </Collapsible>
              </>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default History
