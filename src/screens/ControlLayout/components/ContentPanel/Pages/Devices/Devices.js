import React, { useState, useEffect, } from 'react'
import { View, Text } from 'react-native'
import BluetoothConnectionButton from './BluetoothConnectionButton/BluetoothConnectionButton'
import ScannedBluetoothDevices from './ScannedBluetoothDevices/ScannedBluetoothDevices'
import styles from './styles'

function Devices() {
  const [status, setStatus] = useState(null)
  const [devices, setDevices] = useState({
    paired: [],
    found: [],
  })

  return (
    <View style={styles.container}>
      <Text style={styles.screenHeading}>
        Девайси
      </Text>

      <BluetoothConnectionButton
        status={status}
        setStatus={setStatus}
        setDevices={setDevices}
      />


      <View stle={{ height: '30%' }}>
        <ScannedBluetoothDevices status={status} devices={devices} />
      </View>
    </View>
  )
}

export default Devices
