import { createSelector } from 'reselect'

const selectSessions = state => ({ 
  accounts: state.user.accounts,
  currentAccountIndex: state.user.currentAccountIndex,
})

export const currentSessionSelector = createSelector(
  selectSessions,
  ({ accounts, currentAccountIndex }) => {
    const localSessions = accounts[currentAccountIndex].localSessions

    console.log('aaaa', localSessions)

    const lastIndex = localSessions ? localSessions.length - 1 : null

    if(lastIndex === null) return {}

    const currentSession = localSessions[lastIndex] ? localSessions[lastIndex] : []

    return currentSession
  }
)

const selectIndexAndAccounts = state => ({ 
  accounts: state.user.accounts,
  currentAccountIndex: state.user.currentAccountIndex,
})

export const currentAccountSelector = createSelector(
  selectIndexAndAccounts,
  ({ accounts, currentAccountIndex }) => accounts[currentAccountIndex]
)