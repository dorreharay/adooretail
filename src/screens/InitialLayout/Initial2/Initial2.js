import React, { useState, } from 'react'
import { View, Text, TouchableOpacity, } from 'react-native'
import { useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'

import Logo from '@images/round-logo.svg'
import FastImage from 'react-native-fast-image';

import { setCurrentRoute, } from '@reducers/TempReducer'
import { setInitialFlowStatus } from '@reducers/UserReducer'

function Initial2({ navigation }) {
  const dispatch = useDispatch()

  const [list] = useState([
    { content: 'Керуйте одним із каталогів товарів із зазначенням запасів, доступних у локаціях POS або в Інтернеті.', },
    { content: 'Відсилання чеків електронною поштою або SMS.', },
    { content: 'Підключення інтегрованого обладнання (висувні ящики, принтери і більше).', },
    { content: 'Керування ролями та дозволами персоналу.', },
    { content: 'Отримання детальної статистики та відслідковування дій персоналу.', },
  ])

  const finishInitialFlow = () => {
    navigation.jumpTo('NoAccount')
    dispatch(setInitialFlowStatus(false))
    dispatch(setCurrentRoute(2))
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Керуйте своїми локаціями через додаток Adoo</Text>
        <TouchableOpacity
          style={styles.helpButton}
          activeOpacity={0.75}
        >
          <Text style={styles.helpText}>Потрібна допомога?</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.caption}>Все в одному. Мобільний додаток Adoo Commander дасть можливість контролювати статистикою, товарами, персоналом та складом.</Text>

      <View style={styles.list}>
        {list.map((item, index) => (
          <View style={styles.listItem} key={index}>
            <View style={{ marginTop: 5, }}>
              <Logo width={25} height={25} />
            </View>

            <Text style={styles.listItemText}>{item.content}</Text>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', }}>
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => navigation.jumpTo('Initial1')}
          activeOpacity={0.8}
        >
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={['#FFFFFF', '#FFFFFF']}
            style={styles.proceedButtonGradient}
          >
            <Text style={[styles.proceedButtonText, { color: '#E35E62' }]}>Назад</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.proceedButton, { marginLeft: 15, }]}
          onPress={finishInitialFlow}
          activeOpacity={0.8}
        >
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={['#DB3E69', '#EF9058']}
            style={styles.proceedButtonGradient}
          >
            <Text style={styles.proceedButtonText}>Далі</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <FastImage
        style={styles.phoneImage}
        source={require('@images/phone.png')}
      />
    </View>
  )
}

export default Initial2
