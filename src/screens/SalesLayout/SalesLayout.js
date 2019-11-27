import React, { useRef, useState, useEffect, useMemo, } from 'react';
import { Text, View, Image, StyleSheet, Alert, Animated, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import Toast, { DURATION } from 'react-native-easy-toast';
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
  const products = useSelector(state => state.orders.products)
  const layout = useSelector(state => state.orders.layout)
  const currentAccount = useSelector(state => state.user.currentAccount)
  const currentSession = useSelector(currentSessionSelector)
  const { deviceWidth, deviceHeight } = useSelector(state => state.temp.dimensions)

  const [isVisible, setModalVisibility] = useState(false)
  const [refreshedProducts, setRefreshedProducts] = useState([])
  const [topAnimated] = useState(new Animated.Value(0))
  const [leftAnimated] = useState(new Animated.Value(0))
  const [widthAnimated] = useState(new Animated.Value(deviceWidth))
  const [heightAnimated] = useState(new Animated.Value(deviceHeight))

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

  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <Animated.View style={{ position: 'absolute', top: topAnimated, left: leftAnimated, width: widthAnimated, height: heightAnimated, }}>
          <RetailScreen loadProducts={loadProducts} navigation={navigation} />
          <EndOfSessionModal
            navigation={navigation}
            isVisible={isVisible}
            setModalVisibility={setModalVisibility}
          />
        </Animated.View>
      </View>
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
    flex: 1,
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