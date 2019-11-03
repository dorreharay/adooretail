import React, { useState, useRef, useEffect, } from 'react';
import { View, Text, ScrollView, TouchableOpacity, } from 'react-native';
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import _ from 'lodash'
import styles from './styles'

import SharedButton from '../../../../../../../components/SharedButton'

function SearchResult(props) {
  const { searchTerm, searchResult, layout, addProductQuantity, } = props 

  return (
    <View style={[styles.searchResultContainer, { zIndex: searchTerm.length !== 0 ? 3 : -1 }]}>
      {searchResult.map((rowItem, key) => (
        <SharedButton
          onPress={(force) => addProductQuantity(rowItem)(force)}
          forceStyles={[styles[`colsProduct${layout}`], key % 4 === 0 && { marginLeft: 0, }]}
          buttonSizes={{ flex: 1, width: '100%', }}
          scale={0.95} onStart
        >
          <LinearGradient colors={[rowItem.color, rowItem.shadow]} style={styles.variant}>
            <View style={styles.variantPrice}>
              <Text style={styles.variantPriceText}>{rowItem.price}₴</Text>
            </View>
            <Text style={styles[`variantText${layout}`]}>{rowItem.title}</Text>
          </LinearGradient>
        </SharedButton>
      ))}
    </View>
  )
}

export default SearchResult
