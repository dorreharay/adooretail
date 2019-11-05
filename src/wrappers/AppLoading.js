import React, { useRef, useState, useEffect, } from 'react'
import { View, Animated, } from 'react-native'
import _ from 'lodash'

function AppLoading({ children, }){
  const [initialLoadingOpacity] = useState(new Animated.Value(1))
  const [initialLoadingVisibility, setInitialLoadingVisibility] = useState(true)

  const changeInitialLoadingWrapperOpacity = (visible) => {
    Animated.timing(
      initialLoadingOpacity,
      {
        toValue: visible ? 1 : 0,
        duration: 800,
        useNativeDriver: true,
      },
    ).start()
    setTimeout(() => setInitialLoadingVisibility(false), 800)
  }

  const withProps = React.Children.map(children, child =>
    React.cloneElement(child, { 
      changeInitialLoadingWrapperOpacity,
      initialLoadingOpacity,
      initialLoadingVisibility,
      changeInitialLoadingWrapperOpacity,
    })
  );

  return withProps
}

export default AppLoading