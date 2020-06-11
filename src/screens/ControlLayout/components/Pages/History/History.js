import React, { useState, useMemo, Fragment, useEffect, } from 'react'
import { View, Text, } from 'react-native'
import { useSelector, } from 'react-redux'
import _ from 'lodash'
import styles from './styles'

import Details from './Details/Details'
import Filters from './Filters/Filters'
import HistoryList from './HistoryList/HistoryList'

function History(props) {
  const { navigation, toastRef, loadReceipts, } = props

  const currentAccount = useSelector(state => state.user.currentAccount)

  const [activeFilter, setActiveFilter] = useState({ code: 'day', name: 'За сьогодні' })
  const [activeSort, setActiveSort] = useState({ code: 'time-desc', name: 'Спадання за часом' })
  const [withoutEmptySessions, setWithoutStatus] = useState(false)
  const [loading, setLoadingStatus] = useState(false)

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

  return (
    <View style={styles.container}>
      {/* <Details
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        activeSort={activeSort}
        setActiveSort={setActiveSort}
        toggleEmptySessions={toggleEmptySessions}
        withoutEmptySessions={withoutEmptySessions}
        loading={loading} setLoadingStatus={setLoadingStatus}
      /> */}

      <Filters toastRef={toastRef} loadReceipts={loadReceipts} />

      <HistoryList data={historyList} loading={loading} setLoadingStatus={setLoadingStatus} />
    </View>
  )
}

export default History
