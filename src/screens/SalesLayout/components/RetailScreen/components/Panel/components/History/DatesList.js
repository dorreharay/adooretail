import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, } from 'react-native'
import * as Progress from 'react-native-progress';
import styles from '../styles'

function DatesList({ days, handleNewDate, loading, }) {

  if (loading) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '88%', }}>
        <View style={{ width: 70, height: 70, }}>
          <Progress.Circle
            endAngle={0.3} size={70} color={'#000000'}
            borderWidth={1} indeterminate={true}
          />
        </View>
      </View>
    )
  }

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
              {day.total} грн всього
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  )
}

export default DatesList
