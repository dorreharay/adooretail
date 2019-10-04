import React, { useRef, useState, useEffect, } from 'react'
import { Text, View, Image, StyleSheet, } from 'react-native'
import styles from './styles'
import SharedButton from '../../../../../../components/SharedButton';

const headerHeight = 68

const headerButtonSizes = { width: headerHeight, height: headerHeight, }
const headerIcon = { width: headerHeight - 50, height: headerHeight - 50, }

function LeftSide(props) {
  const { sliderRef } = props;

  const [loading, setLoadingStatus] = useState(false)

  const toggleLoading = () => {
    setLoadingStatus(true)

    setTimeout(() => setLoadingStatus(false), 3000)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { height: headerHeight, }]}>
        <SharedButton
          buttonSizes={headerButtonSizes}
          iconSizes={{ width: headerIcon.width + 1, height: headerIcon.height + 1, }}
          source={require('../../../../../../../assets/images/clock.png')}
          onPress={toggleLoading}
          loading={loading}
        />

        <View style={{ flexDirection: 'row' }}>
          <SharedButton
            buttonSizes={headerButtonSizes}
            iconSizes={headerIcon}
            source={require('../../../../../../../assets/images/split_orders.png')}
          />
          <SharedButton
            buttonSizes={headerButtonSizes}
            iconSizes={{ width: headerIcon.width - 2, height: headerIcon.height - 2, }}
            source={require('../../../../../../../assets/images/x_icon.png')}
          />
        </View>
      </View>
    </View>
  )
}

export default LeftSide