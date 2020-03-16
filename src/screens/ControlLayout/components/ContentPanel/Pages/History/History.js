import React, { useState, useMemo, Fragment, useEffect, } from 'react'
import { View, Text, } from 'react-native'
import { useSelector, } from 'react-redux'
import _ from 'lodash'
import styles from './styles'
import { currentAccountSelector, } from '@selectors'

import Details from './Details/Details'
import HistoryList from './HistoryList/HistoryList'

function History(props) {
  const { navigation } = props

  const currentAccount = useSelector(currentAccountSelector)

  const [activeFilter, setActiveFilter] = useState({ code: 'day', name: 'За сьогодні' })
  const [activeSort, setActiveSort] = useState({ code: 'time-desc', name: 'Спадання за часом' })
  const [withoutEmptySessions, setWithoutStatus] = useState(false)
  const [loading, setLoadingStatus] = useState(false)

  const historyList = useMemo(() => {
    let newSessions = currentAccount.history
    
    if (withoutEmptySessions) {
      newSessions = newSessions.filter(item => item.receipts.length !== 0)
    }

    return newSessions
  }, [currentAccount, withoutEmptySessions,])

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

      <HistoryList data={historyList} loading={loading} setLoadingStatus={setLoadingStatus} />
    </View>
  )
}

export default History
