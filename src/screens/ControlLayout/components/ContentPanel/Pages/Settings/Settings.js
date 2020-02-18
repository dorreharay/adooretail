import React, { useEffect, } from 'react'
import { View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles'

import { setSettings } from '@reducers/UserReducer'
import { currentAccountSelector, } from '@selectors'

import SwitchWithTitle from './SwitchWithTitle';

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
    <View style={styles.container}>
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
          // disabled
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

    </View>
  )
}

export default Settings
