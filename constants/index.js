import { deviceHeight } from '@dimensions';

export const PAYMENT_TYPES = {
  CASH: {
    key: 0,
    name: 'Готівка',
    apiName: 'CASH',
    imageSource: require('@images/cash.png'),
  },
  DEBIT: {
    key: 1,
    name: 'Картка',
    apiName: 'DEBIT',
    imageSource: require('@images/debit.png'),
  },
};

export const PAYMENT_STATUSES = {
  INITIAL: {
    index: 0,
    statusColor: '#EDEDED',
    statusText: 'Очікування',
  },
  WAITING: {
    index: 1,
    statusColor: 'yellow',
    statusText: 'Очікую підтвердження оплати',
  },
  PRINTING: {
    index: 1,
    statusColor: '#DC4EFF',
    statusText: 'Друкую чек',
  },
  SUCCESS: {
    index: 2,
    statusColor: '#35C56F',
    statusText: 'Оплата проведена',
  },
};

export const headerHeight = 68;

export const headerButtonSizes = {
  justifyContent: 'center',
  width: deviceHeight < 500 ? headerHeight - 30 : headerHeight,
  height: deviceHeight < 500 ? headerHeight - 30 : headerHeight,
};
export const headerIcon = {
  width: deviceHeight < 500 ? headerHeight - 55 : headerHeight - 50,
  height: deviceHeight < 500 ? headerHeight - 55 : headerHeight - 50,
};

export const lsInstance = {
  width: deviceHeight < 500 ? headerHeight - 30 : headerHeight - 20,
  height: deviceHeight < 500 ? headerHeight - 30 : headerHeight - 20,
};
