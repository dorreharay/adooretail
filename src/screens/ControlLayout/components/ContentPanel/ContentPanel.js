import React, { Fragment, useState, useEffect, useRef, Suspense, } from 'react'
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

  const [swiperVisible, makeSwiperVisible] = useState(false)

  useEffect(() => {
    makeSwiperVisible(true)
    if (carouselRef.current) {
      carouselRef.current.snapToItem(activeCategory)
    }
  }, [activeCategory])

  const _renderItem = ({ item, index }) => {
    return (
      <Fragment>
        {/* <View style={styles.heading}>
          <FastImage
            style={{ width: 30, height: 30, }}
            source={item.iconSource}
          />
          <Text style={styles.headingText}>{item.title}</Text>
        </View> */}
        {item.component}
      </Fragment>
    )
  }

  return (
    <View style={[styles.container, { width: deviceWidth * 0.8, }]}>
      <Header
        heading={<View />}
        navigation={navigation}
      />

      <Carousel
        ref={carouselRef}
        data={tabs}
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
