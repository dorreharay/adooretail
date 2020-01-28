import React, { useState, useMemo, Fragment, } from 'react'
import { View, Text, } from 'react-native'
import { useSelector, } from 'react-redux'
import _ from 'lodash'
import styles from './styles'
import moment from 'moment/min/moment-with-locales';
moment.locale('uk');

import { currentAccountSelector, } from '@selectors'

import Details from './Details/Details'
import Filters from './Filters/Filters'
import HistoryList from './HistoryList/HistoryList'

function History(props) {
  const currentAccount = useSelector(currentAccountSelector)

  const [activeFilter, setActiveFilter] = useState(null)
  const [activeSort, setActiveSort] = useState({ code: 'time-desc', name: 'Сортувати' })
  const [withoutEmptySessions, setWithoutStatus] = useState(false)

  const historyList = useMemo(() => {
    let localSessions = currentAccount.localSessions
    
    if(withoutEmptySessions) {
      localSessions = localSessions.filter(item => item.receipts.length !== 0)
    }

    if (localSessions) {
      if (activeSort) {
        if (activeSort.code === 'time-desc') {
          localSessions = _.orderBy(localSessions, 'startTime', 'desc')
        }

        if (activeSort.code === 'time-asc') {
          localSessions = _.orderBy(localSessions, 'startTime', 'asc')
        }

        if(activeSort.code === 'sum-desc') {
          localSessions === localSessions.sort((a, b) => {
            const prev = a.receipts.reduce((accumulator, currentValue) => accumulator + (currentValue.total), false)
            const next = b.receipts.reduce((accumulator, currentValue) => accumulator + (currentValue.total), false)

            return next - prev
          })
        }

        if(activeSort.code === 'sum-asc') {
          localSessions === localSessions.sort((a, b) => {
            const prev = a.receipts.reduce((accumulator, currentValue) => accumulator + (currentValue.total), false)
            const next = b.receipts.reduce((accumulator, currentValue) => accumulator + (currentValue.total), false)

            return prev - next
          })
        }
      }

      if(activeFilter) {
        if(activeFilter.code === 'day') {
          localSessions = localSessions.filter(item => moment(item.startTime).isBetween(moment().startOf('day'), moment().endOf('day')))
        }

        if(activeFilter.code === 'week') {
          localSessions = localSessions.filter(item => moment(item.startTime).isBetween(moment().startOf('week'), moment().endOf('week')))
        }

        if(activeFilter.code === 'month') {
          localSessions = localSessions.filter(item => moment(item.startTime).isBetween(moment().startOf('month'), moment().endOf('month')))
        }

        if(activeFilter.code === 'year') {
          localSessions = localSessions.filter(item => moment(item.startTime).isBetween(moment().startOf('year'), moment().endOf('year')))
        }
      }

      return localSessions
    }
  }, [currentAccount.localSessions, activeFilter, activeSort, withoutEmptySessions,])

  const toggleEmptySessions = () => {
    setWithoutStatus(!withoutEmptySessions)
  }

  return (
    <View style={styles.container}>
      <Details
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        activeSort={activeSort}
        setActiveSort={setActiveSort}
        toggleEmptySessions={toggleEmptySessions}
        withoutEmptySessions={withoutEmptySessions}
      />

      <Filters />

      <HistoryList data={historyList} />
    </View>
  )
}

export default History
