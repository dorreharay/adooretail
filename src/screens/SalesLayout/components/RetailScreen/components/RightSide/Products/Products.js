import React, { useState, useRef, useMemo, } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import _ from 'lodash'
import styles from './styles'

import { setReceipts } from '../../../../../../../../reducers/OrdersReducer'

function Products() {
  const dispatch = useDispatch()
  const layout = useSelector(state => state.orders.layout)
  const products = useSelector(state => state.orders.products)
  const receipts = useSelector(state => state.orders.receipts)

  const scrollView = useRef(null)
  const [activeCategory, setActiveCategory] = useState(null)
  const [categoryVisible, setCategoryVisibility] = useState(null)

  const activeSlide = useSelector(state => state.orders.activeSlide)

  const addProductQuantity = (product) => {
    const newReceipts = receipts.map((item, key) => key === activeSlide ? ([...item, product]) : item)
    
    dispatch(setReceipts(newReceipts))
  }

  const updateLayout = (productsArg, cardsPerRow) => {
    function chunkArray(myArray, chunk_size){
      var results = [];
      
      while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
      }
      
      return results;
    }

    const newProducts = chunkArray(productsArg, cardsPerRow);

    setActiveCategory(newProducts)
    setCategoryVisibility(true)
  }

  const changeActiveCategory = (index, key) => {
    const newActiveCategory = products[index]

    scrollView.current.scrollTo({ x: 0, y: 0, animated: false, })

    const newItem = newActiveCategory[key]

    const withback = [{ title: 'back', }, ...newItem.variants]

    updateLayout(withback, layout)
  }

  const resetCategory = () => {
    scrollView.current.scrollTo({ x: 0, y: 0, animated: false, })
    setCategoryVisibility(false)
    setActiveCategory(null)
  }

  return (
    <ScrollView
      ref={scrollView}
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50, }}
      showsVerticalScrollIndicator={false}
      bounces
    >
      <View>
        {products.map((row, index) => (
          <View style={styles.row} key={index}>
            {row.map((rowItem, key) => (
              <TouchableOpacity
                style={[styles[`colsProduct${layout}`], key === 0 && { marginLeft: 0, }]}
                onPress={() => changeActiveCategory(index, key)}
                activeOpacity={1} key={key}
              >
                <FastImage
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: 3, }}
                  source={{ uri: rowItem.img_url, priority: FastImage.priority.high, }}
                />
                <TouchableOpacity style={styles[`categoryTitle${layout}`]} onPress={() => changeActiveCategory(index, key)} activeOpacity={1} key={index}>
                  <Text style={styles[`categoryTitleText${layout}`]}>{rowItem.title.toUpperCase()}</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        {categoryVisible && (
          <View style={{ position: 'absolute', top: 0, backgroundColor: '#F4F4F4', width: '100%', height: '100%', }}>
            {activeCategory.map((row, index) => (
              <View style={styles.row} key={index}>
                {row.map((rowItem, key) => (
                  rowItem.title === 'back' ? (
                    <TouchableOpacity
                      style={[styles[`colsProduct${layout}`], { alignItems: 'center', justifyContent: 'center', }, { marginLeft: 0, backgroundColor: 'white' }]}
                      onPress={resetCategory}
                      activeOpacity={1}
                      key={key}
                    >
                        <FastImage
                          style={{ width: 15, height: 30, }}
                          source={require('@images/back_thin.png')}
                        />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[styles[`colsProduct${layout}`], key === 0 && { marginLeft: 0, }]}
                      onPress={() => addProductQuantity(rowItem)}
                      activeOpacity={1}
                      key={key}
                    >
                      <LinearGradient colors={[rowItem.color, rowItem.shadow]} style={styles.variant}>
                        <View style={styles.variantPrice}>
                          <Text style={styles.variantPriceText}>{rowItem.price}₴</Text>
                        </View>
                        <Text style={styles[`variantText${layout}`]}>{rowItem.title}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )
                ))}
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  )
}

export default Products
