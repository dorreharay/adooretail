import React, { useRef, useState, useEffect, useMemo, } from 'react';
import { Text, View, Image, StyleSheet, Alert, Animated, Easing, TouchableOpacity, ScrollView, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import Toast, {DURATION} from 'react-native-easy-toast';
import Swiper from 'react-native-swiper'
let moment = require('moment-timezone');
moment.locale('uk');

import { API_URL } from '@api'
import { PROBA_REGULAR } from '@fonts'
import { currentSessionSelector } from '@selectors'

import RetailScreen from './components/RetailScreen/RetailScreen';
import EndOfSessionModal from './components/EndOfSessionModal'

import { setProducts, setLayout, } from '../../../reducers/OrdersReducer'

function SalesLayout({ navigation }) {
  const toastRef = useRef(null)
  const [isVisible, setModalVisibility] = useState(false)
  const [refreshedProducts, setRefreshedProducts] = useState([])
  const [animatedScale] = useState(new Animated.Value(1))
  const [accountWrapperVisibile, setAccountWrapperVisibility] = useState(false)
  const products = useSelector(state => state.orders.products)
  const layout = useSelector(state => state.orders.layout)
  const currentAccount = useSelector(state => state.user.currentAccount)
  const currentSession = useSelector(currentSessionSelector)
  const accounts = useSelector(state => state.user.accounts)
  const { deviceHeight } = useSelector(state => state.temp.dimensions)

  const dispatch = useDispatch()

  const loadProducts = async () => {
    const { token } = currentAccount

    try {
      const { data } = await axios.get(`${API_URL}/user/products/${token}`)

      setRefreshedProducts(data.products)
    } catch (error) {
      toastRef.current.show("Помилка мережі", 1000);
    }
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

  const animateIn = () => {
    Animated.parallel([
      Animated.timing(topAnimated, {
        toValue: 100,
        duration: 500
      }),
      Animated.timing(leftAnimated, {
        toValue: 100,
        duration: 500
      }),
      Animated.timing(widthAnimated, {
        toValue: deviceWidth - 200,
        duration: 500
      }),
      Animated.timing(heightAnimated, {
        toValue: deviceHeight - 200,
        duration: 500
      })
    ]).start()
  }

  const animateOut = () => {
    Animated.parallel([
      Animated.timing(topAnimated, {
        toValue: 0,
        duration: 500
      }),
      Animated.timing(leftAnimated, {
        toValue: 0,
        duration: 500
      }),
      Animated.timing(widthAnimated, {
        toValue: deviceWidth,
        duration: 500
      }),
      Animated.timing(heightAnimated, {
        toValue: deviceHeight,
        duration: 500
      })
    ]).start()
  }

  useEffect(() => {
    setTimeout(() => {
      animateIn()
      setTimeout(() => animateOut(), 2000)
    }, 2000)
  }, [])

  useMemo(() => {
    updateLayout(products.flat(), layout)
  }, [layout])

  useEffect(() => {
    if (refreshedProducts.length !== 0)
      updateLayout(refreshedProducts, layout)
  }, [refreshedProducts])

  useEffect(() => {
    validateSession()
    loadProducts()
    navigation.addListener('didFocus', () => {
      loadProducts()
      validateSession()
    })

    return () => { }
  }, [currentAccount.token, layout])

  const validateSession = () => {
    const sessionStartTime = moment(currentSession.startTime).tz('Europe/Kiev')
    const startOfDay = moment(Date.now()).tz('Europe/Kiev').startOf('day').format('YYYY-MM-DD HH:mm')
    const endOfDay = moment(Date.now()).tz('Europe/Kiev').endOf('day').format('YYYY-MM-DD HH:mm')

    const isValid = sessionStartTime.isBetween(startOfDay, endOfDay)

    if (!isValid) {
      setModalVisibility(true)
    }
  }

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

  const closeChangeAccountOverview = () => {
    animate()
    setAccountWrapperVisibility(false)
  }

  return (
    <View style={styles.container}>
      <Swiper 
        style={styles.wrapper}
        showsButtons={accountWrapperVisibile}
        showsPagination={false}
        bounces={false} loop={false}
        removeClippedSubviews={false}
        scrollEnabled={accountWrapperVisibile}
      >
        {accounts.map(account => (
          <Animated.View style={[styles.slider, { height: deviceHeight, transform: [{ scale: animatedScale }] }]}>
            <RetailScreen loadProducts={loadProducts} navigation={navigation} openChangeAccountOverview={openChangeAccountOverview} />
            <EndOfSessionModal
              navigation={navigation}
              isVisible={isVisible}
              setModalVisibility={setModalVisibility}
            />
            {accountWrapperVisibile && (
              <TouchableOpacity
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                onPress={closeChangeAccountOverview}
                activeOpacity={1}
              />
            )}
          </Animated.View>
        ))}
      </Swiper>
      <Toast
        ref={toastRef}
        opacity={1}
        style={{ paddingHorizontal: 20, backgroundColor: '#00000066' }}
        position='bottom'
        positionValue={50}
        textStyle={{
          marginBottom: 2,
          color: '#FFFFFF',
          fontSize: 17,
          fontFamily: PROBA_REGULAR,
        }}
        fadeInDuration={600}
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
    zIndex: 1000,
  },
  goBack: {
    position: 'absolute',
    right: 40,
    top: 40,
    width: 50,
    height: 50,
  }
})

export default SalesLayout