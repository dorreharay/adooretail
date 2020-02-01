import React, { useState, useRef, useEffect, useMemo, } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Animated, Easing, } from 'react-native'
import { useSelector, } from 'react-redux'
import FastImage from 'react-native-fast-image';
import Collapsible from 'react-native-collapsible';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
let moment = require('moment-timezone');
moment.locale('uk');
import styles from './styles'

import { currentAccountSelector, } from '@selectors'
import SharedButton from '@shared/SharedButton';

function Details(props) {
  const { activeSort, setActiveSort, activeFilter, setActiveFilter, toggleEmptySessions, withoutEmptySessions, } = props

  const currentAccount = useSelector(currentAccountSelector)

  const menuRef1 = useRef(null)
  const menuRef2 = useRef(null)

  const [detailsExpanded, setExpandedDetailsStatus] = useState(false)
  const [todayTotal, setTodayTotal] = useState({
    card: 0,
    cash: 0,
  })

  const { todayCardSum, todayCashSum } = useMemo(() => {
    const localSessions = currentAccount.localSessions

    const todaySessions = localSessions.filter(item => moment(item.startTime).isBetween(moment().startOf(activeFilter ? activeFilter.code : 'day'), moment().endOf(activeFilter ? activeFilter.code : 'day')))

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

    return { todayCardSum, todayCashSum }
  }, [currentAccount.localSessions, activeFilter])

  const openMenu = () => {
    menuRef.current.show()
  }

  const hideMenu = (ref, type, code, relativeName) => {
    ref.current.hide()

    if (type === 'filter') {
      setActiveFilter({ code, name: relativeName })
    }

    if (type === 'sort') {
      setActiveSort({ code, name: relativeName })
    }
  }

  return (
    <View>
      <View style={styles.container}>
        <View style={{ width: '50%', }}>
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
        <View style={{ width: '50%', justifyContent: 'flex-end', flexDirection: 'row' }}>
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
        </View>
      </View>
      <Collapsible style={{ paddingVertical: 15, }} collapsed={!detailsExpanded}>
        <View style={styles.paymentDetails}>
          <Text style={styles.paymentDetailsHeadingText}>Безготівковий підсумок {activeFilter ? activeFilter.name.toLowerCase() : 'за сьогодні'} - <Text style={styles.paymentDetailsText}>{todayCardSum || 0} грн</Text></Text>
        </View>

        <View style={styles.paymentDetails}>
          <Text style={styles.paymentDetailsHeadingText}>Готівковий підсумок {activeFilter ? activeFilter.name.toLowerCase() : 'за сьогодні'} - <Text style={styles.paymentDetailsText}>{todayCashSum || 0} грн</Text></Text>
        </View>

        <View style={styles.paymentDetails}>
          <Text style={styles.paymentDetailsHeadingText}>Всього {activeFilter ? activeFilter.name.toLowerCase() : 'за сьогодні'} - <Text style={styles.paymentDetailsText}>{(todayCashSum || 0) + (todayCardSum || 0)} грн</Text></Text>
        </View>

        <SharedButton
          style={styles.paymentDetailsButton}
          onPress={toggleEmptySessions}
          scale={0.85}
        >
          <Text style={styles.paymentDetailsButtonText}>{withoutEmptySessions ? 'Показати ' : 'Сховати'} пусті зміни</Text>
        </SharedButton>
      </Collapsible>
    </View>
  )
}

export default Details