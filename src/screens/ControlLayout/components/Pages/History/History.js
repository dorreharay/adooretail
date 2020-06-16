import React, { useState, useMemo, useRef, useEffect, } from 'react'
import { View, Text, Animated, Easing, TouchableOpacity, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux'
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash'
import styles from './styles'

import Filters from './Filters/Filters'
import HistoryList from './HistoryList/HistoryList'

import SharedToast from '@shared/SharedToast/SharedToast';

import { loadReceipts, loadDetails, } from '@reducers/OrdersReducer'
import { setHistoryParams, } from '@reducers/TempReducer'

import { getSubstractDate, getUpperCaseDate, } from '@dateFormatter'
import { deviceWidth, deviceHeight } from '@dimensions';

function History(props) {
  const { activeCategory, } = props

  const toastRef = useRef(null)

  const dispatch = useDispatch()

  const currentAccount = useSelector(state => state.user.currentAccount)
  const historyParams = useSelector(state => state.temp.historyParams)

  const [sideMenuOpened, setSideMenuStatus] = useState(false)
  const [withoutEmptySessions, setWithoutStatus] = useState(false)
  const [loading, setLoadingStatus] = useState(false)
  const [animatedSideValue] = useState(new Animated.Value(-deviceWidth))
  const [dates] = useState([
    `Сьогодні ${getUpperCaseDate('DD.MM')}`,
    getUpperCaseDate(getSubstractDate('dddd DD.MM', 1)),
    getUpperCaseDate(getSubstractDate('dddd DD.MM', 2)),
    getUpperCaseDate(getSubstractDate('dddd DD.MM', 3)),
    getUpperCaseDate(getSubstractDate('dddd DD.MM', 4)),
    getUpperCaseDate(getSubstractDate('dddd DD.MM', 5)),
    getUpperCaseDate(getSubstractDate('dddd DD.MM', 6)),
  ])
  const [sorts] = useState([
    'asc',
    'desc',
  ])

  const [loadingIndex, setLoadingIndex] = useState(null)

  const historyList = useMemo(() => {
    if (!currentAccount) return []

    let newHistory = currentAccount && currentAccount.history || []

    if (withoutEmptySessions) {
      newHistory = newHistory.filter(item => item.receipts.length !== 0)
    }

    return newHistory
  }, [currentAccount, withoutEmptySessions,])

  const toggleEmptySessions = () => {
    setWithoutStatus(!withoutEmptySessions)
  }

  useEffect(() => {
    if (activeCategory === 0) {
      toastRef.current.show('Оновлення чеків')

      dispatch(loadReceipts())
    }
  }, [activeCategory])

  useEffect(() => {
    async function updateList() {
      toastRef.current.show('Оновлення чеків')
      try {
        await dispatch(loadReceipts())
        await dispatch(loadDetails()) 
      } catch (error) {
        
      } finally {
        setLoadingIndex(null)
      }
    }

    if (historyParams) {
      updateList()
    }
  }, [historyParams])

  useEffect(() => {
    Animated.timing(
      animatedSideValue,
      {
        toValue: sideMenuOpened ? 0 : -deviceWidth,
        duration: 100,
        easing: Easing.ease,
      }
    ).start()
  }, [sideMenuOpened])

  return (
    <View style={styles.container}>
      <Filters
        toastRef={toastRef}
        setSideMenuStatus={setSideMenuStatus}
      />

      <SharedToast
        ref={toastRef}
        style={{ position: 'absolute', bottom: 50 }}
      />

      <Animated.View style={[styles.sideMenuContainer, { right: animatedSideValue }]}>
        <TouchableOpacity style={styles.sideMenuWrapper} onPress={() => setSideMenuStatus(false)} />
        <View style={styles.sideMenu}>
          <LinearGradient 
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 1 }}
            colors={['#C4C4C411', '#00000000']}
            style={{ position: 'absolute', left: -120, width: 120, height: '100%', }}
          />
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', }}>
              <Text style={styles.sidebarHeading}>Дата</Text>
            </View>
            <TouchableOpacity
              style={{ alignItems: 'center', justifyContent: 'center', width: 40, height: 40, }}
              onPress={() => setSideMenuStatus(false)}
              activeOpacity={0.7}
            >
              <FastImage
                style={{ width: 20, height: 20, }}
                source={require('@images/x_icon.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={{ height: 15, }} />

          {dates.map((item, index) => (
            <TouchableOpacity
              style={[styles.button, historyParams.date === getSubstractDate('YYYY-MM-DD', index) && styles.activeButton]}
              onPress={() => {
                setLoadingIndex(index)
                dispatch(setHistoryParams({ ...historyParams, date: getSubstractDate('YYYY-MM-DD', index), }))
              }}
              activeOpacity={0.8}
              key={index}
            >
              <Text style={[styles.buttonText, historyParams.date === getSubstractDate('YYYY-MM-DD', index) && styles.activeButtonText]}>{loadingIndex === index ? 'Оновлення...' : item}</Text>
            </TouchableOpacity>
          ))}

          {/* <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15, }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', }}>
              <Text style={styles.sidebarHeading}>Сортування</Text>
            </View>
          </View>

          <View style={{ height: 15, }} />

          {sorts.map((sort, index) => (
            <TouchableOpacity
              style={[styles.button, historyParams.sort.type === sort && styles.activeButton]}
              onPress={() => {
                dispatch(setHistoryParams({ ...historyParams, sort: { type: sort, fields: ['transaction_time_end'] }, }))
              }}
              activeOpacity={0.8}
              key={sort}
            >
              <Text style={[styles.buttonText, historyParams.sort.type === sort && styles.activeButtonText]}>{sort === 'asc' ? 'Спадання за часом' : 'Зростання за часом'}</Text>
            </TouchableOpacity>
          ))} */}
        </View>
      </Animated.View>

      <HistoryList data={historyList} loading={loading} setLoadingStatus={setLoadingStatus} />
    </View>
  )
}

export default History
