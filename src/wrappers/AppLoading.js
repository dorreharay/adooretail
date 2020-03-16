import React, { useState, } from 'react'
import _ from 'lodash'
import AnimatedSplash from "react-native-animated-splash-screen";

function AppLoading({ children, }) {
  const [initialLoadingVisibility, setInitialLoadingVisibility] = useState(false)

  const withProps = React.Children.map(children, child =>
    React.cloneElement(child, {
      initialLoadingVisibility,
      setInitialLoadingVisibility,
    })
  );

  return withProps
}

export default AppLoading
