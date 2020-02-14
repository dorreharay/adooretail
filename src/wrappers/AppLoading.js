import React, { useState, useEffect, useRef, } from 'react'
import { Animated, } from 'react-native'
import _ from 'lodash'
import Orientation from 'react-native-orientation';

function AppLoading({ children, }){
  const [initialLoadingOpacity] = useState(new Animated.Value(1))
  const [initialLoadingVisibility, setInitialLoadingVisibility] = useState(true)

  const timerRef = useRef(null)

  useEffect(() => {
    // Orientation.lockToLandscape();

    return () => {
      clearTimeout(timerRef.current)
    }
  }, [])

  const changeInitialLoadingWrapperOpacity = (visible) => {
    Animated.timing(
      initialLoadingOpacity,
      {
        toValue: visible ? 1 : 0,
        duration: 800,
        useNativeDriver: true,
      },
    ).start()
    timerRef.current = setTimeout(() => setInitialLoadingVisibility(false), 800)
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
