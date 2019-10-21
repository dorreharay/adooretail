import React, { Component, useState, useEffect, useRef, } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Easing, Alert, } from "react-native";
import axios from 'axios';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';
import DeviceInfo from 'react-native-device-info';
import Toast, {DURATION} from 'react-native-easy-toast'
import Svg, { Circle } from 'react-native-svg';
import styles from '../styles';

import { API_URL } from '../../../../../../config/api';

import LoginLoader from '../../../../../components/LoginLoader';
import SharedButton from '../../../../../components/SharedButton';

function ChooseAccount(props) {
  const { accounts, selectedAccount, selectAccount, submitAccount, } = props

  return (
      <>
        <Text style={styles.loginHeading}>Не знайдено доданих аккаунтів</Text>
        <Text style={styles.loginHeadingCaption}>Оберіть доступну клітинку</Text>

        <View style={styles.accountsContainer}>
          {accounts.map((item, index) => (
            <SharedButton
              forceStyles={styles.account}
              buttonSizes={[{ width: '100%', height: '100%', }]}
              onPress={() => selectAccount(item)}
              scale={0.9} duration={150}
            >
              <LinearGradient
                colors={(selectedAccount && selectedAccount.id === item.id) ? ['#FFFFFF1A', '#FF7E7659'] : ['#FFFFFF1A', '#FFFFFF1A']}
                style={styles.accountItem}
              >
                <View style={styles.accountItem}>

                </View>
              </LinearGradient>
            </SharedButton>
          ))}
        </View>
        
        {selectedAccount ? (
          <>
            <TouchableOpacity
              style={[styles.loginCaption, { width: 50, borderRadius: 50, backgroundColor: '#FFFFFF1A', }]}
              onPress={submitAccount}
              activeOpacity={1}
            >
              <Image style={{ width: 20, height: 16, }} source={require('@images/tick_light.png')}></Image>
            </TouchableOpacity>
          </>
          
        ) : (
          <TouchableOpacity
            style={styles.loginCaption}
            onPress={() => {}}
            activeOpacity={1}
          >
            
          </TouchableOpacity>
        )}
    </>
  )
}



export default ChooseAccount;
