import React, { useRef, useState, useMemo, useEffect, Fragment, } from 'react';
import { Text, View, Animated, Easing, TouchableOpacity, Alert, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Toast, { DURATION } from 'react-native-easy-toast'
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper'
import _ from 'lodash'
import styles from './styles'

import { currentAccountSelector } from '@selectors'
import { saveCurrentAccountIndex, setProducts, } from '@reducers/UserReducer'
// import { setProducts, } from '@reducers/OrdersReducer'

import RetailScreen from './components/RetailScreen/RetailScreen';
import Pagination from './components/Pagination/Pagination'

import { deviceWidth, deviceHeight } from '@dimensions'
import { performPrinterScanAndConnect, } from '@printer'

function SalesLayout({ navigation, }) {
  const toastRef = useRef(null)
  const swiperRef = useRef(null)

  const dispatch = useDispatch()

  const layout = useSelector(state => state.orders.layout)
  const currentAccount = useSelector(state => state.user.currentAccount)
  const accounts = useSelector(state => state.user.accounts)
  const products = useSelector(state => state.user.products)

  const [animatedScale] = useState(new Animated.Value(1))
  const [accountWrapperVisibile, setAccountWrapperVisibility] = useState(false)

  useEffect(() => {
    if (currentAccount && currentAccount.settings && currentAccount.settings.printer_enabled) {
      performPrinterScanAndConnect()
    }
  }, [currentAccount])

  const animate = () => {
    Animated.parallel([
      Animated.timing(animatedScale, {
        toValue: animatedScale._value === 0.7 ? 1 : 0.7,
        duration: 100,
        easing: Easing.linear
      }),
    ]).start()
  }

  const openChangeAccountOverview = () => {
    animate()
    setAccountWrapperVisibility(true)
  }

  const closeChangeAccountOverview = (index, token) => {
    animate()

    dispatch(saveCurrentAccountIndex(index))

    setAccountWrapperVisibility(false)
  }

  const updateLayout = (products, cardsPerRow) => {
    products = products.sort((a, b) => b.sortIndex - a.sortIndex)

    function chunkArray(myArray, chunk_size) {
      var results = [];

      while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
      }

      return results;
    }

    const newProducts = chunkArray(products, cardsPerRow);

    dispatch(setProducts(newProducts))
  }

  const addAccount = () => {
    navigation.jumpTo('NoAccount')
  }

  useMemo(() => {
    if (products) {
      updateLayout(products.flat(), layout)
    }
  }, [layout])

  return (
    <View style={styles.container}>
      <View style={[styles.slider, { height: deviceHeight, }]}>
        {accountWrapperVisibile && (
          <Fragment>
            <View style={{ position: 'absolute', top: -60 }}>
              <Text style={styles.accountHeading}>{currentAccount.business_name}</Text>
            </View>
          </Fragment>
        )}

        <RetailScreen
          toastRef={toastRef}
          layout={layout}
          navigation={navigation}
          openChangeAccountOverview={openChangeAccountOverview}
          updateLayout={updateLayout}
          setModalStatus={() => { }}
        />

        {accountWrapperVisibile && (
          <TouchableOpacity
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            onPress={() => closeChangeAccountOverview(currentAccount, index, currentAccount.id)}
            activeOpacity={1}
          />
        )}
      </View>

      <Toast
        ref={toastRef}
        opacity={1}
        style={{ paddingHorizontal: 40, backgroundColor: '#00000088' }}
        position='bottom'
        positionValue={100}
        textStyle={styles.toastText}
        fadeInDuration={200}
        fadeOutDuration={800}
      />
    </View>
  )
}

export default SalesLayout