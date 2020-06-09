import React, { useState, } from 'react'
import { View, Text, TouchableOpacity, TouchableOpacityBase, } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'

import Logo from '@images/round-logo.svg'
import FastImage from 'react-native-fast-image';

function Initial1({ navigation }) {
  const [list] = useState([
    { content: 'Керуйте одним із каталогів товарів із зазначенням запасів, доступних у локаціях POS або в Інтернеті.', },
    { content: 'Відсилання чеків електронною поштою або SMS.', },
    { content: 'Підключення інтегрованого обладнання (висувні ящики, принтери і більше).', },
    { content: 'Керування ролями та дозволами персоналу.', },
    { content: 'Отримання детальної статистики та відслідковування дій персоналу.', },
  ])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Пришвидшіть обробку замовлень. Безкоштовно</Text>
        <TouchableOpacity
          style={styles.helpButton}
          activeOpacity={0.75}
        >
          <Text style={styles.helpText}>Потрібна допомога?</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.caption}>Інтегровані можливості Adoo Retail дозволять вам збільшити швидкість обробки ваших замовлень в декілька разів.</Text>

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
          onPress={() => navigation.jumpTo('Initial2')}
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
        style={styles.tabletImage}
        source={require('@images/tablet.png')}
      />
    </View>
  )
}

export default Initial1
