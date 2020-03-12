import React, { Fragment, useState, useEffect, useRef, Suspense, } from 'react'
import { View, Text, TouchableOpacity, } from 'react-native'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import Carousel from 'react-native-snap-carousel';
import styles from './styles'

import Header from './Header'
import History from './Pages/History/History'

import { deviceWidth, deviceHeight } from '@dimensions'

function ContentPanel(props) {
  const { activeCategory, handleSlideIndex, tabs, navigation, setLoadingStatus, } = props

  const carouselRef = useRef(null)

  const [swiperVisible, makeSwiperVisible] = useState(false)

  useEffect(() => {
    makeSwiperVisible(true)
    if (carouselRef.current) {
      carouselRef.current.snapToItem(activeCategory.index, activeCategory.animated)
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
        {index === 0 && (
          <History navigation={navigation} setLoadingStatus={setLoadingStatus} />
        )}

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
        removeClippedSubviews={false}
      />
    </View>
  )
}

export default ContentPanel
