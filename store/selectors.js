import { createSelector } from 'reselect';

const selectIndexAndAccounts = state => ({
  accounts: state.user.accounts,
  currentAccountIndex: state.user.currentAccountIndex,
  currentAccount: state.user.currentAccount,
});

export const activeReceiptSelector = createSelector(
  state => ({
    receipts: state.orders.receipts,
    activeReceiptIndex: state.orders.activeReceiptIndex,
  }),
  ({ receipts, activeReceiptIndex }) => {
    return receipts[activeReceiptIndex];
  },
);

export const currentSessionSelector = createSelector(
  selectIndexAndAccounts,
  ({ currentAccount }) => {
    const localSessions = currentAccount ? currentAccount?.localSessions : [];

    const lastIndex = localSessions ? localSessions.length - 1 : null;

    if (lastIndex === null) return {};

    const currentSession = localSessions[lastIndex]
      ? localSessions[lastIndex]
      : [];

    return currentSession;
  },
);

export const lastSessionSelector = createSelector(
  state => state.sessions.list,
  sessions => {
    if (!sessions?.length) return null;

    return sessions.slice(-1)[0];
  },
);

export const currentAccountSelector = createSelector(
  selectIndexAndAccounts,
  ({ accounts, currentAccountIndex }) => accounts[currentAccountIndex],
);

export const currentProductsSelector = createSelector(
  selectIndexAndAccounts,
  ({ accounts, currentAccountIndex }) => accounts[currentAccountIndex].products,
);
