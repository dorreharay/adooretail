import React, { Fragment, useState, useEffect, useRef, } from 'react'
import { View, Text, TouchableOpacity, } from 'react-native'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import Carousel from 'react-native-snap-carousel';
import styles from './styles'

import Header from './Header'

function ContentPanel(props) {
  const { activeCategory, handleSlideIndex, tabs, navigation, } = props

  const carouselRef = useRef(null)

  const { deviceWidth, deviceHeight, } = useSelector(state => state.temp.dimensions)

  useEffect(() => {
    carouselRef.current.snapToItem(activeCategory)
  }, [activeCategory])

  const _renderItem = ({ item, index }) => {
    return (
      <Fragment>
        <View style={styles.heading} key={index}>
          <FastImage
            style={{ width: 32, height: 32, }}
            source={item.iconSource}
          />
          <Text style={styles.headingText}>{item.title}</Text>
        </View>

        {item.component}
      </Fragment>
    )
  }

  return (
    <View style={[styles.container, { width: deviceWidth * 0.8, }]}>
      <Header navigation={navigation} />

      <Carousel
        ref={carouselRef}
        data={[...tabs['Основні'], ...tabs['Налаштування']]}
        renderItem={_renderItem}
        sliderWidth={deviceWidth * 0.8}
        sliderHeight={deviceHeight * 0.93}
        itemWidth={deviceWidth * 0.8}
        itemHeight={deviceHeight * 0.93}
        vertical
        scrollEnabled={false}
        onSnapToItem={handleSlideIndex}
        inactiveSlideScale={1}
      />
    </View>
  )
}

export default ContentPanel
