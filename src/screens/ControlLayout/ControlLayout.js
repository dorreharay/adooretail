import React, { useState, useRef, useEffect, } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux';
import Carousel from 'react-native-snap-carousel';

import Heading from './components/Heading/Heading'
import History from './components/Pages/History/History'
import Devices from './components/Pages/Devices/Devices'
import Settings from './components/Pages/Settings/Settings'

import { loadReceipts, loadDetails, } from '@reducers/OrdersReducer'

import { deviceWidth, deviceHeight, } from '@dimensions'
import { GILROY_MEDIUM, } from '@fonts'

function ControlLayout(props) {
  const { navigation, route } = props

  const dispatch = useDispatch()

  const toastRef = useRef(null)
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

  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch(loadReceipts())
      dispatch(loadDetails())
    })    
  }, [])

  return (
    <View style={styles.container}>
      <Heading
        navigation={navigation}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <View style={{ width: '75%', }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 70, paddingHorizontal: '5%', backgroundColor: 'white' }}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => { }}
            activeOpacity={1}
          >
            <View style={styles.accountIcon} />
            <Text style={styles.menuItemText}>

            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.jumpTo('SalesLayout')}
            activeOpacity={0.8}
          >
            <View style={styles.accountIcon} />
            <Text style={styles.menuItemText}>
              Назад до меню
            </Text>
          </TouchableOpacity>
        </View>
        <Carousel
          ref={carouselRef}
          data={[{}, {}, {}, {}, {}]}
          renderItem={({ index }) => {
            if (index == 0) return <History activeCategory={activeTab} loadReceipts={async () => {
              await dispatch(loadReceipts())
              await dispatch(loadDetails())
            }} toastRef={toastRef} />

            if (index == 1) return <Devices activeCategory={activeTab} toastRef={toastRef} />

            if (index == 2) return <Settings navigation={navigation} />
          }}
          vertical
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

      {/* <Menu menuOpened={menuOpened} /> */}
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
    color: '#343434',
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
  },
})

export default ControlLayout
