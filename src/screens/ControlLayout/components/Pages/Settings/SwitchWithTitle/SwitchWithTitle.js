import React, { useEffect, } from 'react'
import { View, Text, TouchableOpacity, } from 'react-native'
import { Switch } from 'react-native-switch';
import styles from './styles';
import FastImage from 'react-native-fast-image';

const SwitchWithTitle = (props) => {
  const { title, type, value, updateSettings, disabled = false, subsetting = false, unique = false, relatives = [], } = props

  const handleValue = () => {
    if (disabled) return

    updateSettings(type, !value)
  }

  useEffect(() => {
    if (unique && relatives) {
      if (value) {
        relatives.forEach(relativeType => {
          updateSettings(relativeType, false)
        })
      }
    }

    if (!value && type === 'printer_enabled') {
      updateSettings('printer_autoconnection_enabled', false)
    }
  }, [unique, value,])

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleValue}
      activeOpacity={0.8}
    >
      <Text style={[styles.switchText, subsetting && { fontSize: styles.switchText.fontSize - 3 }, disabled && { color: styles.switchText.color + '55' }]}>{title}</Text>
      <View>
        <View style={[styles.toggle, subsetting && { width: styles.toggle.width - 5, height: styles.toggle.height - 5, }, disabled && { borderColor: styles.switchText.color + '33' }]}>
          {unique ? (
            value ? (
              <View
                style={[{ width: 20, height: 20, backgroundColor: '#000000', borderRadius: 100, }, subsetting && { width: 20 - 5, height: 20 - 5, }]}
              />
            ) : null
          ) : (
              value ? (
                <FastImage
                  style={{ width: 16, height: 16 }}
                  source={require('@images/tick.png')}
                />
              ) : null
            )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SwitchWithTitle
