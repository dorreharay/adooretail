import React, { useEffect, } from 'react'
import { View, Text, ScrollView, } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles'

import createStore from '../../../../../../store/store'

const { persistor } = createStore();

import { setSettings } from '@reducers/UserReducer'
import { currentAccountSelector, } from '@selectors'

import SwitchWithTitle from './SwitchWithTitle';
import SwitchButtons from './SwitchButtons';
import { TouchableOpacity } from 'react-native-gesture-handler'

const Settings = ({ navigation }) => {
  const dispatch = useDispatch()

  const currentAccount = useSelector(state => state.user.currentAccount)

  const updateSettings = (newValue, prop) => {
    let payload = null

    if (typeof newValue === 'object') {
      payload = {
        ...currentAccount.settings,
        [prop]: {
          ...currentAccount.settings[prop],
          ...newValue,
        }
      }
    } else {
      payload = {
        ...currentAccount.settings,
        [prop]: newValue
      }
    }

    dispatch(setSettings(payload))
  }

  const resetAccount = () => {
    persistor.purge()
    navigation.navigate('NoAccount')
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 200, }}>
      {currentAccount && (
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginRight: '10%' }}>
            <View style={{ alignSelf: 'flex-start', }}>
              <Text style={styles.settingsTitle}>Активні цехи</Text>
              <SwitchWithTitle
                title={'Каса'}
                value={currentAccount.settings.available_teams.paydesk}
                onValueChange={(value) => updateSettings({ paydesk: value }, 'available_teams')}
              />

              <SwitchWithTitle
                title={'Кухня'}
                value={currentAccount.settings.available_teams.kitchen}
                onValueChange={(value) => updateSettings({ kitchen: value }, 'available_teams')}
              />
            </View>


            <View style={{ alignSelf: 'flex-start', marginTop: 30, }}>
              <Text style={styles.settingsTitle}>Використовувати принтер чеків</Text>

              <SwitchWithTitle
                title={'Увімкнути'}
                value={currentAccount.settings.printer_enabled}
                onValueChange={(value) => updateSettings(value, 'printer_enabled')}
              />
            </View>

            <View style={{ alignSelf: 'flex-start', marginTop: 30, }}>
              <Text style={styles.settingsTitle}>Перевірка робочих годин</Text>

              <SwitchWithTitle
                title={'Увімкнути'}
                value={currentAccount.settings.shifts.enabled}
                onValueChange={(value) => updateSettings({ enabled: value }, 'shifts')}
              />
            </View>
          </View>

          <View style={{ flexDirection: 'column' }}>
            <View style={{ alignSelf: 'flex-start', }}>
              <Text style={styles.settingsTitle}>Стандартний спосіб оплати</Text>

              <SwitchButtons
                buttons={['Готівка', 'Картка', 'Немає']}
                updateSettings={updateSettings}
              />
            </View>
            <TouchableOpacity 
              style={{ justifyContent: 'center', marginTop: 20, paddingVertical: 15, }}
              onPress={resetAccount}
            >
              <Text style={styles.buttonTitle}>Вийти з аккаунту</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  )
}

export default Settings
