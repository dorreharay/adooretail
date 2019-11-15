export const currentSessionSelector = state => {
  const localSessions = state.user.localSessions
  const lastIndex = localSessions ? localSessions.length - 1 : null

  if(lastIndex === null) return {}

  const currentSession = localSessions[lastIndex] ? localSessions[lastIndex] : []

  return currentSession
}