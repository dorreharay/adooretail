import React, { useState, useRef, useEffect, } from 'react';
import { View, Text, ScrollView, TouchableOpacity, } from 'react-native';
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import _ from 'lodash'
import styles from './styles'

import SharedButton from '../../../../../../../components/SharedButton'

function Products(props) {
  const { receipts, setReceipts } = props;

  const layout = useSelector(state => state.orders.layout)
  const products = useSelector(state => state.orders.products)

  const scrollView = useRef(null)
  const [activeCategory, setActiveCategory] = useState(null)
  const [categoryVisible, setCategoryVisibility] = useState(null)
  const [longPress, setLongPress] = useState(null)
  const [prevQuantity, setPrevQuantity] = useState(0)

  const addProductQuantity = (product) => (force) => {
    const productExists = !!receipts.find(item => item.title === product.title)

    let newReceipts = []

    if(productExists) {
      newReceipts = receipts.map((item, index) => {
        if(item.title === product.title) {
          setPrevQuantity(item.quantity)

          console.log('---->', item.quantity)
          console.log('----<', prevQuantity)

          return ({ ...item, quantity: item.quantity + 1 })
        }

        return item
      })
    } else {
      newReceipts = [...receipts, { ...product, quantity: 1, }]
    }

    setReceipts(newReceipts)
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

  useEffect(() => {
    if(activeCategory) {
      const flattened = activeCategory.flat()
      
      updateLayout(flattened, layout)
    }
  }, [layout])

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
                    <SharedButton
                      onPress={(force) => addProductQuantity(rowItem)(force)}
                      forceStyles={[styles[`colsProduct${layout}`], key === 0 && { marginLeft: 0, }]}
                      buttonSizes={{ flex: 1, width: '100%', }}
                      scale={0.9} onStart
                    >
                      <LinearGradient colors={[rowItem.color, rowItem.shadow]} style={styles.variant}>
                        <View style={styles.variantPrice}>
                          <Text style={styles.variantPriceText}>{rowItem.price}₴</Text>
                        </View>
                        <Text style={styles[`variantText${layout}`]}>{rowItem.title}</Text>
                      </LinearGradient>
                    </SharedButton>
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
