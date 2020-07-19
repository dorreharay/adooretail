import React, { useState, } from 'react'
import { Text, View, TouchableOpacity, TouchableHighlight, } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import styles from './styles'

import { deviceWidth, deviceHeight } from '@dimensions'

import { savePreReceipt, removeCurrentReceiptId, } from '@reducers/OrdersReducer'
import { setReceiptOptionsVisibility, clearCurrentReceipt, setBuffer, setOldReceipt, } from '@reducers/TempReducer';

import FastImage from 'react-native-fast-image';

function ReceiptOptions(props) {
  const { } = props

  const dispatch = useDispatch()

  const buffer = useSelector(state => state.temp.buffer)
  const oldReceiptState = useSelector(state => state.temp.oldReceiptState)
  const receiptOptionsVisibility = useSelector(state => state.temp.receiptOptionsVisibility)
  const selectedReceiptIndex = useSelector(state => state.orders.selectedReceiptIndex)
  const receiptsIds = useSelector(state => state.orders.receiptsIds)

  const [menuButtons] = useState([
    {
      name: 'Очистити чек',
      onPress: () => {
        dispatch(clearCurrentReceipt())
        dispatch(setReceiptOptionsVisibility(false))
      }
    },
    {
      name: 'Скасувати замовлення',
      onPress: () => {
        if(receiptsIds[selectedReceiptIndex]) {
          dispatch(savePreReceipt('cancelled'))
        }
        dispatch(removeCurrentReceiptId())
        dispatch(clearCurrentReceipt())

        const newBuffer = buffer.map((item, index) => index === selectedReceiptIndex ? null : item)

        dispatch(setBuffer(newBuffer))

        const newOldReceipt = oldReceiptState.map((item, index) => index === selectedReceiptIndex ? null : item)

        dispatch(setOldReceipt(newOldReceipt))

        dispatch(setReceiptOptionsVisibility(false))
      }
    },
  ])

  return (
    <>
      {receiptOptionsVisibility && (
        <>
          <TouchableOpacity
            style={{ position: 'absolute', top: 0, left: 0, width: deviceWidth, height: deviceHeight, backgroundColor: '#00000066' }}
            onPress={() => dispatch(setReceiptOptionsVisibility(false))}
          />
          <View style={styles.modal}>
            {menuButtons.map((button, index) => (
              <TouchableHighlight
                style={styles.modalItem}
                onPress={button.onPress}
                underlayColor='#F3F3F3'
                key={index}
              >
                <>
                  {index === 0 && (
                    <FastImage
                      style={{ width: 18, height: 18, marginRight: 12 }}
                      source={require('@images/eraser.png')}
                    />
                  )}
                  {index === 1 && (
                    <FastImage
                      style={{ width: 18, height: 18, marginRight: 12 }}
                      source={require('@images/cancel.png')}
                    />
                  )}

                  <Text style={styles.modalItemText}>{button.name}</Text>
                </>
              </TouchableHighlight>
            ))}
          </View>
        </>
      )}
    </>

  )
}

export default ReceiptOptions 