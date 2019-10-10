import React, { useRef, useState, useEffect, } from 'react'
import { Text, View, Image, StyleSheet, Alert, TouchableOpacity, } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import moment from 'moment/min/moment-with-locales';
import LinearGradient from 'react-native-linear-gradient'
moment.locale('uk');
import styles from './styles'

import { deviceWidth, deviceHeight, } from '@dimensions'
import SharedButton from '../../../../../../components/SharedButton';
import { setActiveSlide } from '../../../../../../../reducers/OrdersReducer'
import Receipt from './components/Receipt';
import { ScrollView } from 'react-native-gesture-handler';

const headerHeight = 68

const headerButtonSizes = { width: headerHeight, height: headerHeight, }
const headerIcon = { width: headerHeight - 50, height: headerHeight - 50, }

function LeftSide(props) {
  const { sliderRef } = props;

  const receiptsRef = useRef(null)

  const dispatch = useDispatch()

  const activeSlide = useSelector(state => state.orders.activeSlide)
  const receipts = useSelector(state => state.orders.receipts)

  const [entries] = useState([{}, {}, {}, {}])

  const [leftSideWidth, setLeftSideWidth] = useState(10)
  const [currentTime, setCurrentTime] = useState(moment(Date.now()).format('dddd DD.MM | HH:mm').charAt(0).toUpperCase() + moment(Date.now()).format('dddd DD.MM | HH:mm').slice(1))

  const validateTime = (leftSideWidth) => {
    const fullDate = moment(Date.now()).format('dddd DD.MM | HH:mm')
    const shortDate = moment(Date.now()).format('DD.MM | HH:mm')

    if(leftSideWidth > 400 )
      setCurrentTime(fullDate.charAt(0).toUpperCase() + fullDate.slice(1))
    else
      setCurrentTime(shortDate)
  }

  function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    validateTime(leftSideWidth)
  }, 5 * 1000)

  const startTimer = (e) => {
    const leftSideWidth = e.nativeEvent.layout.width

    setLeftSideWidth(leftSideWidth)

    validateTime(leftSideWidth)
  }

  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1, }}>
        {entries.map((item, key) => (
          index === key && (
            <Receipt
              receipt={receipts[activeSlide]}
            />
          )
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={[styles.header, { height: headerHeight, }]}
        onLayout={(e) => startTimer(e)}
      >
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <SharedButton
            buttonSizes={headerButtonSizes}
            iconSizes={{ width: headerIcon.width + 1, height: headerIcon.height + 1, }}
            source={require('@images/clock.png')}
          />
          <Text style={styles.connectionText}>{currentTime}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <SharedButton
            buttonSizes={headerButtonSizes}
            iconSizes={headerIcon}
            source={require('@images/split_orders.png')}
          />
          <SharedButton
            buttonSizes={headerButtonSizes}
            iconSizes={{ width: headerIcon.width - 3, height: headerIcon.height - 3, }}
            source={require('@images/x_icon.png')}
          />
        </View>
      </View>
      <ScrollView style={styles.receipts}>
        <Receipt
          receipt={receipts[activeSlide]}
        />
      </ScrollView>
      <SharedButton forceStyles={[styles.proceedContainer]} buttonSizes={{ width: '100%', }} duration={200}>
        <LinearGradient start={{x: -1, y: -1}} end={{x: 1, y: 1}} colors={['#FF7675', '#FD9C6C']} style={[styles.lsproceedButton, false &&   { opacity: 0.6 }]} >
          <Text style={{ color: 'white', fontFamily: 'futura_regular', fontSize: 22, letterSpacing: 0.7, }}>ОПЛАТА 0₴ </Text>
        </LinearGradient>
      </SharedButton>
    </View>
  )
}

export default LeftSide