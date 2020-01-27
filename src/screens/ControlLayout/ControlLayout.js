import React, { useState, } from 'react'
import { View, StyleSheet, Animated, } from 'react-native'
import { useSelector } from 'react-redux'

import ControlPanel from './components/ControlPanel/ControlPanel'
import ContentPanel from './components/ContentPanel/ContentPanel'

import AllCategories from './components/ContentPanel/Pages/AllCategories/AllCategories'
import History from './components/ContentPanel/Pages/History/History'
import Settings from './components/ContentPanel/Pages/Settings/Settings'

function ControlLayout(props) {
  const { navigation } = props

  const { deviceWidth } = useSelector(state => state.temp.dimensions)

  const [animatedX] = useState(new Animated.Value(0))

  const [tabs] = useState([
      {
        index: 0,
        title: 'Всі категорії',
        iconSource: require('@images/house.png'),
        onPress: () => handleCategoryPress(0),
        component: <AllCategories />,
      },
      // {
      //   index: 1,
      //   title: 'Банк ідей',
      //   iconSource: require('@images/light.png'),
      //   onPress: () => handleCategoryPress(1),
      //   component: <View style={{ flex: 1, }}></View>,
      // },
      {
        index: 1,
        title: 'Історія замовлень',
        iconSource: require('@images/history1.png'),
        onPress: () => handleCategoryPress(1),
        component: <History />,
      },
      {
        index: 2,
        title: 'Склад',
        iconSource: require('@images/package.png'),
        onPress: () => handleCategoryPress(2),
        component: <View style={{ flex: 1, }}></View>,
      },
      {
        index: 3,
        title: 'Девайси',
        iconSource: require('@images/printer.png'),
        onPress: () => handleCategoryPress(3),
        component: <View style={{ flex: 1, }}></View>,
      },
      {
        index: 4,
        title: 'Фідбек',
        iconSource: require('@images/telephone.png'),
        onPress: () => handleCategoryPress(4),
        component: <View style={{ flex: 1, }}></View>,
      },
      {
        index: 5,
        title: 'Налаштування',
        iconSource: require('@images/gear-option.png'),
        sizes: { width: 20, height: 20, },
        onPress: () => handleCategoryPress(5),
        component: <Settings />
      },
    ])

  const [activeCategory, setActiveCategory] = useState(0)

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

  const handleCategoryPress = (index) => {
    setActiveCategory(index)
  }

  const handleSlideIndex = (slideIndex) => {
    setActiveCategory(slideIndex)
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
