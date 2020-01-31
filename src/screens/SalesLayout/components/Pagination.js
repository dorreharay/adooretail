import React, { Fragment, } from 'react'
import { useSelector } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'

function Pagination(props) {
  const {
    swiperRef, accountWrapperVisibile,
    index, total,
  } = props

  const { deviceWidth } = useSelector(state => state.temp.dimensions)
  const accounts = useSelector(state => state.user.accounts)

  if(accounts.length === 1) {
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
              style={[styles.arrow, { borderWidth: 2, borderColor: '#FFFFFF26', backgroundColor: '#FFFFFF00' }]}
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
            <FastImage style={{ width: 20, height: 20, }} source={require('@images/erase.png')} />
          </TouchableOpacity>
        ) : (
            <TouchableOpacity
              style={[styles.arrow, { borderWidth: 2, borderColor: '#FFFFFF26', backgroundColor: '#FFFFFF00' }]}
              onPress={() => { }}
              activeOpacity={1}
            >

            </TouchableOpacity>
          )
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  paginationContainer: {
    position: 'absolute',
    bottom: 50,
    width: 110,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  arrow: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#FFFFFF26',
  }
})

export default Pagination
