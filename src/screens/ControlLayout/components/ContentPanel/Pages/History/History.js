import React, { useState, Fragment, } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Animated, Easing, } from 'react-native'
import FastImage from 'react-native-fast-image'
import styles from './styles'
import Collapsible from 'react-native-collapsible'

function History(props) {
  const [days, setDays] = useState([
    {
      date: 'Вівторок 21.02.19',
      total: 2341,
      receipts: [{}, {}, {}],
      employees: [
        'Андрій', 'Ігор', 'Ростік',
      ]
    },
    {
      date: 'Середа 22.02.19',
      total: 2341,
      receipts: [{}, {}, {}],
      employees: [
        'Андрій', 'Ігор', 'Ростік',
      ]
    },
    {
      date: 'Четвер 23.02.19',
      total: 2341,
      receipts: [{}, {}, {}],
      employees: [
        'Андрій', 'Ігор', 'Ростік',
      ]
    },
    {
      date: "П'ятниця 24.02.19",
      total: 2341,
      receipts: [{}, {}, {}],
      employees: [
        'Андрій', 'Ігор', 'Ростік',
      ]
    },
    {
      date: 'Субота 25.02.19',
      total: 2341,
      receipts: [{}, {}, {}],
      employees: [
        'Андрій', 'Ігор', 'Ростік',
      ]
    },
    {
      date: 'Неділя 26.02.19',
      total: 2341,
      receipts: [{}, {}, {}],
      employees: [
        'Андрій', 'Ігор', 'Ростік',
      ]
    },
    {
      date: 'Вівторок 21.02.19',
      total: 2341,
      receipts: [{}, {}, {}],
      employees: [
        'Андрій', 'Ігор', 'Ростік',
      ]
    },
    {
      date: 'Середа 22.02.19',
      total: 2341,
      receipts: [{}, {}, {}],
      employees: [
        'Андрій', 'Ігор', 'Ростік',
      ]
    },
    {
      date: 'Четвер 23.02.19',
      total: 2341,
      receipts: [{}, {}, {}],
      employees: [
        'Андрій', 'Ігор', 'Ростік',
      ]
    },
    {
      date: "П'ятниця 24.02.19",
      total: 2341,
      receipts: [{}, {}, {}],
      employees: [
        'Андрій', 'Ігор', 'Ростік',
      ]
    },
    {
      date: 'Субота 25.02.19',
      total: 2341,
      receipts: [{}, {}, {}],
      employees: [
        'Андрій', 'Ігор', 'Ростік',
      ]
    },
    {
      date: 'Неділя 26.02.19',
      total: 2341,
      receipts: [{}, {}, {}],
      employees: [
        'Андрій', 'Ігор', 'Ростік',
      ]
    },
  ])
  const [expandedIndexes, setExpandedIndexes] = useState([])
  const [spinValue] = useState(new Animated.Value(1))

  const handleExpand = (index) => {
    if (expandedIndexes.includes(index)) {
      const newExpandedIndexes = expandedIndexes.filter(item => item !== index)

      Animated.timing(
        spinValue,
        {
          toValue: 0,
          duration: 300,
          easing: Easing.ease,
        }
      ).start()

      setExpandedIndexes(newExpandedIndexes)
    } else {
      Animated.timing(
        spinValue,
        {
          toValue: 0.5,
          duration: 300,
          easing: Easing.ease,
        }
      ).start()

      setExpandedIndexes([...expandedIndexes, index])
    }
  }

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  const AnimatedImage = Animated.createAnimatedComponent(FastImage)

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 70, }}>
      {days.map((day, index) => (
        <Fragment key={index}>
          <TouchableOpacity
            style={styles.dayHeader}
            onPress={() => handleExpand(index)}
            activeOpacity={1}
          >
            <FastImage
              style={{ width: 20, height: 20, marginRight: 20, }}
              source={require('@images/session_process.png')}
            />
            <Text style={styles.dayHeaderDate}>{day.date}</Text>
            <Text style={styles.dayHeaderTotal}>Всього за зміну: {day.total}</Text>
            <Text style={styles.dayHeaderEmployees}>Працівників на зміні: {day.employees.length}</Text>
            <View style={styles.dayHeaderIcon}>
              <AnimatedImage
                style={[{ width: 15, height: 15 }, expandedIndexes.includes(index) && { transform: [{ rotate: spin }] }]}
                source={require('@images/down-arrow.png')}
              />
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={!expandedIndexes.includes(index)}>
            <View style={{ width: '100%', maxHeight: 600, paddingLeft: 40, paddingBottom: 50, backgroundColor: '#FFFFFF' }}>
              {/* <View style={styles.employeesContainer}>
                <View style={styles.employeeBlock}>
                  <View style={styles.employee}>
                    <FastImage
                      style={styles.employeeImage}
                      source={require('@images/background-adv1.png')}
                    />
                  </View>
                  <Text style={styles.employeeName}>Андрій - Бариста</Text>
                </View>
                <View style={styles.employeeBlock}>
                  <View style={styles.employee}>
                    <FastImage
                      style={styles.employeeImage}
                      source={require('@images/background-adv1.png')}
                    />
                  </View>
                  <Text style={styles.employeeName}>Андрій - Бариста</Text>
                </View>

                <Text style={styles.total}>
                  2303 грн всього
                </Text>
              </View> */}

              <ScrollView
                style={styles.historyInstanceContainer}
                contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
              >
                {[{}, {}, {}, {}, {}, {}, {}, {}, {}, {},].map((item, index) => (
                  <View style={styles.historyInstance}>
                    <Text style={styles.receiptTime}>12:31</Text>
                    <Text style={styles.receiptItem}>Лате 250 мл - 25 грн</Text>
                    <Text style={styles.receiptItem}>Еспресо 200 мл - 25 грн</Text>
                    {/* <Text style={styles.receiptItem}>Еспресо 250 мл - 25 грн</Text>  */}
                    <Text style={styles.receiptTotal}>Всього: 340 грн</Text>
                  </View>
                ))}

              </ScrollView>
            </View>
          </Collapsible>
        </Fragment>
      ))}
    </ScrollView>
  )
}

export default History
