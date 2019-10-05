import React, { Fragment } from 'react';
import { View, Text, StyleSheet, Alert, } from 'react-native';

import SharedButton from '../../../../../../../components/SharedButton'

// import ReceiptsHistoryList from './ReceiptsHistoryList';
// import Incasation from './Incasation';
// import Devices from './Devices';
// import Settings from './Settings';

function PanelScreens({ token, panelStates, slideTo }) {
  // const { receiptsHistoryVisible, incasationsVisible, devicesVisible, profileVisible, } = panelStates;

  return (
    <Fragment>
      <View style={{ flex: 1, backgroundColor: '#F4F4F4'  }}>
        <SharedButton
          onPress={() => setTimeout(() => slideTo('prev'), 250)}
          buttonSizes={{ ...styles.goBack, width: 60, height: 60, }}
          iconSizes={{ width: 18, height: 18, }}
          source={require('../../../../../../../../assets/images/x_icon.png')}
          backgroundColor='#FFFFFF99' borderRadius={50}
        />
      </View>
      {/* {receiptsHistoryVisible && <ReceiptsHistoryList token={token} />}

      {incasationsVisible && <Incasation token={token} />}

      {devicesVisible && <Devices token={token} />}

      {profileVisible && <Settings token={token} />} */}
    </Fragment>
  )
}

const styles = StyleSheet.create({
  goBack: {
    position: 'absolute',
    right: 40,
    top: 40,
    width: 50,
    height: 50,
  }
})

export default PanelScreens
