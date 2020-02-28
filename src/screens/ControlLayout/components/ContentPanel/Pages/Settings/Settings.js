import React, { useEffect, } from 'react'
import { View, Text, ScrollView, } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles'

import { setSettings } from '@reducers/UserReducer'
import { currentAccountSelector, } from '@selectors'

import SwitchWithTitle from './SwitchWithTitle';
import SwitchButtons from './SwitchButtons';

const Settings = () => {
  const dispatch = useDispatch()

  const currentAccount = useSelector(currentAccountSelector)

  const updateSettings = (newValue, prop) => {
    const payload = {
      ...currentAccount.settings,
      [prop]: {
        ...currentAccount.settings[prop],
        ...newValue,
      }
    }

    dispatch(setSettings(payload))
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ alignSelf: 'flex-start', }}>
        <Text style={styles.settingsTitle}>Активні цехи</Text>
        <SwitchWithTitle
          title={'Каса'}
          disabled
          value={currentAccount.settings.available_teams.paydesk}
          onValueChange={(value) => updateSettings({ paydesk: value }, 'available_teams')}
        />

        <SwitchWithTitle
          title={'Кухня'}
          disabled
          value={currentAccount.settings.available_teams.kitchen}
          onValueChange={(value) => updateSettings({ kitchen: value }, 'available_teams')}
        />
      </View>
      
      <View style={{ alignSelf: 'flex-start', marginTop: 30, }}>
        <Text style={styles.settingsTitle}>Перевірка робочих годин</Text>
        <SwitchWithTitle
          title={'Увімкнута'}
          value={currentAccount.settings.shifts.enabled}
          onValueChange={(value) => updateSettings({ enabled: value }, 'shifts')}
        />
      </View>

      <View style={{ alignSelf: 'flex-start', marginTop: 30, }}>
        <Text style={styles.settingsTitle}>Стандартний спосіб оплати</Text>

        <SwitchButtons
          buttons={['Готівка', 'Картка', 'Немає']}
          updateSettings={updateSettings}
        />
      </View>

    </ScrollView>
  )
}

export default Settings
