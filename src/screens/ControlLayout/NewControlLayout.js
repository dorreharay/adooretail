import React, { useState, useRef, useEffect, } from 'react'
import { View, Text, StyleSheet, } from 'react-native'
import Carousel from 'react-native-snap-carousel';

import Heading from './components/Heading/Heading'
import History from './components/ContentPanel/Pages/History/History'
import Transactions from './components/ContentPanel/Pages/Transactions/Transactions'
import Devices from './components/ContentPanel/Pages/Devices/Devices'
import Settings from './components/ContentPanel/Pages/Settings/Settings'
// import History from './components/ContentPanel/Pages/History/History'

import { deviceWidth, deviceHeight, } from '@dimensions'

function NewControlLayout(props) {
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

          if (index == 1) return <Transactions />

          if (index == 2) return <Devices activeCategory={activeTab} />

          // if (index == 3) return <History />

          if (index == 4) return <Settings />
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

export default NewControlLayout
