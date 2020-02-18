import React, { useState, useMemo, Fragment, useEffect, } from 'react'
import { View, Text, } from 'react-native'
import { useSelector, } from 'react-redux'
import _ from 'lodash'
import styles from './styles'
import { currentAccountSelector, } from '@selectors'
import { getIsBetweenAdvanced, } from '@dateFormatter'

import Details from './Details/Details'
import Filters from './Filters/Filters'
import HistoryList from './HistoryList/HistoryList'

function History(props) {
  const currentAccount = useSelector(currentAccountSelector)

  const [activeFilter, setActiveFilter] = useState({ code: 'day', name: 'За сьогодні' })
  const [activeSort, setActiveSort] = useState({ code: 'time-desc', name: 'Сортувати' })
  const [withoutEmptySessions, setWithoutStatus] = useState(false)
  const [loading, setLoadingStatus] = useState(false)

  useEffect(() => {
    setLoadingStatus(true)

    setTimeout(() => {
      setLoadingStatus(false)
    }, 500)
  }, [activeFilter, activeSort,])

  const historyList = useMemo(() => {
    let localSessions = currentAccount.localSessions
    
    if (withoutEmptySessions) {
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

        if (activeSort.code === 'sum-desc') {
          localSessions === localSessions.sort((a, b) => {
            const prev = a.receipts.reduce((accumulator, currentValue) => accumulator + (currentValue.total), false)
            const next = b.receipts.reduce((accumulator, currentValue) => accumulator + (currentValue.total), false)

            return next - prev
          })
        }

        if (activeSort.code === 'sum-asc') {
          localSessions === localSessions.sort((a, b) => {
            const prev = a.receipts.reduce((accumulator, currentValue) => accumulator + (currentValue.total), false)
            const next = b.receipts.reduce((accumulator, currentValue) => accumulator + (currentValue.total), false)

            return prev - next
          })
        }
      }

      if (activeFilter) {
        if (activeFilter.code === 'day') {
          localSessions = localSessions.filter(item => getIsBetweenAdvanced(item.startTime, { start: 'day', end: 'day' }))
        }

        if (activeFilter.code === 'week') {
          localSessions = localSessions.filter(item => getIsBetweenAdvanced(item.startTime, { start: 'week', end: 'week' }))
        }

        if (activeFilter.code === 'month') {
          localSessions = localSessions.filter(item => getIsBetweenAdvanced(item.startTime, { start: 'month', end: 'month' }))
        }

        if (activeFilter.code === 'year') {
          localSessions = localSessions.filter(item => getIsBetweenAdvanced(item.startTime, { start: 'year', end: 'year' }))
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
        loading={loading} setLoadingStatus={setLoadingStatus}
      />

      <Filters />

      <HistoryList data={historyList} />
    </View>
  )
}

export default History
