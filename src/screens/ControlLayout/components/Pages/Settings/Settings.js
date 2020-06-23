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
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100, }} bounces={false}>
      {/* <View style={styles.settingHeading}>
        <Text style={styles.settingHeadingText}>Головне</Text>
      </View> */}
      <View style={styles.settingCategoryContainer}>
        <View style={styles.settingCard}>
          <FastImage
            style={{ width: 70, height: 70, marginBottom: 10, }}
            source={require('@images/ptype.png')}
          />
          <Text style={styles.settingHeadingText}>Способи оплати</Text>
          <View style={styles.devider}></View>
          <TouchableOpacity
            style={[styles.button, settings.payment_type_cash && styles.activeButton]}
            onPress={() => updateSettings('payment_type_cash', !settings.payment_type_cash)}
            activeOpacity={1}
          >
            <Text style={[styles.buttonText, settings.payment_type_cash && styles.activeButtonText]}>Готівка</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { marginTop: 10, }, settings.payment_type_debit && styles.activeButton]}
            onPress={() => updateSettings('payment_type_debit', !settings.payment_type_debit)}
            activeOpacity={1}
          >
            <Text style={[styles.buttonText, settings.payment_type_debit && styles.activeButtonText]}>Картка</Text>
          </TouchableOpacity>

          {(settings.payment_type_cash && settings.payment_type_debit) && (
            <>
              <View style={styles.devider}></View>

              <TouchableOpacity
                style={[styles.button, settings.payment_type_cash_default && styles.activeButton]}
                onPress={() => {
                  updateSettings('payment_type_cash_default', true)
                  updateSettings('payment_type_debit_default', false)
                }}
                activeOpacity={1}
              >
                <Text style={[styles.buttonText, settings.payment_type_cash_default && styles.activeButtonText]}>Готівка за замовч.</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { marginTop: 10, }, settings.payment_type_debit_default && styles.activeButton]}
                onPress={() => {
                  updateSettings('payment_type_debit_default', true)
                  updateSettings('payment_type_cash_default', false)
                }}
                activeOpacity={1}
              >
                <Text style={[styles.buttonText, settings.payment_type_debit_default && styles.activeButtonText]}>Картка за замовч.</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.settingCard}>
          <FastImage
            style={{ width: 70, height: 70, marginBottom: 10, }}
            source={require('@images/printt.png')}
          />
          <Text style={styles.settingHeadingText}>Друк</Text>
          <View style={styles.devider}></View>
          <TouchableOpacity
            style={[styles.button, settings.printer_enabled && [styles.activeButton, { backgroundColor: '#44CC62' }]]}
            onPress={() => updateSettings('printer_enabled', !settings.printer_enabled)}
            activeOpacity={1}
          >
            <Text style={[styles.buttonText, settings.printer_enabled && styles.activeButtonText]}>Викор. принтер</Text>
          </TouchableOpacity>

          {settings.printer_enabled && (
            <>
              <View style={styles.devider}></View>

              <TouchableOpacity
                style={[styles.button, settings.printer_precheck && styles.activeButton]}
                onPress={() => updateSettings('printer_precheck', !settings.printer_precheck)}
                activeOpacity={1}
              >
                <Text style={[styles.buttonText, settings.printer_precheck && styles.activeButtonText]}>Пречек</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { marginTop: 10, }, settings.printer_preorder && styles.activeButton]}
                onPress={() => updateSettings('printer_preorder', !settings.printer_preorder)}
                activeOpacity={1}
              >
                <Text style={[styles.buttonText, settings.printer_preorder && styles.activeButtonText]}>Зустрічка</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.settingCard}>
          <FastImage
            style={{ width: 70, height: 70, marginBottom: 10, }}
            source={require('@images/takeaway.png')}
          />
          <Text style={styles.settingHeadingText}>Сервіси доставки</Text>
          <View style={styles.devider}></View>
          <TouchableOpacity
            style={[styles.button, settings.delivery_use && [styles.activeButton, { backgroundColor: '#44CC62' }]]}
            onPress={() => {
              if (!settings.delivery_use && !settings.delivery_position_side && !settings.delivery_position_quick) {
                updateSettings('delivery_position_side', true)
                updateSettings('delivery_position_quick', false)
              }
              updateSettings('delivery_use', !settings.delivery_use)
            }}
            activeOpacity={1}
          >
            <Text style={[styles.buttonText, settings.delivery_use && styles.activeButtonText]}>Викор. сервіси</Text>
          </TouchableOpacity>

          {settings.delivery_use && (
            <>
              <View style={styles.devider}></View>

              <TouchableOpacity
                style={[styles.button, settings.delivery_position_side && styles.activeButton]}
                onPress={() => {
                  updateSettings('delivery_position_side', !settings.delivery_position_side)
                  updateSettings('delivery_position_quick', false)
                }}
                activeOpacity={1}
              >
                <Text style={[styles.buttonText, settings.delivery_position_side && styles.activeButtonText]}>Вертик. список</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { marginTop: 10, }, settings.delivery_position_quick && styles.activeButton]}
                onPress={() => {
                  updateSettings('delivery_position_quick', !settings.delivery_position_quick)
                  updateSettings('delivery_position_side', false)
                }}
                activeOpacity={1}
              >
                <Text style={[styles.buttonText, settings.delivery_position_quick && styles.activeButtonText]}>Горизонт. список</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {/* <View style={styles.settingHeading}>
        <Text style={styles.settingHeadingText}>Інше</Text>
      </View> */}

      <View style={[styles.settingCategoryContainer, { marginTop: 20, }]}>
        <View style={styles.settingCard}>
          <FastImage
            style={{ width: 70, height: 70, marginBottom: 10, }}
            source={require('@images/dep.png')}
          />
          <Text style={styles.settingHeadingText}>Активні цехи</Text>
          <View style={styles.devider}></View>
          <TouchableOpacity
            style={[styles.button, settings.desk_enabled && styles.activeButton]}
            onPress={() => updateSettings('desk_enabled', !settings.desk_enabled)}
            activeOpacity={1}
          >
            <Text style={[styles.buttonText, settings.desk_enabled && styles.activeButtonText]}>Каса</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { marginTop: 10, }, settings.kitchen_enabled && styles.activeButton]}
            onPress={() => updateSettings('kitchen_enabled', !settings.kitchen_enabled)}
            activeOpacity={1}
          >
            <Text style={[styles.buttonText, settings.kitchen_enabled && styles.activeButtonText]}>Кухня</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default Settings
