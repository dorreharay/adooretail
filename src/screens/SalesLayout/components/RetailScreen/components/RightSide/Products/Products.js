import React  from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, } from 'react-native';
import { useSelector, } from 'react-redux';
import _ from 'lodash'
import styles from './styles'

function Products() {
  const products = useSelector(state => state.orders.products)

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50, }}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={styles.products}>
        {products.map((row, index) => (
          <View style={styles.row}>
            {row.map((rowItem, key) => (
              <TouchableOpacity style={[styles.product, key === 0 && { marginLeft: 0, }]} activeOpacity={1}>
                <Image style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', }} source={{ uri: rowItem.img_url }} />
                <TouchableOpacity style={styles.categoryTitle} key={index} activeOpacity={1}>
                  <Text style={styles.categoryTitleText}>{rowItem.title.toUpperCase()}</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default Products
