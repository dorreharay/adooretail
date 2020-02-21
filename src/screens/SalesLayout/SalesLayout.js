import React, { useRef, useState, useMemo, Fragment, } from 'react';
import { Text, View, Animated, Easing, TouchableOpacity, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Toast, { DURATION } from 'react-native-easy-toast'
import Swiper from 'react-native-swiper'
import styles from './styles'

import { currentAccountSelector } from '@selectors'
import { saveCurrentAccountIndex, saveCurrentAccountToken, setProducts } from '@reducers/UserReducer'

import RetailScreen from './components/RetailScreen/RetailScreen';
import Pagination from './components/Pagination/Pagination'

import { deviceWidth, deviceHeight } from '@dimensions'

function SalesLayout({ navigation, }) {
  const toastRef = useRef(null)
  const swiperRef = useRef(null)

  const dispatch = useDispatch()

  const layout = useSelector(state => state.orders.layout)
  const currentAccount = useSelector(currentAccountSelector)
  const products = currentAccount.products
  const accounts = useSelector(state => state.user.accounts)

  const [animatedScale] = useState(new Animated.Value(1))
  const [accountWrapperVisibile, setAccountWrapperVisibility] = useState(false)

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
    if (products) {
      updateLayout(products.flat(), layout)
    }
  }, [layout])

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
                    <Text style={styles.accountHeading}>{account.business_name}</Text>
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
                toastRef={toastRef} setModalStatus={() => { }}
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
        textStyle={styles.toastText}
        fadeInDuration={200}
        fadeOutDuration={800}
      />
    </View>
  )
}

export default SalesLayout