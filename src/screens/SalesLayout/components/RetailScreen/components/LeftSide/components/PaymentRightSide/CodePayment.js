import React from 'react'
import { View, } from 'react-native'
import { RNCamera } from 'react-native-camera';
import styles from './styles'

function CodePayment(props) {
  const {  } = props

  return (
    <View style={styles.discountContainer}>
      <View style={styles.cameraContainer}>
        <RNCamera
          style={{ width: '100%', height: '100%', }}
          type={RNCamera.Constants.Type.front}
          androidCameraPermissionOptions={{
            title: 'Доступ до камери',
            message: 'Програма потребує дозвіл використання камери для зчитування QR-кодів',
            buttonPositive: 'Дозволити',
            buttonNegative: 'Відхилити',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            // setTimeout(() => navigation.jumpTo('Login'), 250)
          }}
        />
      </View>
    </View>

  )
}

export default CodePayment
