import React, { Fragment } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity, } from 'react-native';

import { deviceWidth } from '@dimensions'
import { PROBA_LIGHT, PROBA_REGULAR } from '@fonts'

import SharedButton from '../../../../../../../components/SharedButton'

function PanelScreens({ token, panelStates, slideTo }) {
  // const { receiptsHistoryVisible, incasationsVisible, devicesVisible, profileVisible, } = panelStates;

  return (
    <Fragment>
      <View style={{ flex: 1, backgroundColor: '#F4F4F4'  }}>
        <Image style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, }} source={require('@images/panel-background.png')}></Image>
        <View style={{ alignItems: 'flex-end', justifyContent: 'center', height: 30, position: 'absolute', top: 30, right: 100, }}>
          <Text style={{ color: '#FFFFFF', fontSize: 17, fontFamily: PROBA_REGULAR, }}>Понеділок, 28 листопада</Text>
        </View>
        <SharedButton
          onPress={() => setTimeout(() => slideTo('prev'), 250)}
          buttonSizes={{ ...styles.goBack, width: 50, height: 50, }}
          iconSizes={{ width: 18, height: 18, }}
          source={require('@images/x_icon.png')}
          backgroundColor='#FFFFFF' borderRadius={50}
        />
        <View style={styles.panelContainer}>
          <View style={styles.panelItem1}>
            <View style={styles.panelItem11}></View>
            <View style={styles.panelItem12}></View>
          </View>
          <View style={styles.panelItem2}>
            <View style={styles.panelItem21}></View>
            <View style={styles.panelItem22}></View>
            <View style={styles.panelItem23}></View>
          </View>
        </View>
        {/* <SharedButton
          forceStyles={styles.endSessionButton}
          buttonSizes={{ width: '100%', height: '100%', backgroundColor: 'yellow' }}
          text={'ЗАКІНЧИТИ ЗМІНУ'}
        >
          <View style={{ width: '100%', height: '100%', justifyContent: 'center', }}>
            <Text style={{ color: '#E80505', fontSize: 18, fontFamily: PROBA_LIGHT, }}>ЗАКІНЧИТИ ЗМІНУ</Text>
          </View>
        </SharedButton> */}
      </View>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  panelContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 90,
    right: 20,
    width: '85%',
    height: '70%',
    // borderWidth: 1,
  },
  panelItem1: {
    width: '48%',
    height: '80%',
    borderRadius: 20,
  },
  panelItem11: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  panelItem12: {
    alignSelf: 'flex-end',
    width: '60%',
    height: '22.5%',
    marginTop: deviceWidth * 0.008,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  panelItem2: {
    width: '51%',
    marginLeft: deviceWidth * 0.008,
  },
  panelItem21: {
    width: '100%',
    height: '35%',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  panelItem22: {
    width: '55%',
    height: '43%',
    marginTop: deviceWidth * 0.008,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  panelItem23: {
    width: '30%',
    height: '18%',
    marginTop: deviceWidth * 0.008,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  goBack: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 50,
    height: 50,
  },
  endSessionButton: {
    // position: 'absolute',
    // bottom: 30,
    // right: 30,
    height: 30,
    padding: 25,
    paddingHorizontal: 30,
    borderRadius: 10,
    zIndex: 101,
    // backgroundColor: '#FFFFFF',
  }
})

export default PanelScreens
