import { createSelector } from 'reselect'

const selectIndexAndAccounts = state => ({
  accounts: state.user.accounts,
  currentAccountIndex: state.user.currentAccountIndex,
})

export const currentSessionSelector = createSelector(
  selectIndexAndAccounts,
  ({ accounts, currentAccountIndex }) => {
    const localSessions = accounts[currentAccountIndex].localSessions

    const lastIndex = localSessions ? localSessions.length - 1 : null

    if (lastIndex === null) return {}

    const currentSession = localSessions[lastIndex] ? localSessions[lastIndex] : []

    return currentSession
  }
)

export const currentAccountSelector = createSelector(
  selectIndexAndAccounts,
  ({ accounts, currentAccountIndex }) => accounts[currentAccountIndex]
)

export const currentProductsSelector = createSelector(
  selectIndexAndAccounts,
  ({ accounts, currentAccountIndex }) => accounts[currentAccountIndex].products
)