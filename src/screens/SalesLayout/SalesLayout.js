import React, { useRef, useState, useEffect, useMemo, } from 'react';
import { Text, View, Image, StyleSheet, Alert, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import Carousel from 'react-native-snap-carousel';
import Toast, {DURATION} from 'react-native-easy-toast';
let moment = require('moment-timezone');
moment.locale('uk');

import { API_URL } from '@api'
import { PROBA_REGULAR } from '@fonts'

import RetailScreen from './components/RetailScreen/RetailScreen';
import EndOfSessionModal from './components/EndOfSessionModal'

import { setProducts, setLayout, } from '../../../reducers/OrdersReducer'

function SalesLayout({ navigation }) {
  const toastRef = useRef(null)
  const [isVisible, setModalVisibility] = useState(false)
  const [refreshedProducts, setRefreshedProducts] = useState([])
  const products = useSelector(state => state.orders.products)
  const layout = useSelector(state => state.orders.layout)
  const token = useSelector(state => state.user.token)
  const currentSession = useSelector(state => state.user.currentSession)

  const dispatch = useDispatch()

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/user/products/${token}`)
      
      setRefreshedProducts(data.products)
    } catch (error) {
      toastRef.current.show("Помилка мережі", 1000);
    }
  }

  const updateLayout = (products, cardsPerRow) => {
    function chunkArray(myArray, chunk_size){
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
    if(refreshedProducts.length !== 0)
      updateLayout(refreshedProducts, layout)
  }, [refreshedProducts])

  useEffect(() => {
    navigation.addListener('didFocus', () => {
      loadProducts()
      validateSession()
    })

    return () => {}
  }, [token, currentSession, layout])

  const validateSession = () => {
    const sessionStartTime = moment(currentSession.startTime).tz('Europe/Kiev')
    const startOfDay = moment(Date.now()).tz('Europe/Kiev').startOf('day').format('YYYY-MM-DD HH:mm')
    const endOfDay = moment(Date.now()).tz('Europe/Kiev').endOf('day').format('YYYY-MM-DD HH:mm')

    const isValid = sessionStartTime.isBetween(startOfDay, endOfDay)

    if(!isValid) {
      setModalVisibility(true)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <RetailScreen loadProducts={loadProducts} />
        <EndOfSessionModal
          navigation={navigation}
          isVisible={isVisible}
          setModalVisibility={setModalVisibility}
        />
      </View>
      <Toast
        ref={toastRef}
        opacity={1}
        style={{ paddingHorizontal: 20, backgroundColor:'#00000066'}}
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