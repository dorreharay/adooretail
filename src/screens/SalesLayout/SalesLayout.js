import React, { useRef, useState, useEffect, useMemo, Fragment, } from 'react';
import { Text, View, Image, StyleSheet, Alert, Animated, Easing, TouchableOpacity, ScrollView, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Toast, { DURATION } from 'react-native-easy-toast';
import Swiper from 'react-native-swiper'
let moment = require('moment-timezone');
moment.locale('uk');

import { PROBA_REGULAR, PROBA_MEDIUM } from '@fonts'
import { currentAccountSessionSelector } from '@selectors'

import RetailScreen from './components/RetailScreen/RetailScreen';
import SessionModal from './components/SessionModal/SessionModal'

import { currentAccountSelector, currentSessionSelector } from '@selectors'
import { saveCurrentAccountIndex, saveCurrentAccountToken, setProducts } from '../../../reducers/UserReducer'
import Pagination from './components/Pagination'
import FastImage from 'react-native-fast-image';

function SalesLayout({ navigation, }) {
  const toastRef = useRef(null)
  const [animatedScale] = useState(new Animated.Value(1))
  const [isVisible, setModalStatus] = useState(false)
  const [accountWrapperVisibile, setAccountWrapperVisibility] = useState(false)
  const [invalidSessions, setInvalidSessions] = useState([false, false])
  const layout = useSelector(state => state.orders.layout)
  const currentAccountToken = useSelector(state => state.user.currentAccountToken)
  const currentAccount = useSelector(currentAccountSelector)
  const products = currentAccount.products
  const currentSession = useSelector(currentSessionSelector)
  const accounts = useSelector(state => state.user.accounts)
  const { deviceHeight } = useSelector(state => state.temp.dimensions)

  const dispatch = useDispatch()

  const swiperRef = useRef(null)

  useEffect(() => {
    const isValid = validateSession(currentAccount.localSessions)

    setModalStatus(!isValid)
  }, [currentAccountToken])

  const validateSession = (sessions) => {
    if (sessions.length === 0) return false

    const currentAccountSession = sessions[sessions.length - 1]

    const sessionStartTime = moment(currentAccountSession.startTime).tz('Europe/Kiev')
    const startOfDay = moment().tz('Europe/Kiev').startOf('day').format('YYYY-MM-DD HH:mm')
    const endOfDay = moment().tz('Europe/Kiev').endOf('day').format('YYYY-MM-DD HH:mm')

    const isValid = sessionStartTime.isBetween(startOfDay, endOfDay)

    return isValid
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
                  <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', position: 'absolute', top: -60, right: 0 }}>
                    <FastImage
                      style={{ width: 25, height: 25, marginRight: 15, }}
                      source={require('@images/delete_icon.png')}
                    />
                    <Text style={[styles.accountHeading, { color: '#FF7675' }]}>Видалити</Text>
                  </TouchableOpacity>
                </Fragment>
              )}

              <RetailScreen
                toastRef={toastRef}
                updateLayout={updateLayout}
                layout={layout}
                navigation={navigation}
                openChangeAccountOverview={openChangeAccountOverview}
                account={account} updateLayout={updateLayout}
                toastRef={toastRef}
              />
              <SessionModal
                navigation={navigation}
                isVisible={isVisible}
                index={index}
                noSessionCreated={currentAccount.localSessions.length === 0}
                openChangeAccountOverview={openChangeAccountOverview}
                setModalStatus={setModalStatus}
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