import React, { useState, useRef, useEffect, } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native'
import Carousel from 'react-native-snap-carousel';

import Heading from './components/Heading/Heading'
import History from './components/Pages/History/History'
import Devices from './components/Pages/Devices/Devices'
import Settings from './components/Pages/Settings/Settings'
import DeliveryFeed from './components/Pages/DeliveryFeed/DeliveryFeed'

import { deviceWidth, deviceHeight, } from '@dimensions'
import { GILROY_REGULAR, GILROY_MEDIUM, FUTURA_REGULAR, PROBA_REGULAR, PROBA_MEDIUM, PROBA_BOLD, } from '@fonts'

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

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '75%', height: 70, paddingHorizontal: '3%', backgroundColor: 'white' }}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {}}
          activeOpacity={1}
        >
          <View style={styles.accountIcon} />
          <Text style={styles.menuItemText}>

          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {}}
          activeOpacity={0.8}
        >
          <View style={styles.accountIcon} />
          <Text style={styles.menuItemText}>
            Назад до меню
          </Text>
        </TouchableOpacity>
      </View>

      {/* <Menu menuOpened={menuOpened} /> */}

      {/* <Carousel
        ref={carouselRef}
        data={[{}, {}, {}, {}, {}]}
        renderItem={({ index }) => {
          if (index == 0) return <History />

          // if (index == 2) return <Devices activeCategory={activeTab} />

          // if (index == 3) return <DeliveryFeed />

          if (index == 1) return <Settings navigation={navigation} />
        }}
        sliderWidth={deviceWidth}
        sliderHeight={deviceHeight * 0.93}
        itemWidth={deviceWidth}
        itemHeight={deviceHeight * 0.93}
        scrollEnabled={false}
        onSnapToItem={() => null}
        inactiveSlideScale={1}
        removeClippedSubviews={false}
      /> */}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    backgroundColor: '#F3F4F6'
  },
  menuItemText: {
    color: '#6D6D6D',
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
  },
})

export default ControlLayout
