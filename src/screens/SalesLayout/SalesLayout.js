import React, { useRef, useState, useEffect, useMemo, Fragment, } from 'react';
import { Text, View, Image, StyleSheet, Alert, Animated, Easing, TouchableOpacity, ScrollView, } from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import Toast, { DURATION } from 'react-native-easy-toast';
import Swiper from 'react-native-swiper'
import _ from 'lodash'
let moment = require('moment-timezone');
moment.locale('uk');

import { PROBA_REGULAR, PROBA_MEDIUM } from '@fonts'

import RetailScreen from './components/RetailScreen/RetailScreen';

import { currentAccountSelector, currentSessionSelector } from '@selectors'
import { saveCurrentAccountIndex, saveCurrentAccountToken, setProducts } from '@reducers/UserReducer'
import Pagination from './components/Pagination'
import FastImage from 'react-native-fast-image';

function SalesLayout({ navigation, }) {
  const toastRef = useRef(null)
  const throttleRef = useRef(_.debounce((callback) => callback(), 1000, { 'trailing': false }))

  const [animatedScale] = useState(new Animated.Value(1))
  const [accountWrapperVisibile, setAccountWrapperVisibility] = useState(false)
  const layout = useSelector(state => state.orders.layout)
  const currentAccount = useSelector(currentAccountSelector)
  const products = currentAccount.products
  const accounts = useSelector(state => state.user.accounts)
  const { deviceHeight } = useSelector(state => state.temp.dimensions)

  const dispatch = useDispatch()

  const swiperRef = useRef(null)

  const updateLayout = (products, cardsPerRow) => {
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

  useMemo(() => {
    updateLayout(products.flat(), layout)
  }, [layout])

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

  const closeChangeAccountOverview = (account, index, token) => {
    animate()

    dispatch(saveCurrentAccountIndex(index))
    dispatch(saveCurrentAccountToken(token))

    setAccountWrapperVisibility(false)
  }

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        style={styles.wrapper}
        showsButtons={accountWrapperVisibile}
        bounces={false} loop={false}
        removeClippedSubviews={false}
        scrollEnabled={accountWrapperVisibile}
        buttonWrapperStyle={{ paddingHorizontal: 0, paddingVertical: 0, }}
        showsButtons={false}
        renderPagination={(index, total) => {
          return (
            <Pagination
              swiperRef={swiperRef}
              accountWrapperVisibile={accountWrapperVisibile}
              total={total}
              index={index}
            />
          )
        }}
      >
        {accounts.map((account, index) => (
          <Fragment key={index}>
            <Animated.View style={[styles.slider, { height: deviceHeight, transform: [{ scale: animatedScale }] }]}>
              {accountWrapperVisibile && (
                <Fragment>
                  <View style={{ position: 'absolute', top: -60 }}>
                    <Text style={styles.accountHeading}>{account.businessName}</Text>
                  </View>
                </Fragment>
              )}

              <RetailScreen
                toastRef={toastRef}
                updateLayout={updateLayout}
                layout={layout}
                navigation={navigation}
                openChangeAccountOverview={openChangeAccountOverview}
                account={account} updateLayout={updateLayout}
                toastRef={toastRef} setModalStatus={() => {}}
              />

              {accountWrapperVisibile && (
                <TouchableOpacity
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  onPress={() => closeChangeAccountOverview(account, index, account.token)}
                  activeOpacity={1}
                />
              )}
            </Animated.View>
          </Fragment>
        ))}
      </Swiper>
      <Toast
        ref={toastRef}
        opacity={1}
        style={{ paddingHorizontal: 40, backgroundColor: '#00000088' }}
        position='bottom'
        positionValue={100}
        textStyle={{
          marginBottom: 2,
          color: '#FFFFFF',
          fontSize: 17,
          fontFamily: PROBA_REGULAR,
        }}
        fadeInDuration={200}
        fadeOutDuration={800}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    borderRadius: 50,
    zIndex: 1000,
  },
  goBack: {
    position: 'absolute',
    right: 40,
    top: 40,
    width: 50,
    height: 50,
  },
  accountHeading: {
    color: '#FFFFFF',
    fontSize: 30,
    fontFamily: PROBA_MEDIUM,
  },
})

export default SalesLayout