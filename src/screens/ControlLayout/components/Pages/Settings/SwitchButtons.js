import React, { useState, } from 'react'
import { View, Text, TouchableOpacity, } from 'react-native'
import styles from './styles';

function SwitchButtons(props) {
  const { buttons, updateSettings, } = props

  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <View style={styles.buttonsContainer}>
      {buttons.map((item, index) => (
        <TouchableOpacity
          style={[
            styles.button,
            activeIndex === index && styles.active,
            index === 0 && { borderTopLeftRadius: 3, borderBottomLeftRadius: 3, borderRightWidth: 0, },
            index === buttons.length - 1 && { borderTopRightRadius: 3, borderBottomRightRadius: 3, borderLeftWidth: 0, },
          ]}
          onPress={() => {
            setActiveIndex(index)
            updateSettings({ cash: index === 0, debit: index === 1, unset: index === 2 }, 'default_payment_types')
          }}
          activeOpacity={1}
        >
          <Text style={[styles.buttonText, activeIndex === index && styles.activeText]}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default SwitchButtons
