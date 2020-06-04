import React, { forwardRef, } from 'react'
import Toast, { DURATION } from 'react-native-easy-toast'
import styles from './styles'

const SharedToast = forwardRef((props, ref) => {
  return (
    <Toast
      ref={ref}
      opacity={1}
      style={{ paddingHorizontal: 40, backgroundColor: '#00000090' }}
      position='bottom'
      positionValue={100}
      textStyle={styles.toastText}
      fadeInDuration={200}
      fadeOutDuration={800}
    />
  )
})

export default SharedToast
