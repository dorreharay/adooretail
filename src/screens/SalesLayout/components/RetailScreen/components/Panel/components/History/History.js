import React, { useState, } from 'react'
import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, } from 'react-native'
import styles from '../styles'

import DatesList from './DatesList'

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

  return (
    <View style={styles.receiptsHistoryContainer}>
      {!selectedDate && (
        <DatesList
          days={days}
          handleNewDate={handleNewDate}
        />
      )}
    </View>
  )
}

export default History








  // < ScrollView style = { styles.receiptsList } >
  //   <View style={{ flex: 1, }} activeOpacity={1}>
  //     {days[selectedReceipt].receipts.map((day, index) => (
  //       <>
  //         <TouchableOpacity
  //           style={styles.receiptsListItem}
  //           onPress={() => setExpandedIndex(expandedIndex === index ? false : index)}
  //           activeOpacity={1}
  //         >
  //           <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', }}>
  //             <View style={styles.receiptsListItemBlock}>
  //               <Text style={styles.receiptsListItemBlockTextMain}>Час:</Text>
  //               <Text style={styles.receiptsListItemBlockTextSecondary}>15:31 </Text>
  //             </View>
  //             <View style={styles.receiptsListItemBlock}>
  //               <Text style={styles.receiptsListItemBlockTextMain}>Сума:</Text>
  //               <Text style={styles.receiptsListItemBlockTextSecondary}>75 грн </Text>
  //             </View>
  //             <View style={styles.receiptsListItemBlock}>
  //               <Text style={styles.receiptsListItemBlockTextMain}>К-сть товарів у чеку:</Text>
  //               <Text style={styles.receiptsListItemBlockTextSecondary}>4 шт</Text>
  //             </View>
  //             <FastImage style={{ width: 7, height: 14, transform: [{ rotate: expandedIndex === index ? '40deg' : '270deg' }] }} source={require('@images/back_thin.png')} />
  //           </View>
  //           {/* <View style={{ width: '100%', flexDirection: 'row',  }}>
  //                 <FastImage style={{ width: 10, height: 20, transform: [{ rotate: '270deg' }] }} source={require('@images/back_thin.png')} />
  //               </View> */}
  //         </TouchableOpacity>
  //         <Collapsible collapsed={expandedIndex !== index} key={index}>
  //           <View style={{ width: '100%', height: 400, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', }}></View>
  //         </Collapsible>
  //       </>
  //     ))}
  //   </View>
  // </ScrollView >