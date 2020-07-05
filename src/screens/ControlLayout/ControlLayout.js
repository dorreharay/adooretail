import React, { useState, useRef, useEffect, } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux';
import Carousel from 'react-native-snap-carousel';

import Heading from './components/Heading/Heading'
import History from './components/Pages/History/History'
import Devices from './components/Pages/Devices/Devices'
import EditReceipt from './components/Pages/EditReceipt/EditReceipt'
import Settings from './components/Pages/Settings/Settings'

import { loadReceipts, loadDetails, } from '@reducers/OrdersReducer'

import { deviceWidth, deviceHeight, } from '@dimensions'
import { GILROY_MEDIUM, } from '@fonts'

function ControlLayout(props) {
  const { navigation, route } = props

  const dispatch = useDispatch()

  const toastRef = useRef(null)
  const carouselRef = useRef(null)

  const settings = useSelector(state => state.user.settings)

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
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 70, paddingHorizontal: '2%', backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F2F2F2' }}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => { }}
            activeOpacity={1}
          >
            <View style={styles.accountIcon} />
            <Text style={styles.menuItemText}>

            </Text>
          </TouchableOpacity>
          <View style={styles.menuButton}>
            <View style={styles.accountIcon} />
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.jumpTo('SalesLayout')}
              activeOpacity={0.8}
            >
              <Text style={styles.menuItemText}>
                Назад до меню
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Carousel
          ref={carouselRef}
          data={[{}, {}, {}, {}, {}]}
          renderItem={({ index }) => {
            if (index == 0) return <History activeCategory={activeTab} loadReceipts={async () => {
              await dispatch(loadReceipts())
              await dispatch(loadDetails())
            }} toastRef={toastRef} />

            if (index == 1 && settings.printer_enabled) return <Devices activeCategory={activeTab} toastRef={toastRef} />

            if (index == 2 && settings.printer_enabled) return <EditReceipt navigation={navigation} />

            if (index == 3) return <Settings navigation={navigation} />
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
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: '100%',
  },
  menuItemText: {
    color: '#343434',
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
  },
})

export default ControlLayout
