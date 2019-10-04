import React, { useRef, useState, useEffect, } from 'react'
import { Text, View, Image, StyleSheet, } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import styles from './styles'

import { deviceWidth, deviceHeight } from '../../../../../helpers/dimensions'

import LeftSide from './components/LeftSide/LeftSide';
import RightSide from './components/RightSide/RightSide';

function RetailScreen(props) {
  const { sliderRef } = props;

  return (
    <View style={styles.container}>
      <LeftSide />
      <RightSide />
    </View>
  )
}

export default RetailScreen