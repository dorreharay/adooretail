import React, { useEffect, } from 'react'
import { View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles'

import { setAvailableTeams } from '@reducers/UserReducer'
import { currentAccountSelector, } from '@selectors'

import SwitchWithTitle from './SwitchWithTitle';

const Settings = () => {
  const dispatch = useDispatch()

  const currentAccount = useSelector(currentAccountSelector)

  useEffect(() => {
    setTeams({ kitchen: false })
  }, [])

  const setTeams = (newValue) => {
    dispatch(setAvailableTeams({...currentAccount.available_teams, ...newValue }))
  }

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: 'flex-start', }}>
        <Text style={styles.settingsTitle}>Активовані цехи</Text>
        <SwitchWithTitle
          title={'Каса'}
          value={currentAccount.available_teams.paydesk}
          onValueChange={(value) => setTeams({ paydesk: value })}
        />

        <SwitchWithTitle
          title={'Кухня'}
          value={currentAccount.available_teams.kitchen}
          onValueChange={(value) => setTeams({ kitchen: value })}
        />
      </View>
      
      {/* <View style={{ alignSelf: 'flex-start', marginTop: 30, }}>
        <Text style={styles.settingsTitle}>Вигляд списку продуктів</Text>
        <SwitchWithTitle
          title={'Горизонтальний'}
          value={currentAccount.available_teams.paydesk}
          onValueChange={(value) => setTeams({ paydesk: value })}
        />

        <SwitchWithTitle
          title={'Вертикальний'}
          value={currentAccount.available_teams.kitchen}
          onValueChange={(value) => setTeams({ kitchen: value })}
        />
      </View> */}

    </View>
  )
}

export default Settings
