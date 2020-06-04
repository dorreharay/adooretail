import React, { useRef, useEffect, } from 'react';
import { Text, View, } from 'react-native';
import { useSelector, } from 'react-redux';
import _ from 'lodash'
import styles from './styles'

import SharedToast from '@shared/SharedToast/SharedToast';
import RetailScreen from './components/RetailScreen/RetailScreen';

import { performPrinterScanAndConnect, } from '@printer'

function SalesLayout({ navigation, }) {
  const toastRef = useRef(null)

  const layout = useSelector(state => state.orders.layout)
  const settings = useSelector(state => state.user.currentAccount)

  useEffect(() => {
    if (settings && settings.printer_enabled) {
      performPrinterScanAndConnect()
    }
  }, [settings])

  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <RetailScreen
          toastRef={toastRef}
          layout={layout}
          navigation={navigation}
          setModalStatus={() => { }}
        />
      </View>

      <SharedToast ref={toastRef} />
    </View>
  )
}

export default SalesLayout