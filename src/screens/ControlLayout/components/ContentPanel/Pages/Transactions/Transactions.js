import React, { useState, useEffect, } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'

import TransactionButtons from './TransactionButtons/TransactionButtons'

import SharedButton from '@shared/SharedButton';
import { dispatch } from 'rxjs/internal/observable/pairs';

function Transactions() {
  const [invalidColor, setInvalidColor] = useState(true)
  const [enteredSum, setEnteredSum] = useState('0')
  const [comment, setEnteredComment] = useState('')
  const [activeButton, setActiveButton] = useState(0)
  const [commentValid, setCommentValidity] = useState(false)

  useEffect(() => {
    if (+enteredSum > 0) {
      setInvalidColor(false)
    }

    if (+enteredSum <= 0) {
      setInvalidColor(true)
    }

    if(comment.length > 0) {
      setCommentValidity(true)
    } else {
      setCommentValidity(false)
    }
  }, [enteredSum, comment])

  const handleChangeSum = (value) => {
    value = value.replace(/[^0-9.]/g, '')

    const splittedValue = value.split('')
    const dotsAmount = splittedValue.filter(item => item === '.').length

    if (dotsAmount > 1) {
      return
    }

    const dotIndex = value.indexOf('.')
    const valueBeforeDot = value.slice(0, dotIndex)
    const valueAfterDot = value.slice(dotIndex)

    if (valueBeforeDot.length >= 5) return
    if (valueAfterDot.length > 3) return

    setEnteredSum(value)
  }

  const handleSubmit = () => {
    if(invalidColor || !commentValid) {
      return 
    }

    let type = ''

    if(activeButton === 0) type = 'Поставка'
    if(activeButton === 1) type = 'Витрата'
    if(activeButton === 2) type = 'Прибуток'

    // dispatch(saveTransaction({
    //   type,
    //   sum: enteredSum,
    //   comment,
    // }))
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TransactionButtons activeButton={activeButton} setActiveButton={setActiveButton} />

        <View style={styles.inputContainer}>
          <Text style={styles.inputHeading}>
            Введіть суму
            {activeButton === 0 && ' поставки'}
            {activeButton === 1 && ' витрати'}
            {activeButton === 2 && ' прибутку'}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 35, maxWidth: 200 }}>
            <TextInput
              style={[styles.textInput, invalidColor ? { color: '#E35E62', borderColor: '#E35E62', } : { color: '#39B14C', borderColor: '#39B14C', }]}
              value={enteredSum}
              onChangeText={text => handleChangeSum(text)}
              keyboardType='number-pad'
            />
            <Text style={styles.textInputAfterText}>грн внесено</Text>

          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputHeading}>Коментар</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 35, maxWidth: 200 }}>
            <TextInput
              style={[comment.length === 0 ? styles.placeholderStyles : styles.commentInput]}
              value={comment}
              multiline
              onChangeText={text => setEnteredComment(text)}
              keyboardType='number-pad'
              placeholder='Введіть коментар до поставки'
            />
          </View>
        </View>

        <View style={styles.submitContainer}>
          <SharedButton
            style={{ flex: 1, }}
            onPress={handleSubmit}
            scale={0.95}
          >
            <LinearGradient
              style={[styles.buttonInnerStyles, (invalidColor || !commentValid) && { opacity: 0.5 }]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              colors={['#DB3E69', '#FD9C6C']}
            >
              <Text style={[styles.buttonText, styles.activeButton]}>Підтвердити</Text>
            </LinearGradient>
          </SharedButton>
        </View>
      </View>

      <View style={styles.rightContainer}>

      </View>
    </View>
  )
}

export default Transactions
