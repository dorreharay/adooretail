import React, { useState, useRef, useEffect, } from 'react';
import { View, Text, ScrollView, TouchableOpacity, } from 'react-native';
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import _ from 'lodash'
let moment = require('moment-timezone');
moment.locale('uk');
import styles from './styles'

import SharedButton from '@shared/SharedButton';
import SearchResult from './SearchResult'

function Products(props) {
  const { receipts, products, setReceipts, selectedInstance, searchTerm, addProductQuantity, } = props;

  const layout = useSelector(state => state.orders.layout)
  const { deviceWidth, deviceHeight } = useSelector(state => state.temp.dimensions)

  const scrollView = useRef(null)
  const debounce = useRef(_.debounce((callback) => callback(), 300))
  const [activeCategory, setActiveCategory] = useState(null)
  const [categoryVisible, setCategoryVisibility] = useState(null)
  const [availableVariants, setAvailableVariants] = useState([])
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    if (products.length !== 0) {
      const flattened = products.flat()

      const newAvailableVariants = flattened.map(item => item.variants)

      setAvailableVariants(newAvailableVariants)
    }
  }, [products])

  useEffect(() => {
    debounce.current(recalculateSearchResult)
  }, [searchTerm])

  const recalculateSearchResult = () => {
    const variantsNotEmpty = availableVariants.length !== 0
    const searchTermNotEmpty = searchTerm.length !== 0
    const productsNotEmpty = products.length !== 0

    if (variantsNotEmpty && searchTermNotEmpty) {
      if (!productsNotEmpty) {
        setSearchResult([])

        return
      }

      const flattened = products.flat()

      let withVariants = flattened.map(item => item.variants)
      withVariants = withVariants.flat()

      const newSearchResult = withVariants.filter(elem => elem.title.toLowerCase().includes(searchTerm.toLowerCase()))

      setSearchResult(newSearchResult)
    }
  }

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
    const newActiveCategory = products[index]

    scrollView.current.scrollTo({ x: 0, y: 0, animated: false, })

    const newItem = newActiveCategory[key]

    const withback = [{ title: 'back', }, ...newItem.variants]

    updateLayout(withback, layout)
  }

  useEffect(() => {
    if (activeCategory) {
      const flattened = activeCategory.flat()

      updateLayout(flattened, layout)
    }
  }, [layout])

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

  function guidGenerator() {
    let S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4());
  }

  return (
    <ScrollView
      ref={scrollView}
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50, }}
      showsVerticalScrollIndicator={false}
      bounces
    >
      <SearchResult
        searchTerm={searchTerm}
        searchResult={searchResult}
        layout={layout}
        addProductQuantity={addProductQuantity}
      />
      <View style={{ backgroundColor: '#F4F4F4' }}>
        {products.map((row, index) => (
          <View style={styles.row} key={index}>
            {row.map((rowItem, key) => (
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
                <View style={[styles[`categoryTitle${layout}`], { bottom: -1, }]} onPress={() => changeActiveCategory(index, key)} activeOpacity={1} key={index}>
                  <Text style={styles[`categoryTitleText${layout}`]}>{rowItem.title.toUpperCase()}</Text>
                </View>
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
                      style={[styles[`colsProduct${layout}`], { height: calculateColHeight(layout) }, { alignItems: 'center', justifyContent: 'center', }, { marginLeft: 0, backgroundColor: 'white' }]}
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
                        style={[styles[`colsProduct${layout}`], { height: calculateColHeight(layout) }, key === 0 && { marginLeft: 0, }]}
                        scale={0.95}
                        key={key}
                      >
                        <LinearGradient style={styles.variant} colors={[rowItem.color, rowItem.shadow]}>
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
