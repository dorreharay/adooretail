import React, { useEffect, useState, } from 'react'
import { View, Text, ScrollView, TouchableOpacity, } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import FastImage from 'react-native-fast-image';
import styles from './styles'

import { setSettings, } from '@reducers/UserReducer'

import SwitchWithTitle from './SwitchWithTitle/SwitchWithTitle';

const Settings = ({ navigation }) => {
  const dispatch = useDispatch()

  const settings = useSelector(state => state.user.settings)
  const { paired, found } = useSelector(state => state.temp.bluetoothDevices)

  const updateSettings = (key, newValue) => {
    dispatch(setSettings({
      [key]: newValue,
    }))
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingRight: 100, }} bounces={false}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={styles.settingCard}>
          <View style={styles.settingsTitleContainer}>
            <FastImage
              style={styles.settingsTitleIcon}
              source={require('@images/adjust.png')}
            />
            <Text style={styles.settingsTitle}>Активні цехи</Text>
          </View>

          <SwitchWithTitle
            title={'Каса'}
            type={'desk_enabled'}
            value={settings['desk_enabled']}
            updateSettings={updateSettings}
            disabled
          />
          <SwitchWithTitle
            title={'Кухня'}
            type={'kitchen_enabled'}
            value={settings['kitchen_enabled']}
            updateSettings={updateSettings}
          />

          <View style={[styles.bottomLine,]} />
        </View>

        <View style={styles.settingCard}>
          <View style={styles.settingsTitleContainer}>
            <FastImage
              style={styles.settingsTitleIcon}
              source={require('@images/money.png')}
            />
            <Text style={styles.settingsTitle}>Спосіб оплати</Text>
          </View>

          <SwitchWithTitle
            title={'Готівка'}
            type={'payment_type_cash'}
            value={settings['payment_type_cash']}
            updateSettings={updateSettings}
          />

          <View style={{ marginLeft: 10, marginTop: -10 }}>
            <SwitchWithTitle
              title={'Cтандарний спосіб оплати'}
              type={'payment_type_cash_default'}
              value={settings['payment_type_cash_default']}
              updateSettings={updateSettings}
              disabled={!settings['payment_type_cash']}
              unique relatives={['payment_type_debit_default']}
              subsetting
            />
          </View>

          <SwitchWithTitle
            title={'Картка'}
            type={'payment_type_debit'}
            value={settings['payment_type_debit']}
            updateSettings={updateSettings}
          />

          <View style={{ marginLeft: 10, marginTop: -10 }}>
            <SwitchWithTitle
              title={'Cтандарний спосіб оплати'}
              type={'payment_type_debit_default'}
              value={settings['payment_type_debit_default']}
              updateSettings={updateSettings}
              disabled={!settings['payment_type_debit']}
              unique
              relatives={['payment_type_cash_default']}
              subsetting
            />
          </View>

          <View style={[styles.bottomLine,]} />
        </View>
      </View>
    </ScrollView>
  )
}

export default Settings
