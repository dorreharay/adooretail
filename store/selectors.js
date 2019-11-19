import { createSelector } from 'reselect'

const selectSessions = state => state.user.localSessions

export const currentSessionSelector = createSelector(
  selectSessions,
  localSessions => {
    const lastIndex = localSessions ? localSessions.length - 1 : null

    if(lastIndex === null) return {}

    const currentSession = localSessions[lastIndex] ? localSessions[lastIndex] : []

    return currentSession
  }
)