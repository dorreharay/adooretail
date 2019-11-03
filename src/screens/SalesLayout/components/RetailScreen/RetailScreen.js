import React, { useRef, useState, useEffect, } from 'react'
import { Text, View, Image, StyleSheet, } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import styles from './styles'

import { deviceWidth, deviceHeight } from '../../../../../helpers/dimensions'

import LeftSide from './components/LeftSide/LeftSide';
import RightSide from './components/RightSide/RightSide';

function RetailScreen(props) {
  const { slideTo, products, loadProducts, } = props;

  const [receipts, setReceipts] = useState([[], [], [], []])
  const [selectedInstance, selectReceiptInstance] = useState(0)

  return (
    <View style={styles.container}>
      <LeftSide
        receipts={receipts}
        setReceipts={setReceipts}
        selectedInstance={selectedInstance}
        selectReceiptInstance={selectReceiptInstance}
      />
      <RightSide
        slideTo={slideTo}
        products={products}
        loadProducts={loadProducts}
        receipts={receipts}
        setReceipts={setReceipts}
        selectedInstance={selectedInstance}
      />
    </View>
  )
}

export default RetailScreen