import React, { useState, useRef, useEffect, useMemo, } from 'react';
import { View, Text, ScrollView, TouchableOpacity, processColor } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import _ from 'lodash'
import styles from './styles'

import { addProductQuantity } from '@reducers/TempReducer'

import { currentAccountSelector } from '@selectors'

import { deviceWidth, deviceHeight } from '@dimensions'

function Products(props) {
  const { searchTerm, paymentModalVisible, updateProductsLayout, } = props;

  const scrollView = useRef(null)

  const dispatch = useDispatch()

  const layout = useSelector(state => state.orders.layout)
  const currentAccount = useSelector(state => state.user.currentAccount)

  const products = currentAccount && currentAccount.products || null

  const [activeCategory, setActiveCategory] = useState(null)
  const [categoryVisible, setCategoryVisibility] = useState(null)
  const [searchResult, setSearchResult] = useState([])
  const [savedActiveCategoryPath, setSavedActiveCategoryPath] = useState({ index: 0, key: 0 })

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

    // scrollView.current.scrollTo({ x: 0, y: 0, animated: false, })

    const newItem = newActiveCategory[key]

    const withback = [{ title: 'back', }, ...newItem.variants]

    setSavedActiveCategoryPath({ index, key })

    updateLayout(withback, layout)
  }

  useEffect(() => {
    if (activeCategory && products) {
      console.log('savedActiveCategoryPath', savedActiveCategoryPath)

      const { index, key } = savedActiveCategoryPath

      changeActiveCategory(index, key)
    }
  }, [products])

  const resetCategory = () => {
    if (!products) return
    scrollView.current.scrollTo({ x: 0, y: 0, animated: false, })
    setCategoryVisibility(false)
    setActiveCategory(null)

    const flattened = products.flat()

    updateProductsLayout(flattened, layout)
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
    if (!activeCategory && products) {
      const flattened = products.flat()

      updateProductsLayout(flattened, layout)
    }
  }, [layout])

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

  const actualList = useMemo(() => {
    if (!products) return []

    return [searchResult.length > 0 ? searchResult : products][0]
  }, [searchResult, products])

  return (
    <View style={{ flex: 1, }}>
      <ScrollView
        ref={scrollView}
        style={[styles.container, { top: categoryVisible ? -4000 : 0 }]}
        contentContainerStyle={{ paddingBottom: 50, }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1, }}>
          {actualList.map((row, index) => (
            <View style={[styles.row,]} key={index}>
              {row && row.map((rowItem, key) => (
                <TouchableOpacity
                  style={[styles[`colsProduct${layout}`], { height: calculateColHeight(layout) }, key === 0 && { marginLeft: 0, }]}
                  onPress={() => changeActiveCategory(index, key)}
                  activeOpacity={1}
                  key={key}
                >
                  {rowItem.img_url !== '' ? (
                    <FastImage
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: 3, }}
                      source={{ uri: rowItem.img_url, priority: FastImage.priority.high, }}
                    />
                  ) : (
                      <LinearGradient
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: 3, }}
                        colors={[rowItem ? rowItem.placeholder_color : '#CCC', rowItem ? rowItem.placeholder_shadow : '#CCC']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                      />
                    )}

                  <View
                    style={[styles[`categoryTitle${layout}`], { bottom: -1, }]}
                    onPress={() => changeActiveCategory(index, key)}
                    activeOpacity={1} key={index}
                  >
                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles[`categoryTitleText${layout}`]}>{rowItem.title}</Text>
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
      </ScrollView>
      <ScrollView
        ref={scrollView}
        style={[styles.container, { top: categoryVisible ? 0 : -4000 }]}
        contentContainerStyle={{ paddingBottom: 150, }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1 }}>
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
                        activeOpacity={0.75}
                      >
                        {rowItem.color && rowItem.color !== '' ? (
                          <View style={[styles.variant, { backgroundColor: rowItem.color }]}>

                            <FastImage
                              style={{ position: 'absolute', top: 0, width: '100%', height: '80%', opacity: 1, borderRadius: 3, }}
                              source={{ uri: rowItem.img_url || '', priority: FastImage.priority.high, }}
                            />

                            {(!rowItem.img_url || rowItem.img_url === '') && rowItem.size ? (
                              <View style={styles[`variantPrice${layout}`]}>
                                <Text style={styles[`variantPriceText${layout}`]}>{rowItem.size}</Text>
                              </View>
                            ) : null}

                            {((rowItem.img_url && rowItem.img_url !== '') && rowItem.size) ? (
                              <View style={[styles[`variantSize${layout}`], { backgroundColor: rowItem.color }]}>
                                <Text style={[styles[`categoryTitleText${layout}`], { color: '#FFFFFF' }]}>{rowItem.size}</Text>
                              </View>
                            ) : null}
                          </View>
                        ) : (<View />)}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles[`categoryTitle${layout}`], { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', bottom: -1, }]}
                        onPress={() => dispatch(addProductQuantity(rowItem))}
                        activeOpacity={1}
                        key={index}
                      >
                        <Text
                          style={[styles[`categoryTitleText${layout}`], { maxWidth: '70%', }]}
                          numberOfLines={2}
                          ellipsizeMode='tail'
                        >
                          {rowItem.title}
                        </Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: layout === 3 ? 65 : 35, }}>
                          <Text style={styles[`categoryTitleText${layout}`]}>{rowItem.price}₴</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default Products
