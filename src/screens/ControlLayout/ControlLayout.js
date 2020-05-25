import React, { useState, useRef, useEffect, } from 'react'
import { View, Text, StyleSheet, } from 'react-native'
import Carousel from 'react-native-snap-carousel';

import Heading from './components/Heading/Heading'
import History from './components/Pages/History/History'
import Devices from './components/Pages/Devices/Devices'
import Settings from './components/Pages/Settings/Settings'
import DeliveryFeed from './components/Pages/DeliveryFeed/DeliveryFeed'

import { deviceWidth, deviceHeight, } from '@dimensions'

function ControlLayout(props) {
  const { navigation, route } = props

  const carouselRef = useRef(null)

  const [activeTab, setActiveTabIndex] = useState(0)

  const setActiveTab = (index, animated = true) => {
    if (carouselRef.current) {
      carouselRef.current.snapToItem(index, !!animated)
      setActiveTabIndex(index)
    }
  }

  useEffect(() => {
   if (route && carouselRef.current) {
     if (route.params) {
       setActiveTab(route.params.screen, false)
     }
   }
  }, [route, carouselRef.current])

  return (
    <View style={styles.container}>
      <Heading 
        navigation={navigation}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* <Menu menuOpened={menuOpened} /> */}

      <Carousel
        ref={carouselRef}
        data={[{}, {}, {}, {}, {}]}
        renderItem={({ index }) => {
          if (index == 0) return <History />

          if (index == 2) return <Devices activeCategory={activeTab} />

          if (index == 3) return <DeliveryFeed />

          if (index == 4) return <Settings navigation={navigation} />
        }}
        sliderWidth={deviceWidth}
        sliderHeight={deviceHeight * 0.93}
        itemWidth={deviceWidth}
        itemHeight={deviceHeight * 0.93}
        scrollEnabled={false}
        onSnapToItem={() => null}
        inactiveSlideScale={1}
        removeClippedSubviews={false}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#F1F1F1',
  },
})

export default ControlLayout
