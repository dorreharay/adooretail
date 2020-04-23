import React, { useState, useEffect, useMemo, useRef, } from 'react'
import { View, Text, TouchableOpacity, TextInput, } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector, useDispatch } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import Toast, { DURATION } from 'react-native-easy-toast'
import styles from './styles'
import FastImage from 'react-native-fast-image'

import { currentSessionSelector, } from '@selectors'
import { saveTransaction } from '@reducers/UserReducer'

import { getFormattedDate, } from '@dateFormatter'
import { deviceWidth, deviceHeight } from '@dimensions'

function Transaction(props) {
  const { isVisible, setTransactionModalVisiblity } = props

  const toastRef = useRef(null)

  const dispatch = useDispatch()

  const currentSession = useSelector(currentSessionSelector)

  const [selectedTransactionType, setSelectedTransactionType] = useState('delivery')
  const [amount, setAmount] = useState('0')
  const [comment, setComment] = useState('')
  const [amountFocused, setAmountFocused] = useState(false)

  const handleAmountChange = (e) => {
    const value = e.nativeEvent.text.replace(/[^0-9]/g, '')

    setAmount(value)
  }

  const handleCommentChange = (e) => {
    const value = e.nativeEvent.text

    setComment(value)
  }

  const handleSubmit = () => {
    if (canProceed) {
      function guidGenerator() {
        let S4 = function () {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
      }

      dispatch(saveTransaction({
        type: selectedTransactionType,
        sum: amount,
        comment,
        time: getFormattedDate('YYYY-MM-DD HH:mm:ss'),
        session_id: currentSession.localId,
        employees: currentSession.employees,
        localId: guidGenerator(),
      }))

      setAmount('0')
      setComment('')

      toastRef.current.show("Транзакцію збережено", 1000);
    }
  }

  useEffect(() => {
    setAmount('0')
    setComment('')
    setSelectedTransactionType('delivery')
  }, [isVisible])

  const canProceed = useMemo(() => {
    return +amount > 0 && comment !== ''
  }, [amount, comment])

  return (
    <View style={[styles.wrapper, isVisible && { top: 0, }]}>
      <TouchableOpacity
        style={styles.touchWrapper}
        onPress={() => setTransactionModalVisiblity(false)}
        activeOpacity={1}
      />
      <KeyboardAwareScrollView
        style={{ paddingTop: (deviceHeight - (deviceHeight * 0.75)) / 2, zIndex: 13, }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        extraScrollHeight={amountFocused ? 100 : 270}
        keyboardOpeningTime={0}
        enableOnAndroid={true}
      >
        <View style={styles.container}>
          <View style={styles.leftSide}>
            <View style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-between',  }}>
              <Text style={styles.headingText}>
                Транзакція
              </Text>

              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setTransactionModalVisiblity(false)}
              >
                <Text style={styles.closeText}>
                  Закрити
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.amountContainer}>
              <TextInput
                value={amount}
                onFocus={() => {
                  setAmount('')
                  setAmountFocused(true)
                }}
                onBlur={() => setAmountFocused(false)}
                onChange={handleAmountChange}
                style={styles.amountInput}
                textAlign={'center'}
                keyboardType='decimal-pad'
                placeholder='0'
                clearTextOnFocus
                maxLength={5}
              />
              <Text style={styles.headingText}>
                грн
            </Text>
              <Text style={[styles.headingText, { marginLeft: 5, textDecorationLine: 'underline' }]}>
                {selectedTransactionType === 'delivery' && 'взято'}
                {selectedTransactionType === 'incasation' && 'інкасовано'}
                {selectedTransactionType === 'income' && 'покладено'}
              </Text>
            </View>

            <Text style={[styles.headingText, { marginTop: '8%', }]}>
              Коментар
          </Text>

            <TextInput
              value={comment}
              onChange={handleCommentChange}
              style={styles.commentInput}
              keyboardType='default'
              placeholder='Введіть коментар до транзакції'
              multiline={true}
              numberOfLines={5}
            />

          </View>
          <View style={styles.rightSide}>
            <Text style={[styles.headingText, { color: '#FFFFFF', marginLeft: '14%' }]}>
              Тип
            </Text>

            <View style={{ height: 30, }} />

            <TouchableOpacity
              style={[styles.typeItem, selectedTransactionType === 'delivery' && styles.typeItemActive]}
              onPress={() => setSelectedTransactionType('delivery')}
              activeOpacity={1}
            >
              <FastImage
                style={{ width: 15, height: 15, marginRight: 10, opacity: selectedTransactionType === 'delivery' ? 1 : 0.5 }}
                source={require('@images/outcome.png')}
              />
              <Text style={[styles.typeItemText, selectedTransactionType === 'delivery' && styles.typeItemTextActive]}>Витрата</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.typeItem, selectedTransactionType === 'incasation' && styles.typeItemActive]}
              onPress={() => setSelectedTransactionType('incasation')}
              activeOpacity={1}
            >
              <FastImage
                style={{ width: 15, height: 15, marginRight: 10, opacity: selectedTransactionType === 'incasation' ? 1 : 0.5 }}
                source={require('@images/incasation.png')}
              />
              <Text style={[styles.typeItemText, selectedTransactionType === 'incasation' && styles.typeItemTextActive]}>Інкасація</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.typeItem, selectedTransactionType === 'income' && styles.typeItemActive]}
              onPress={() => setSelectedTransactionType('income')}
              activeOpacity={1}
            >
              <FastImage
                style={{ width: 15, height: 15, marginRight: 10, opacity: selectedTransactionType === 'income' ? 1 : 0.5 }}
                source={require('@images/income.png')}
              />
              <Text style={[styles.typeItemText, selectedTransactionType === 'income' && styles.typeItemTextActive]}>Прибуток</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                colors={canProceed ? ['#DB3E69', '#EF9058'] : ['#2E2C2E', '#2E2C2E']}
                style={styles.submitButtonGradient}
              >
                <Text style={[styles.submitButtonText, canProceed && { color: '#FFFFFF', }]}>Готово</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Toast
        ref={toastRef}
        opacity={1}
        style={{ paddingHorizontal: 40, backgroundColor: '#00000088' }}
        position='bottom'
        positionValue={150}
        textStyle={styles.toastText}
        fadeInDuration={200}
        fadeOutDuration={800}
      />
    </View>
  )
}

export default Transaction
