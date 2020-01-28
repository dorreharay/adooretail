import React from 'react'
import { View, Text } from 'react-native'
import { Switch } from 'react-native-switch';
import styles from './styles';

const SwitchWithTitle = (props) => {
  const { title, value, onValueChange, } = props

  return (
    <View style={{ alignItems: 'center', alignSelf: 'flex-start', justifyContent: 'space-between', flexDirection: 'row', marginLeft: 3, marginBottom: 20, }}>
      <Text style={styles.switchText}>{title}</Text>
      <View style={{ marginLeft: 20, }}>
        <Switch
          value={value}
          onValueChange={(val) => onValueChange(val)}
          disabled={false}
          circleSize={30}
          barHeight={34}
          circleBorderWidth={0}
          backgroundActive={'#E9765D'}
          backgroundInactive={'#DFDFDF'}
          circleInActiveColor={'#FFFFFF'}
          changeValueImmediately={true}
          innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
          switchLeftPx={2.2}
          switchRightPx={2.2}
          switchWidthMultiplier={2}
          switchBorderRadius={30}
        />
      </View>
    </View>

  )
}

export default SwitchWithTitle
