import React from 'react'
import { View, Text, StyleSheet, } from 'react-native'

import Heading from './components/Heading/Heading'
import History from './components/ContentPanel/Pages/History/History'

function NewControlLayout(props) {
  const { navigation } = props

  return (
    <View style={styles.container}>
      <Heading navigation={navigation} />

      <History />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    paddingTop: 60,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    backgroundColor: '#F1F1F1',
  },
})

export default NewControlLayout
