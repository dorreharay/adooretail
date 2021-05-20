import React, { useState, useRef, useEffect, useMemo, } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Animated, Easing, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux'
import FastImage from 'react-native-fast-image';
import Collapsible from 'react-native-collapsible';
import * as Progress from 'react-native-progress';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import styles from './styles'

import { getDateByCondition, } from '@dateFormatter'
import { getSessions, setHistoryAndOptions, } from '@reducers/UserReducer'

import SharedButton from '@shared/SharedButton';

function Details(props) {
  const {
    activeSort, setActiveSort, activeFilter, setActiveFilter,
    toggleEmptySessions, withoutEmptySessions, loading, setLoadingStatus = () => { },
  } = props

  useEffect(() => {
    if (!currentAccount) return
    
    dispatch(setHistoryAndOptions([]))

    setLoadingStatus(true)

    dispatch(getSessions({
      active_sort: "time-desc",
      active_filter: "day",
    }, () => setLoadingStatus(false)))
  }, [])

  const dispatch = useDispatch()

  const currentAccount = useSelector(state => state.user.currentAccount)

  const menuRef1 = useRef(null)
  const menuRef2 = useRef(null)

  const [detailsExpanded, setExpandedDetailsStatus] = useState(false)
  const [todayTotal, setTodayTotal] = useState({
    card: 0,
    cash: 0,
  })

  const { todayCardSum, todayCashSum, transactionsDelivery, transactionsIncasations, transactionsIncome } = useMemo(() => {
    const localSessions = currentAccount && currentAccount?.history || []

    const todaySessions = localSessions.filter(item => getDateByCondition(item.startTime, activeFilter))

    if (!localSessions) return

    let todayCardSum = todaySessions.map(item => {
      return item.receipts
        .filter(elem => elem.payment_type === 'card')
        .map(elem => elem.total)
    }).flat()

    if (!todayCardSum) return

    todayCardSum = todayCardSum.reduce((accumulator, currentValue) => accumulator + (currentValue), false)

    let todayCashSum = todaySessions.map(item => {
      return item.receipts
        .filter(elem => elem.payment_type === 'cash')
        .map(elem => elem.total)
    }).flat()

    if (!todayCashSum) return

    todayCashSum = todayCashSum.reduce((accumulator, currentValue) => accumulator + (currentValue), false)

    let transactionsDelivery = todaySessions.map(item => {
      return item.transactions
        .filter(elem => elem.type === 'delivery')
        .map(elem => elem.sum)
    }).flat()

    if (!transactionsDelivery) return

    transactionsDelivery = transactionsDelivery.reduce((accumulator, currentValue) => accumulator + (+currentValue), false)

    let transactionsIncasations = todaySessions.map(item => {
      return item.transactions
        .filter(elem => elem.type === 'incasation')
        .map(elem => elem.sum)
    }).flat()

    if (!transactionsIncasations) return

    transactionsIncasations = transactionsIncasations.reduce((accumulator, currentValue) => accumulator + (+currentValue), false)

    let transactionsIncome = todaySessions.map(item => {
      return item.transactions
        .filter(elem => elem.type === 'income')
        .map(elem => elem.sum)
    }).flat()

    if (!transactionsIncome) return

    transactionsIncome = transactionsIncome.reduce((accumulator, currentValue) => accumulator + (+currentValue), false)

    return { todayCardSum, todayCashSum, transactionsDelivery, transactionsIncasations, transactionsIncome }
  }, [currentAccount, activeFilter])

  const loadAgain = () => {
    setLoadingStatus(true)

    dispatch(getSessions({
      active_sort: activeSort.code,
      active_filter: activeFilter.code,
    }, () => setLoadingStatus(false)))
  }

  const hideMenu = (ref, type, code, relativeName) => {
    if(ref.current) {
      ref.current.hide()
    }

    if (type === 'filter') {
      setLoadingStatus(true)

      dispatch(getSessions({
        active_filter: code,
      }, () => setLoadingStatus(false)))

      setActiveFilter({ code, name: relativeName })
    }

    if (type === 'sort') {
      setLoadingStatus(true)

      dispatch(getSessions({
        active_sort: code,
      }, () => setLoadingStatus(false)))
      setActiveSort({ code, name: relativeName })
    }
  }

  return (
    <View>
      <View style={styles.container}>
        <View style={{ width: '45%', }}>
          <SharedButton
            style={{ alignSelf: 'flex-start', height: 40, marginBottom: 5, }}
            onPress={() => setExpandedDetailsStatus(!detailsExpanded)}
            scale={0.85}
          >
            <View style={{ alignItems: 'center', flexDirection: 'row', }}>
              <Text style={styles.paymentHeadingText}>Деталі</Text>

              <FastImage
                style={{ width: 9, height: 9, marginLeft: 10, }}
                source={require('@images/down-arrow.png')}
              />
            </View>
          </SharedButton>
        </View>
        <View style={{ width: '45%', justifyContent: 'flex-end', flexDirection: 'row' }}>
          <Menu
            ref={menuRef1}
            button={
              <View style={{ marginTop: 5, marginRight: 40, flexDirection: 'row' }}>
                <SharedButton
                  style={{ height: 20, marginTop: 5, flexDirection: 'row' }}
                  onPress={() => menuRef1.current.show()}
                  scale={0.85}
                >
                  <Text
                    style={styles.menuMainButton}
                  >
                    {activeFilter ? activeFilter.name : 'Фільтрувати'}
                  </Text>
                </SharedButton>
              </View>
            }
          >
            <MenuItem
              onPress={() => hideMenu(menuRef1, 'filter', 'day', 'За сьогодні')}
              textStyle={styles.menuItemText}
            >
              За сьогодні
          </MenuItem>
            <MenuDivider />
            <MenuItem
              onPress={() => hideMenu(menuRef1, 'filter', 'week', 'За останній тиждень')}
              textStyle={styles.menuItemText}
            >
              За останній тиждень
          </MenuItem>
            <MenuDivider />
            <MenuItem
              onPress={() => hideMenu(menuRef1, 'filter', 'month', 'За останній місяць')}
              textStyle={styles.menuItemText}
            >
              За останній місяць
          </MenuItem>
            <MenuDivider />
            <MenuItem
              onPress={() => hideMenu(menuRef1, 'filter', 'year', 'За останній рік')}
              textStyle={styles.menuItemText}>
              За останній рік
          </MenuItem>
          </Menu>
          <Menu
            ref={menuRef2}
            button={
              <View style={{ marginTop: 5, flexDirection: 'row' }}>
                <SharedButton
                  style={{ height: 20, marginTop: 5, flexDirection: 'row' }}
                  onPress={() => menuRef2.current.show()}
                  scale={0.85}
                >
                  <Text
                    style={styles.menuMainButton}
                  >
                    {activeSort ? activeSort.name : 'Сортувати'}
                  </Text>
                </SharedButton>
              </View>
            }
          >
            <MenuItem
              onPress={() => hideMenu(menuRef2, 'sort', 'time-desc', 'Спадання за часом')}
              textStyle={styles.menuItemText}
            >
              Спадання за часом
          </MenuItem>
            <MenuDivider />
            <MenuItem
              onPress={() => hideMenu(menuRef2, 'sort', 'time-asc', 'Зростання за часом')}
              textStyle={styles.menuItemText}
            >
              Зростання за часом
          </MenuItem>
            <MenuDivider />
            <MenuItem
              onPress={() => hideMenu(menuRef2, 'sort', 'sum-desc', 'Спадання за сумою')}
              textStyle={styles.menuItemText}
            >
              Спадання за сумою
          </MenuItem>
            <MenuDivider />
            <MenuItem
              onPress={() => hideMenu(menuRef2, 'sort', 'sum-asc', 'Зростання за сумою')}
              textStyle={styles.menuItemText}
            >
              Зростання за сумою
          </MenuItem>
          </Menu>

          <View style={{ justifyContent: 'center', marginLeft: 30, height: 40, }}>
            <SharedButton
              onPress={loadAgain}
              style={{ width: 25, height: 25, marginRight: 10, backgroundColor: '#FFFFFF00' }}
              iconStyle={{ width: 22, height: 22, }}
              source={require('@images/reload.png')} scale={0.6}
              rotateOnPress loadAgain={loadAgain}
            />
          </View>
        </View>
      </View>
      
    </View>
  )
}

export default Details
