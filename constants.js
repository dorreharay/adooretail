import { deviceHeight } from '@dimensions'

export const headerHeight = 68

export const headerButtonSizes = {
    justifyContent: 'center',
    width: deviceHeight < 500 ? headerHeight - 30 : headerHeight,
    height: deviceHeight < 500 ? headerHeight - 30 : headerHeight,
}
export const headerIcon = {
    width: deviceHeight < 500 ? headerHeight - 55 : headerHeight - 50,
    height: deviceHeight < 500 ? headerHeight - 55 : headerHeight - 50,
}

export const lsInstance = {
    width: deviceHeight < 500 ? headerHeight - 30 : headerHeight - 20,
    height: deviceHeight < 500 ? headerHeight - 30 : headerHeight - 20,
}
