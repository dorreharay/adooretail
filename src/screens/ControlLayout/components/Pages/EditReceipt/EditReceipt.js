import React, { useState, useMemo, useRef, useEffect, } from 'react'
import { View, Text, ScrollView, TouchableOpacity, TouchableHighlight, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux'
import FastImage from 'react-native-fast-image';
import styles from './styles'

import { getFormattedDate, } from '@dateFormatter'
import { setSettings, } from '@reducers/UserReducer'
import { printReceipt } from '@printer';

function EditReceipt(props) {
  const { activeCategory, } = props

  const toastRef = useRef(null)

  const dispatch = useDispatch()

  const currentAccount = useSelector(state => state.user.currentAccount)
  const currentEmployee = useSelector(state => state.user.currentEmployee)
  const settings = useSelector(state => state.user.settings)

  const [active, setActive] = useState(false)

  const updateSettings = (key, newValue) => {
    dispatch(setSettings({
      [key]: newValue,
    }))
  }

  return (
    <View style={styles.container}>
      <View style={styles.receiptContainer}>
        <ScrollView style={styles.receiptScroll} contentContainerStyle={{ alignItems: 'center', paddingTop: 30, paddingBottom: 100, }}>
          <View style={styles.receiptBlock}>
            {currentAccount && settings.receipt_show_logo ? (
              <FastImage
                style={{ width: 70, height: 70, marginBottom: 10, borderRadius: 100. }}
                source={{ uri: currentAccount?.receipt_logo || '' }}
                
              />
            ) : null}

            <Text style={styles.heading}>{currentAccount && currentAccount?.receipt_name.toUpperCase()}</Text>
            {settings.receipt_show_subheader && <Text style={styles.subheading}>{currentAccount && currentAccount?.receipt_description}</Text>}

            <View style={{ width: '85%', marginTop: 20, }}>
              {settings.receipt_show_address && <Text style={styles.regular}>{currentAccount && currentAccount?.address}</Text>}
              <Text style={styles.regular}>Номер чека: #XXXX-XXXXX-XXXX</Text>
              <Text style={styles.regular}>Касир: {currentAccount && currentAccount?.localSessions.length > 0 && currentAccount?.localSessions[currentAccount?.localSessions.length - 1].employees[currentEmployee]}</Text>
              <Text style={styles.regular}>Друк: {getFormattedDate('YYYY-MM-DD HH:mm:ss')}</Text>
              <Text style={styles.regular}>Тип оплати: Готівка</Text>
            </View>

            <View style={[styles.devider, { marginTop: 20, }]} />
            <View style={styles.bar}>
              <Text style={styles.bold}>Продукт</Text>
              <View style={styles.subbar}>
                <Text style={styles.bold}>Ціна</Text>
                <Text style={styles.bold}>К-сть</Text>
                <Text style={styles.bold}>Сума</Text>
              </View>
            </View>
            <View style={styles.devider} />

            <View style={[styles.bar, { marginTop: 10, }]}>
              <Text style={[styles.regular, { maxWidth: '50%', lineHeight: 22, }]}>Тестовий продукт</Text>
              <View style={styles.subbar}>
                <Text style={styles.regular}>75</Text>
                <Text style={styles.regular}>x1</Text>
                <Text style={styles.regular}>75</Text>
              </View>
            </View>

            <View style={[styles.bar, { marginTop: 20, }]}>
              <Text style={[styles.regular, { maxWidth: '50%', lineHeight: 22, }]}>Тестовий продукт</Text>
              <View style={styles.subbar}>
                <Text style={styles.regular}>75</Text>
                <Text style={styles.regular}>x1</Text>
                <Text style={styles.regular}>75</Text>
              </View>
            </View>

            <View style={[styles.bar, { marginTop: 20, }]}>
              <Text style={[styles.regular, { maxWidth: '50%', lineHeight: 22, }]}>Тестовий продукт</Text>
              <View style={styles.subbar}>
                <Text style={styles.regular}>75</Text>
                <Text style={styles.regular}>x1</Text>
                <Text style={styles.regular}>75</Text>
              </View>
            </View>

            <View style={{ height: 25, }} />

            <View style={styles.devider} />

            <View style={{ width: '85%', alignItems: 'flex-end', marginVertical: 15, }}>
              <Text style={[styles.bold, { fontSize: 22, }]}>До сплати: 225 грн</Text>
            </View>

            <View style={styles.devider} />

            {settings.receipt_show_qr ? (
              <FastImage
                style={{ width: 70, height: 70, marginTop: 20, }}
                source={require('@images/qrcode-receipt.png')}
              />
            ) : null}

            {settings.receipt_show_description && (
              <>
                {currentAccount && currentAccount?.feedback_heading && <Text style={[styles.regular, { marginTop: 10, fontSize: 14, }]}>{currentAccount?.feedback_heading}</Text>}
                <Text style={[styles.regular, { width: '70%', textAlign: 'center', fontSize: 12, lineHeight: 14, marginTop: 5, }]}>{currentAccount && currentAccount?.feedback_source}</Text>
              </>
            )}
          </View>
        </ScrollView>
        <View style={styles.sideMenu}>
          <Text style={styles.sideMenuHeading}>Опції</Text>

          <TouchableOpacity
            style={styles.sideMenuButton}
            onPress={() => updateSettings('receipt_show_logo', !settings.receipt_show_logo)}
            activeOpacity={1}
          >
            <Text style={styles.sideMenuRegular}>Показувати логотип</Text>
            {settings.receipt_show_logo ? (
              <FastImage
                style={{ width: 20, height: 20, }}
                source={require('@images/tick.png')}
              />
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sideMenuButton}
            onPress={() => updateSettings('receipt_show_subheader', !settings.receipt_show_subheader)}
            activeOpacity={1}
          >
            <Text style={styles.sideMenuRegular}>Показувати підпис</Text>
            {settings.receipt_show_subheader ? (
              <FastImage
                style={{ width: 20, height: 20, }}
                source={require('@images/tick.png')}
              />
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sideMenuButton}
            onPress={() => updateSettings('receipt_show_address', !settings.receipt_show_address)}
            activeOpacity={1}
          >
            <Text style={styles.sideMenuRegular}>Показувати адресу</Text>
            {settings.receipt_show_address ? (
              <FastImage
                style={{ width: 20, height: 20, }}
                source={require('@images/tick.png')}
              />
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sideMenuButton}
            onPress={() => updateSettings('receipt_show_qr', !settings.receipt_show_qr)}
            activeOpacity={1}
          >
            <Text style={styles.sideMenuRegular}>Показувати QR-код</Text>
            {settings.receipt_show_qr ? (
              <FastImage
                style={{ width: 20, height: 20, }}
                source={require('@images/tick.png')}
              />
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sideMenuButton}
            onPress={() => updateSettings('receipt_show_description', !settings.receipt_show_description)}
            activeOpacity={1}
          >
            <Text style={[styles.sideMenuRegular, { width: '75%', }]}>Показувати текст в кінці чеку</Text>
            {settings.receipt_show_description ? (
              <FastImage
                style={{ width: 20, height: 20, }}
                source={require('@images/tick.png')}
              />
            ) : null}
          </TouchableOpacity>

          <TouchableHighlight
            style={[styles.sideMenuTestButton]}
            onPress={printReceipt}
            onPressIn={() => setActive(true)}
            onPressOut={() => setActive(false)}
            underlayColor='#000000'
            activeOpacity={1}
          >
            <Text style={[styles.sideMenuRegular, active && { color: '#FFFFFF', }]}>Тестовий друк</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  )
}

export default EditReceipt
