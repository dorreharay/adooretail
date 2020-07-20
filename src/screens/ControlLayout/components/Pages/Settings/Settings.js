import React, { useEffect, useState, } from 'react'
import { View, Text, ScrollView, TouchableOpacity, } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import FastImage from 'react-native-fast-image';
import styles from './styles'

import { setSettings, } from '@reducers/UserReducer'

import SwitchWithTitle from './SwitchWithTitle/SwitchWithTitle';

const Settings = ({ navigation }) => {
  const dispatch = useDispatch()

  const [selectedSetting, setSelectedSetting] = useState(null)

  const settings = useSelector(state => state.user.settings)
  const { paired, found } = useSelector(state => state.temp.bluetoothDevices)

  const updateSettings = (key, newValue) => {
    dispatch(setSettings({
      [key]: newValue,
    }))
  }

  const renderSettingType = () => {
    if(selectedSetting === 'general') {
      return '/ Загальні'
    }
    if (selectedSetting === 'payments') {
      return '/ Оплата'
    }
    if (selectedSetting === 'prints') {
      return '/ Друк'
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100, }} bounces={false}>
      <View style={styles.mainHeading}>
        <TouchableOpacity
          style={[styles.mainHeadingBackButton, { marginLeft: -20, marginRight: 0, }]}
          onPress={() => setSelectedSetting(null)}
          activeOpacity={0.8}
        >
          <Text style={styles.mainHeadingText}>Налаштування {renderSettingType()}</Text>
        </TouchableOpacity>
        {selectedSetting && (
          <TouchableOpacity
            style={styles.mainHeadingBackButton}
            onPress={() => setSelectedSetting(null)}
            activeOpacity={0.8}
          >
            <Text style={styles.mainBackText}>Закрити</Text>
          </TouchableOpacity>
        )}
      </View>

      {!selectedSetting ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => setSelectedSetting('general')}
            activeOpacity={0.8}
          >
            <View style={styles.title}>
              <FastImage
                style={{ width: 45, height: 45, marginRight: 20, }}
                source={require('@images/general.png')}
              />
              <Text style={styles.titleText}>Загальні</Text>
            </View>
            <View style={styles.caption}>
              <Text style={styles.captionText}>Налаштування активних цехів, знижок, годин роботи.</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => setSelectedSetting('payments')}
            activeOpacity={0.8}
          >
            <View style={styles.title}>
              <FastImage
                style={{ width: 45, height: 45, marginRight: 20, }}
                source={require('@images/payments.png')}
              />
              <Text style={styles.titleText}>Оплата</Text>
            </View>
            <View style={styles.caption}>
              <Text style={styles.captionText}>Налаштування пріоритетних способів оплати, комісії та знижки.</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => setSelectedSetting('prints')}
            activeOpacity={0.8}
          >
            <View style={styles.title}>
              <FastImage
                style={{ width: 45, height: 45, marginRight: 20, }}
                source={require('@images/prints.png')}
              />
              <Text style={styles.titleText}>Друк</Text>
            </View>
            <View style={styles.caption}>
              <Text style={styles.captionText}>Налаштування дозволених підключених принтерів та їх типів.</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
          <>
            <View style={styles.settingCategoryContainer}>
              {selectedSetting === 'payments' && (
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
              )}
              {selectedSetting === 'prints' && (
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
              )}
              {selectedSetting === 'general' && (
                <>
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
                </>
              )}
            </View>
          </>
        )}
    </ScrollView>
  )
}

export default Settings
