import React, { useRef, useState, useEffect, useMemo, } from 'react';
import { Text, View, Image, StyleSheet, Alert, Animated, Easing, TouchableOpacity, ScrollView, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import Toast, {DURATION} from 'react-native-easy-toast';
import Swiper from 'react-native-swiper'
let moment = require('moment-timezone');
moment.locale('uk');

import { API_URL } from '@api'
import { PROBA_REGULAR, PROBA_MEDIUM } from '@fonts'
import { currentSessionSelector } from '@selectors'

import RetailScreen from './components/RetailScreen/RetailScreen';
import EndOfSessionModal from './components/EndOfSessionModal'

import { currentAccountSelector } from '@selectors'
import { saveCurrentAccountIndex, saveCurrentAccountToken, setProducts } from '../../../reducers/UserReducer'
import { setLayout, } from '../../../reducers/OrdersReducer'

function SalesLayout({ navigation }) {
  const toastRef = useRef(null)
  const [isVisible, setModalVisibility] = useState(false)
  const [animatedScale] = useState(new Animated.Value(1))
  const [accountWrapperVisibile, setAccountWrapperVisibility] = useState(false)
  const layout = useSelector(state => state.orders.layout)
  const currentAccount = useSelector(currentAccountSelector)
  const products = currentAccount.products
  const token = useSelector(state => state.user.currentAccountToken)
  const currentSession = useSelector(currentSessionSelector)
  const accounts = useSelector(state => state.user.accounts)
  const { deviceHeight } = useSelector(state => state.temp.dimensions)

  const dispatch = useDispatch()



  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/user/products/${token}`)

      updateLayout(data.products, layout)
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

  useMemo(() => {
    updateLayout(products.flat(), layout)
  }, [layout])

  useEffect(() => {
    loadProducts()
  }, [token])  

  useEffect(() => {
    validateSession()
    navigation.addListener('didFocus', () => {
      validateSession()
    })

    return () => { }
  }, [layout])

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

  const closeChangeAccountOverview = (sessionId, token) => {
    animate()
    dispatch(saveCurrentAccountIndex(sessionId))
    dispatch(saveCurrentAccountToken(token))
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
        {accounts.map((account, index) => (
          <Animated.View style={[styles.slider, { height: deviceHeight, transform: [{ scale: animatedScale }] }]} key={index}>
            <View style={{ position: 'absolute', top: -60 }}>
              <Text style={styles.accountHeading}>{account.businessName}</Text>
            </View>
            <RetailScreen 
              loadProducts={loadProducts}
              navigation={navigation}
              openChangeAccountOverview={openChangeAccountOverview}
              account={account}
            />
            <EndOfSessionModal
              navigation={navigation}
              isVisible={isVisible}
              setModalVisibility={setModalVisibility}
            />
            {accountWrapperVisibile && (
              <TouchableOpacity
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                onPress={() => closeChangeAccountOverview(index, account.token)}
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
  }
})

export default SalesLayout