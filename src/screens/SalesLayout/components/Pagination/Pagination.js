import React from 'react'
import { useSelector, } from 'react-redux'
import { View, TouchableOpacity, } from 'react-native'
import FastImage from 'react-native-fast-image'
import styles from './styles'

function Pagination(props) {
  const { swiperRef, accountWrapperVisibile, index, total, } = props

  const accounts = useSelector(state => state.user.accounts)
  const { deviceWidth } = useSelector(state => state.temp.dimensions)

  if (accounts.length === 1) {
    return null
  }

  return (
    <View style={[styles.paginationContainer, { left: (deviceWidth / 2) - 55, }]}>
      {accountWrapperVisibile && (
        index !== 0 ? (
          <TouchableOpacity
            style={styles.arrow}
            onPress={() => swiperRef.current.scrollBy(-1)}
            activeOpacity={1}
          >
            <FastImage style={{ width: 20, height: 20, }} source={require('@images/erase.png')} />
          </TouchableOpacity>
        ) : (
            <TouchableOpacity
              style={[styles.arrow, styles.bordered]}
              onPress={() => { }}
              activeOpacity={1}
            >

            </TouchableOpacity>
          )
      )}
      
      {accountWrapperVisibile && (
        index !== (total - 1) ? (
          <TouchableOpacity
            style={[styles.arrow, { transform: [{ rotate: '180deg' }] }]}
            onPress={() => swiperRef.current.scrollBy(1)}
            activeOpacity={1}
          >
            <FastImage
              style={{ width: 20, height: 20, }}
              source={require('@images/erase.png')}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.arrow, styles.bordered]}
            onPress={() => {}}
            activeOpacity={1}
          />
        )
      )}
    </View>
  )
}

export default Pagination
