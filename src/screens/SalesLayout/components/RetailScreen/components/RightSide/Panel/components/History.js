import React, { useState, } from 'react'
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

  return (
    <View style={styles.receiptsHistoryContainer}>
      <ScrollView
        style={styles.daysList}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity activeOpacity={1}>
          {days.map((day, index) => (
            <LinearGradient
              style={styles.historyDay}
              start={{ x: -1, y: -1 }}
              end={{ x: 1, y: 1 }}
              colors={selectedReceipt === index ? ['#FF7675', '#FD9C6C'] : ['#FFFFFF00', '#FFFFFF00']}
            >
              <TouchableOpacity
                style={{ width: '100%', height: 140, }}
                onPress={() => selectReceipt(index)}
                activeOpacity={1} key={index}
              >
                <Text style={[styles.historyDayHeadingText, selectedReceipt === index && styles.headingSelected]}>
                  {day.date}
                </Text>
                <Text style={[styles.historyDayCaptionText, selectedReceipt === index && styles.captionSelected]}>
                  {day.total} грн
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          ))}
        </TouchableOpacity>
      </ScrollView>
      <ScrollView style={styles.receiptsList}>
        <View style={{ flex: 1, }} activeOpacity={1}>
          {days[selectedReceipt].receipts.map((day, index) => (
            <>
              <TouchableOpacity
                style={styles.receiptsListItem}
                onPress={() => setExpandedIndex(expandedIndex === index ? false : index)}
                activeOpacity={1}
              >
                <View style={{ width: '100%', flexDirection: 'row' }}>
                  <View style={styles.receiptsListItemBlock}>
                    <Text style={styles.receiptsListItemBlockTextMain}>Час:</Text>
                    <Text style={styles.receiptsListItemBlockTextSecondary}>15:31 </Text>
                  </View>
                  <View style={styles.receiptsListItemBlock}>
                    <Text style={styles.receiptsListItemBlockTextMain}>Сума:</Text>
                    <Text style={styles.receiptsListItemBlockTextSecondary}>75 грн </Text>
                  </View>
                  <View style={styles.receiptsListItemBlock}>
                    <Text style={styles.receiptsListItemBlockTextMain}>К-сть товарів у чеку:</Text>
                    <Text style={styles.receiptsListItemBlockTextSecondary}>4 шт</Text>
                  </View>
                  <FastImage style={{ width: 10, height: 20, transform: [{ rotate: '270deg' }] }} source={require('@images/back_thin.png')} />
                </View>
                {/* <View style={{ width: '100%', flexDirection: 'row',  }}>
                  <FastImage style={{ width: 10, height: 20, transform: [{ rotate: '270deg' }] }} source={require('@images/back_thin.png')} />
                </View> */}
              </TouchableOpacity>
              <Collapsible collapsed={expandedIndex !== index} key={index}>
                <View style={{ width: '100%', height: 400, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', }}></View>
              </Collapsible>
            </>
          ))}
        </View>
      </ScrollView>

    </View>
  )
}

export default History
