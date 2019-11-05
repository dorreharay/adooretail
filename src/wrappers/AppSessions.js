import React, { useRef, useState, useEffect, } from 'react'
import { View } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux';
import _ from 'lodash'

import SharedBackground from '@shared/SharedBackground';

function AppSessions(props){
  const { 
    children, navigatorRef, NavigationService,
    changeInitialLoadingWrapperOpacity, 
    initialLoadingOpacity, initialLoadingVisibility,
  } = props

  const initialLoading = useSelector(state => state.user.initialLoading)
  const currentSession = useSelector(state => state.user.currentSession)
  const currentAccount = useSelector(state => state.user.currentAccount)

  const [forceSlide, setForceSlide] = useState(false)

  useEffect(() => {
    if(initialLoading) {
      if(!_.isEmpty(currentSession)) {
        setTimeout(() => {
          NavigationService.setTopLevelNavigator(navigatorRef.current)
          setTimeout(() => {
            NavigationService.navigate('SalesLayout')
            setTimeout(() => {
              changeInitialLoadingWrapperOpacity(false)
            }, 250)
          }, 110)
        }, 100)
      } else {
        if(!_.isEmpty(currentAccount)) {
          setForceSlide(1)
        }
      }
    }
  }, [navigatorRef, initialLoading, currentSession])

  const screenProps = {
    initialLoadingVisibility,
    initialLoadingOpacity,
    forceSlide,
    changeInitialLoadingWrapperOpacity,
  }

  const withProps = React.Children.map(children, child =>
    React.cloneElement(child, { forceSlide, setForceSlide, screenProps, })
  );

  return (
    <SharedBackground
      loading={initialLoadingVisibility}
      opacity={initialLoadingOpacity}
      source={require('@images/background-adv3.png')}
    >
      <View style={{ width: '100%', height: '100%', zIndex: 10 }}>
        {withProps}
      </View>
    </SharedBackground>
  )
}

export default AppSessions
