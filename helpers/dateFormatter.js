import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import 'dayjs/locale/uk'
dayjs.locale('uk')
dayjs.extend(isBetween)

export function getFormattedDate(format, date) {
  if (date) {
    if (typeof date === 'object') {
      return (
        dayjs()
          .hour(date.hours)
          .minute(date.minutes)
          .second(date.seconds)
          .format(format)
      )
    }

    return dayjs(date).format(format)
  }

  return dayjs().format(format)
}

export function getSubstractDate(format, days) {
  return dayjs().subtract(days, 'day').format(format)
}

export function getIsBetween(compared, start, end) {
  if (compared) {
    return dayjs(compared).isBetween(start, end)
  }

  return dayjs().isBetween(start, end)
}

export function getIsBetweenAdvanced(compared, start, end) {
  if (typeof start === 'object') {
    if (compared) {
      return dayjs(compared).isBetween(dayjs().startOf(start.start), dayjs().endOf(start.start))
    }

    return dayjs().isBetween(dayjs().startOf(start.start), dayjs().end(start.start))
  }

  if (compared) {
    return dayjs(compared).isBetween(start, end)
  }

  return dayjs().isBetween(start, end)
}

export function getStartOfPeriod(period) {
  return dayjs().startOf(period).toISOString()
}

export function getEndOfPeriod(period) {
  return dayjs().endOf(period).toISOString()
}

export function getUpperCaseDate(format, date) {
  if (date) {
    return dayjs(date).format(format).charAt(0).toUpperCase() + dayjs(date).format(format).slice(1)
  }

  return dayjs().format(format).charAt(0).toUpperCase() + dayjs().format(format).slice(1)
}

export function getDateByCondition(startTime, activeFilter) {
  return dayjs(startTime).isBetween(dayjs().startOf(activeFilter ? activeFilter.code : 'day'), dayjs().endOf(activeFilter ? activeFilter.code : 'day'))
}

export function getDiff(start, end, unit) {
  return dayjs(start).diff(dayjs(end), unit)
}