import React, { useState, useRef, useEffect, useMemo, } from 'react';
import { View, Text, ScrollView, TouchableOpacity, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import _ from 'lodash'
import styles from './styles'

import { addProductQuantity } from '@reducers/TempReducer'

import { deviceWidth } from '@dimensions'

function Products(props) {
  const { products, searchTerm, paymentModalVisible, } = props;

  const scrollView = useRef(null)

  const dispatch = useDispatch()

  const layout = useSelector(state => state.orders.layout)

  const [activeCategory, setActiveCategory] = useState(null)
  const [categoryVisible, setCategoryVisibility] = useState(null)
  const [searchResult, setSearchResult] = useState([])


  useMemo(() => {
    if (!paymentModalVisible) {
      setCategoryVisibility(false)
    }
  }, [paymentModalVisible])

  const updateLayout = (productsArg, cardsPerRow) => {
    function chunkArray(myArray, chunk_size) {
      var results = [];

      while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
      }

      return results;
    }

    const newProducts = chunkArray(productsArg, cardsPerRow);

    setActiveCategory(newProducts)
    setCategoryVisibility(true)

    return newProducts
  }

  const changeActiveCategory = (index, key) => {
    const newActiveCategory = searchResult.length > 0 ? searchResult[index] : products[index]

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

  const calculateColHeight = (appliedLayout) => {
    if (appliedLayout === 3) {
      return deviceWidth * 0.2
    }
    if (appliedLayout === 4) {
      return deviceWidth * 0.15
    }
    if (appliedLayout === 5) {
      return deviceWidth * 0.12
    }
  }

  useEffect(() => {
    if (activeCategory) {
      const flattened = activeCategory.flat()

      updateLayout(flattened, layout)
    }
  }, [layout])

  useEffect(() => {
    if (searchTerm.length > 0) {
      function returnBySearch(array) {
        return array.filter(elem => elem.title.toLowerCase().includes(searchTerm.toLowerCase()))
      }

      if (!products) return

      let newProducts = products
        .flat()
        .map(item => ({
          ...item,
          variants: returnBySearch(item.variants),
          matches: returnBySearch(item.variants).length,
        }))
        .filter(item => item.matches > 0)

      function chunkArray(myArray, chunk_size) {
        var results = [];

        while (myArray.length) {
          results.push(myArray.splice(0, chunk_size));
        }

        return results;
      }

      newProducts = chunkArray(newProducts, layout)

      setSearchResult(newProducts)
    } else {
      setSearchResult([])
    }
  }, [searchTerm, layout])

  return (
    <ScrollView
      ref={scrollView}
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50, }}
      showsVerticalScrollIndicator={false}
      bounces
    >
      <View style={{ backgroundColor: '#F4F4F4' }}>
        <View style={{ position: 'relative', top: !categoryVisible ? 0 : 4000, flex: 1, }}>
          {[searchResult.length > 0 ? searchResult : products][0].map((row, index) => (
            <View style={[styles.row,]} key={index}>
              {row && row.map((rowItem, key) => (
                <TouchableOpacity
                  style={[styles[`colsProduct${layout}`], { height: calculateColHeight(layout) }, key === 0 && { marginLeft: 0, }]}
                  onPress={() => changeActiveCategory(index, key)}
                  activeOpacity={1}
                  scale={0.95} key={key}
                >
                  <FastImage
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: 3, }}
                    source={{ uri: rowItem.img_url, priority: FastImage.priority.high, }}
                  />
                  <View
                    style={[styles[`categoryTitle${layout}`], { bottom: -1, }]}
                    onPress={() => changeActiveCategory(index, key)}
                    activeOpacity={1} key={index}
                  >
                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles[`categoryTitleText${layout}`]}>{rowItem.title.toUpperCase()}</Text>
                  </View>

                  {rowItem.matches && (
                    <View style={styles.matches}>
                      <Text style={styles.matchesText}>{rowItem.matches}</Text>
                    </View>
                  )}

                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>


        <View style={{ position: 'absolute', top: categoryVisible ? 0 : 4000, backgroundColor: '#F4F4F4', width: '100%', }}>
          {activeCategory && activeCategory.map((row, index) => (
            <View style={styles.row} key={index}>
              {row && row.map((rowItem, key) => (
                rowItem.title === 'back' ? (
                  <TouchableOpacity
                    style={[styles[`colsProduct${layout}`], { height: calculateColHeight(layout) }, { alignItems: 'center', justifyContent: 'center', }, { marginLeft: 0, backgroundColor: 'white' }]}
                    onPress={resetCategory}
                    activeOpacity={1}
                    key={key}
                  >
                    <FastImage
                      style={styles.backCategoryIcon}
                      source={require('@images/back_thin.png')}
                    />
                  </TouchableOpacity>
                ) : (
                    <View style={[styles[`colsProduct${layout}`], { height: calculateColHeight(layout) }, key === 0 && { marginLeft: 0, }]} key={key}>
                      <TouchableOpacity
                        onPress={() => dispatch(addProductQuantity(rowItem))}
                        style={{ flex: 1, }}
                        activeOpacity={0.85}
                      >
                        {rowItem.color && (
                          <LinearGradient
                            style={styles.variant}
                            colors={[rowItem.color, rowItem.shadow]}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                          >
                            <View style={styles.variantPrice}>
                              <Text style={styles.variantPriceText}>{rowItem.price}₴</Text>
                            </View>
                            <Text
                              numberOfLines={4}
                              textBreakStrategy='balanced'
                              ellipsizeMode='tail'
                              style={styles[`variantText${layout}`]}
                            // selectionColor='#FFFFFF'
                            >
                              {rowItem.title}
                            </Text>
                          </LinearGradient>
                        )}
                      </TouchableOpacity>
                    </View>
                  )
              ))}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default Products
