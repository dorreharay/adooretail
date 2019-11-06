import React, { useRef, useState, useEffect, } from 'react'
import { View } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux';
import { setInitialSlide } from '../../reducers/UserReducer'
import _ from 'lodash'

import SharedBackground from '@shared/SharedBackground';

function AppSessions(props){
  const { 
    children, navigatorRef, NavigationService,
    changeInitialLoadingWrapperOpacity, 
    initialLoadingOpacity, initialLoadingVisibility,
  } = props

  const dispatch = useDispatch()

  const initialLoading = useSelector(state => state.user.initialLoading)
  const currentSession = useSelector(state => state.user.currentSession)
  const currentAccount = useSelector(state => state.user.currentAccount)

  useEffect(() => {
    if(initialLoading) {
      if(_.isEmpty(currentSession)) {
        if(_.isEmpty(currentAccount)) {

          // goes to <NoAccount />
          dispatch(setInitialSlide(0))
        } else {

          // goes to <Login />
          dispatch(setInitialSlide(1))
        }
        
        setTimeout(() => {
          if(initialLoadingVisibility) {
            changeInitialLoadingWrapperOpacity(false)
          }
        }, 700)
      } else {
        setTimeout(() => {
          NavigationService.setTopLevelNavigator(navigatorRef.current)
          setTimeout(() => {
            NavigationService.navigate('SalesLayout')
            setTimeout(() => {
              changeInitialLoadingWrapperOpacity(false)
            }, 250)
          }, 110)
        }, 100)
      }
    }
  }, [navigatorRef, initialLoading, currentSession, currentAccount])

  const screenProps = {
    initialLoadingVisibility,
    initialLoadingOpacity,
    changeInitialLoadingWrapperOpacity,
  }

  const withProps = React.Children.map(children, child =>
    React.cloneElement(child, { screenProps, })
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
