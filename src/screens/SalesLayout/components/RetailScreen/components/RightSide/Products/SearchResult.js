import React from 'react';
import { View, Text, ScrollView, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import _ from 'lodash'
import styles from './styles'

import { deviceWidth } from '@dimensions'

import SharedButton from '@shared/SharedButton';

function SearchResult(props) {
  const { searchTerm, searchResult, layout, addProductQuantity, itemHeight, } = props

  console.log(searchTerm.length)

  return (
    <ScrollView 
      style={[styles.searchResultContainer, { height: deviceWidth, top: searchTerm.length !== 0 ? 0 : -3000 }]}
    >
      {searchResult && searchResult.map((row, index) => (
        <View style={styles.row} key={index}>
          {row.map((rowItem, key) => (
            <View style={[styles[`colsProduct${layout}`], { height: itemHeight, }, key % 4 === 0 && { marginLeft: 0, }]}>
              <SharedButton
                onPress={(force) => addProductQuantity(rowItem)(force)}
                style={{ flex: 1, height: '100%', }}
                scale={0.95} onStart
              >
                <LinearGradient colors={[rowItem.color, rowItem.shadow]} style={styles.variant}>
                  <View style={styles.variantPrice}>
                    <Text style={styles.variantPriceText}>{rowItem.price}₴</Text>
                  </View>
                  <Text style={styles[`variantText${layout}`]}>{rowItem.title}</Text>
                </LinearGradient>
              </SharedButton>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  )
}

export default SearchResult
