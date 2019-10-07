import React, { useRef, useState, useEffect, } from 'react'
import { Text, View, Image, StyleSheet, Alert, } from 'react-native'
import moment from 'moment/min/moment-with-locales';
moment.locale('uk');
import styles from './styles'

import SharedButton from '../../../../../../components/SharedButton';

const headerHeight = 68

const headerButtonSizes = { width: headerHeight, height: headerHeight, }
const headerIcon = { width: headerHeight - 50, height: headerHeight - 50, }

function LeftSide(props) {
  const { sliderRef } = props;

  const [leftSideWidth, setLeftSideWidth] = useState(0)
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
          {/* <View style={{ paddingLeft: 25, flexDirection: 'row', alignItems: 'center', height: headerHeight }}>
            <Image style={{ width: 10, height: 10, marginRight: 5, }} source={require('@images/stutus_online.png')}></Image>
            
          </View> */}
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
    </View>
  )
}

export default LeftSide