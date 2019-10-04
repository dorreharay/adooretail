import React, { useRef, useState, useEffect, } from 'react'
import { Text, View, Image, StyleSheet, } from 'react-native'
import styles from './styles'
import SharedButton from '../../../../../../components/SharedButton';

const headerHeight = 70

const headerButtonSizes = { width: headerHeight, height: headerHeight, }
const headerIcon = { width: headerHeight - 50, height: headerHeight - 50, }

function LeftSide(props) {
  const { sliderRef } = props;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { height: headerHeight, }]}>
        <SharedButton
          buttonSizes={headerButtonSizes}
          iconSizes={headerIcon}
          source={require('../../../../../../../assets/images/clock.png')}
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