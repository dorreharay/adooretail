import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Switch } from 'react-native-switch';
import styles from './styles';

const SwitchWithTitle = (props) => {
  const { title, value, onValueChange, disabled = false } = props

  return (
    <View style={[{ alignItems: 'center', alignSelf: 'flex-start', justifyContent: 'space-between', flexDirection: 'row', marginLeft: 3, marginBottom: 20, }, disabled && { opacity: 0.5 }]}>
      <Text style={styles.switchText}>{title}</Text>
      <View style={{ marginLeft: 0, }}>
        <View style={{ flexDirection: 'row', width: 120, height: 35, borderWidth: 1, borderColor: '#E66960' }}>
          <TouchableOpacity
            style={[{ alignItems: 'center', justifyContent: 'center', width: 60, height: 34, backgroundColor: '#E66960' }, !value && { backgroundColor: '#FFFFFF00' }]}
            onPress={() => onValueChange(true)}
            activeOpacity={0.8}
          >
            <Text style={[{ color: '#E66960' }, value && { color: '#FFF' }]}>ON</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{ alignItems: 'center', justifyContent: 'center', width: 60, height: 34, }, !value && { backgroundColor: '#E66960' }]}
            onPress={() => onValueChange(false)}
            activeOpacity={0.8}
          >
            <Text style={[{ color: '#E66960' }, !value && { color: '#FFF' }]}>OFF</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default SwitchWithTitle
