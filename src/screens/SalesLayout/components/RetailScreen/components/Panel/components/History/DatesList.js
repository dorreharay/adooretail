import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Collapsible from 'react-native-collapsible';
import FastImage from 'react-native-fast-image';
import styles from '../styles'

function DatesList({ days, handleNewDate, }) {
  return (
    <ScrollView
      style={styles.daysList}
      contentContainerStyle={styles.daysListScrollContainer}
    >
      {days.map((day, index) => (
        <View
          style={styles.historyDay}
          colors={['#FFFFFF00', '#FFFFFF00']}
        >
          <TouchableOpacity
            style={{ width: '100%', }}
            onPress={() => handleNewDate(day)}
            activeOpacity={1} key={index}
          >
            <Text style={styles.historyDayHeadingText}>
              {day.date}
            </Text>
            <Text style={styles.historyDayCaptionText}>
              {day.total} грн
                </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  )
}

export default DatesList
