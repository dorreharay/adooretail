import React, { useState, useEffect, useRef, } from "react";
import { View, Text, Image, TouchableOpacity, } from "react-native";
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import FastImage from "react-native-fast-image";
import styles from '../styles';

import { changeAccount } from '../../../../../reducers/UserReducer'

function ChooseAccount(props) {
  const {
    accounts, selectedAccount, selectAccount, 
    submitAccount, addAccount, currentAccount,
  } = props

  const dispatch = useDispatch()

  const selectTabletAccount = (item) => {
    if(_.isEmpty(item)) {
      addAccount()
      
      return
    }

    selectAccount(item)
  }

  const changeCurrentAccount = (account) => dispatch(changeAccount(account))

  return (
      <>
        <Text style={styles.loginHeading}>{_.isEmpty(currentAccount) ? 'Оберіть вільний аккаунт' : 'Зміна робочого аккаунту'}</Text>
        <Text style={styles.loginHeadingCaption}>Оберіть доступну клітинку</Text>

        <View style={styles.accountsContainer}>
          {accounts.map((item, index) => (
            <TouchableOpacity
              style={styles.account}
              onPress={() => selectTabletAccount(item)}
              activeOpacity={1} key={index}
            >
              <View style={[styles.accountItem, { borderWidth: 4, borderColor: (selectedAccount.id === item.id) ? '#E46162' : '#E4616200' }]}>
                <View style={[styles.accountItem,]}>
                  <View style={styles.accountItemContent}>
                    <Text style={styles.accountItemBusinessName}>{item.businessName}</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.imageContainer, !item.id && { backgroundColor: '#ACACAC1A' }]}>
                {item.id && <View style={styles.imageCover} />}
                {item.id ? (
                  <FastImage
                    style={{ flex: 1, borderRadius: 300, }}
                    source={{ uri: item.img_url }}
                  />
                ) : (
                  <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', }}>
                    <FastImage
                      style={{ width: 40, height: 40, }}
                      source={require('@images/plus_icon.png')}
                    />
                  </View>
                )}
              </View>
              
            </TouchableOpacity>
          ))}
        </View>
        
        {selectedAccount.id ? (
          <>
            <TouchableOpacity
              style={[styles.loginCaption, { width: 50, borderRadius: 50, backgroundColor: '#FFFFFF1A', }]}
              onPress={() => submitAccount(() => changeCurrentAccount(selectedAccount))}
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
