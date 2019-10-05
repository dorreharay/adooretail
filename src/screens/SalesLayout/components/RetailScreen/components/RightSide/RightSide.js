import React, { useRef, useState, useEffect, } from 'react'
import { Text, View, Image, TextInput, Alert, Animated, } from 'react-native'
import {useNetInfo} from "@react-native-community/netinfo";
import Toast, {DURATION} from 'react-native-easy-toast'
import { Menu, MenuOptions, MenuOption, MenuTrigger, withMenuContext,  } from 'react-native-popup-menu';
import _ from 'lodash'

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import styles from './styles'

import SharedButton from '../../../../../../components/SharedButton';
import Option from './Option'

// import PanelScreens from './PanelScreens/PanelScreens';

const onlineIcon = require('../../../../../../../assets/images/status_online.png')
const offlineIcon = require('../../../../../../../assets/images/status_offline.png')
const waitingIcon = require('../../../../../../../assets/images/status_waiting.png')

function RightSide(props) {
  const { slideTo } = props;

  const toast = useRef(null)

  const netInfo = useNetInfo();

  const [searchTerm, setSearchTerm] = useState(0)
  
  const loadProducts = useRef(_.throttle(() => {}, 5000))

  const loadAgain = () => {
    if(!netInfo.isConnected || !netInfo.isInternetReachable) {
      toast.current.show("Потрібне інтернет з'єднання", 1000);

      return
    }

    if(toast.current) {
      toast.current.show("Завантажую продукти", 1000)
      loadProducts.current()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.toolsBar}>
        <View style={styles.search}>
          <Image style={{ width: 20, height: 20, marginRight: 15, }} source={require('../../../../../../../assets/images/search.png')}></Image>
          <TextInput
            style={styles.inputText}
            value={searchTerm}
            placeholder=''
            onChangeText={(text) => setSearchTerm(text)}
          />

          <SharedButton
            onPress={() => setSearchTerm('')}
            buttonSizes={{ width: styles.search.height, height: styles.search.height, marginRight: 5, }}
            iconSizes={{ width: styles.search.height - 30, height: styles.search.height - 30 }}
            source={require('../../../../../../../assets/images/x_icon.png')}
          />
        </View>
        
        <View style={styles.connection}>
          <Image style={{ width: 10, height: 10, marginRight: 10 }} source={netInfo.isConnected ? netInfo.isInternetReachable ? onlineIcon : waitingIcon : offlineIcon} />
          <Text style={styles.connectionText}>
            {netInfo.isConnected && netInfo.isInternetReachable && 'online'}
            {!netInfo.isConnected && 'offline'}
            {netInfo.isConnected && !netInfo.isInternetReachable && 'waiting'}
          </Text>
        </View>
        <SharedButton
          onPress={loadAgain}
          buttonSizes={{ width: styles.update.width, height: styles.update.height, marginRight: 10, }}
          iconSizes={{ width: styles.update.width - 27, height: styles.update.height - 26, }}
          source={require('../../../../../../../assets/images/reload.png')}
          rotateOnPress loadAgain={loadAgain} backgroundColor={'#FFFFFF'}
        />
        <SharedButton
          onPress={() => props.ctx.menuActions.toggleMenu('bar')}
          buttonSizes={{ width: styles.menu.width, height: styles.menu.height, }}
          iconSizes={{ width: styles.menu.width - 24, height: styles.menu.height - 27, }}
          source={require('../../../../../../../assets/images/menu.png')}
          backgroundColor={'#FFFFFF'} performOnStart
        >
          {/* props.ctx.menuActions.open() */}
          <Menu name='bar' onSelect={() => slideTo('next')}>
            <MenuTrigger
              children={
                <View style={{ width: 50, alignItems: 'center', justifyContent: 'center', }}>
                  <Image style={{ width: 20, height: 18, }} source={require('../../../../../../../assets/images/menu.png')}/>
                </View>
              }
              customStyles={{
                triggerWrapper: styles.triggerWrapper,
                triggerText: styles.searchBarText,
                TriggerTouchableComponent: TouchableWithoutFeedback,
              }}
            />
            <MenuOptions 
              customStyles={{
                optionsContainer: styles.optionsContainer,
                optionWrapper: styles.optionWrapper,
              }}
            >
              <MenuOption children={<Option text='ІСТОРІЯ ЗАМОВЛЕНЬ' dimensions={[19, 23]} icon={require('../../../../../../../assets/images/history.png')} index={0} />} value={1} />
              <MenuOption children={<Option text='ІНКАСАЦІЯ' dimensions={[21, 20]} icon={require('../../../../../../../assets/images/warehouse.png')} index={1} />} value={2} />
              <MenuOption children={<Option text='ДЕВАЙСИ' dimensions={[20, 21]} icon={require('../../../../../../../assets/images/devices.png')} index={2} />} value={3} />
              <MenuOption children={<Option text='НАЛАШТУВАННЯ' dimensions={[20, 21]} icon={require('../../../../../../../assets/images/settings.png')} index={3} />} value={4} />
              <MenuOption children={<Option text='ЗАКІНЧИТИ ЗМІНУ' dimensions={[20, 20]} icon={require('../../../../../../../assets/images/end.png')} index={4} />} value={5} />
            </MenuOptions>
          </Menu>
        </SharedButton>
      </View>
      <Toast
        ref={toast}
        opacity={1}
        style={{ paddingHorizontal: 20, backgroundColor:'#00000066'}}
        position='bottom'
        positionValue={50}
        textStyle={styles.toastText}
        fadeInDuration={600}
        fadeOutDuration={800}
      />
    </View>
  )
}

export default withMenuContext(RightSide)