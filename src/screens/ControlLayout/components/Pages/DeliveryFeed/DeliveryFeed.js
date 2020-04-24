import React, { useState } from 'react'
import { View, Text, ScrollView, } from 'react-native'
import styles from './styles'

import { getFormattedDate } from '@dateFormatter'

function DeliveryFeed() {
  const [orders, setOrders] = useState([
    { id: 'FJDGJK-DFGFGJK-GJFF', time: '2020-03-17 22:08:25' },
    { id: 'FJDGJK-DFGFGJK-GJFF', time: '2020-03-17 22:08:25' },
    { id: 'FJDGJK-DFGFGJK-GJFF', time: '2020-03-17 22:08:25' },
    { id: 'FJDGJK-DFGFGJK-GJFF', time: '2020-03-17 22:08:25' }
  ])

  return (
    <View style={styles.container}>
      <View style={styles.emptySpace}></View>
      <ScrollView
        style={styles.content}
        horizontal
      >
        {orders.map((order, index) => (
          <View style={styles.deliveryItem} key={index}>
            <View style={styles.deliveryItemHeading}>
              <View style={{ height: '80%', justifyContent: 'center' }}>
                <Text
                  style={styles.orderId}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                >
                  Raketa
              </Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                <Text
                  style={styles.orderId}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                >
                  Order #{order.id}
                </Text>
                <Text
                  style={styles.orderTime}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                >
                  {getFormattedDate('dd DD.MM | HH:mm')}
                </Text>
              </View>

            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default DeliveryFeed
