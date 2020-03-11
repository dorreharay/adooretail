import React, { useState, useMemo, } from 'react'
import { View, StyleSheet, Animated, } from 'react-native'
import { useSelector } from 'react-redux'

import ControlPanel from './components/ControlPanel/ControlPanel'
import ContentPanel from './components/ContentPanel/ContentPanel'

import Devices from './components/ContentPanel/Pages/Devices/Devices'
import History from './components/ContentPanel/Pages/History/History'
import Settings from './components/ContentPanel/Pages/Settings/Settings'
import Transactions from './components/ContentPanel/Pages/Transactions/Transactions'

import { deviceWidth, deviceHeight } from '@dimensions'

function ControlLayout(props) {
  const { route, navigation } = props

  const [animatedX] = useState(new Animated.Value(0))

  const [tabs] = useState([
    {
      index: 0,
      title: 'Історія замовлень',
      iconSource: require('@images/history.png'),
      onPress: () => handleCategoryPress(0),
      component: <History />,
    },
    {
      index: 1,
      title: 'Транзакції',
      iconSource: require('@images/package.png'),
      onPress: () => handleCategoryPress(1),
      component: <Transactions />,
    },
    {
      index: 2,
      title: 'Девайси',
      iconSource: require('@images/printer.png'),
      onPress: () => handleCategoryPress(2),
      component: <Devices />,
    },
    {
      index: 3,
      title: 'Фідбек',
      iconSource: require('@images/telephone.png'),
      onPress: () => handleCategoryPress(3),
      component: <View style={{ flex: 1, }}></View>,
    },
    {
      index: 4,
      title: 'Налаштування',
      iconSource: require('@images/gear-option.png'),
      sizes: { width: 20, height: 20, },
      onPress: () => handleCategoryPress(4),
      component: <Settings />
    },
  ])

  const [activeCategory, setActiveCategory] = useState({ index: 1, animated: true })

  useMemo(() => {
    if (navigation.state.params) {
      setActiveCategory({ index: navigation.state.params.screen, animated: false, })
    }
  }, [navigation])

  // -deviceWidth * 0.2
  const openPanel = () => {
    Animated.timing(
      animatedX,
      {
        toValue: 0,
        duration: 300,
      },
    ).start()
  }

  const closePanel = () => {

    return

    Animated.timing(
      animatedX,
      {
        toValue: -deviceWidth * 0.2,
        duration: 300,
      },
    ).start()
  }

  const handleCategoryPress = (index, animated = true) => {
    setActiveCategory({ index, animated })
  }

  const handleSlideIndex = (index, animated = true) => {
    setActiveCategory({ index, animated })
  }

  return (
    <Animated.View style={[styles.container, { width: deviceWidth * 1, left: animatedX }]}>
      <ControlPanel
        tabs={tabs}
        activeCategory={activeCategory}
        handleCategoryPress={handleCategoryPress}
      />
      <ContentPanel
        tabs={tabs}
        handleSlideIndex={handleSlideIndex}
        animatedX={animatedX}
        openPanel={openPanel}
        closePanel={closePanel}
        navigation={navigation}
        activeCategory={activeCategory}
        handleCategoryPress={handleCategoryPress}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    height: '100%',
  },
})

export default ControlLayout
