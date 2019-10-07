import React, { useRef, useState, useEffect, } from 'react'
import { Text, View, Image, TextInput, Alert, Animated, } from 'react-native'
import {useNetInfo} from "@react-native-community/netinfo";
import Toast, {DURATION} from 'react-native-easy-toast'
import { Menu, MenuOptions, MenuOption, MenuTrigger, withMenuContext,  } from 'react-native-popup-menu';
import _ from 'lodash'
import styles from './styles'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { PROBA_REGULAR } from '@fonts'

import SharedButton from '../../../../../../components/SharedButton';
import Option from './Option'
import Products from './Products/Products'

const onlineIcon = require('@images/status_online.png')
const offlineIcon = require('@images/status_offline.png')
const waitingIcon = require('@images/status_waiting.png')

function RightSide(props) {
  const { slideTo, products, loadProducts } = props;

  const toast = useRef(null)

  const netInfo = useNetInfo();

  const [searchTerm, setSearchTerm] = useState(0)
  
  const loadProductsThrottled = useRef(_.throttle(() => loadProducts(), 5000))

  const loadAgain = () => {
    if(!netInfo.isConnected || !netInfo.isInternetReachable) {
      toast.current.show("Потрібне інтернет з'єднання", 1000);

      return
    }

    if(toast.current) {
      toast.current.show("Оновлення продуктів", 1000)
      loadProductsThrottled.current()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.toolsBar}>
        <View style={styles.search}>
          <Image style={{ width: 18, height: 18, marginRight: 15, }} source={require('@images/search.png')}></Image>
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
            source={require('@images/x_icon.png')}
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
          source={require('@images/reload.png')}
          rotateOnPress loadAgain={loadAgain} backgroundColor={'#FFFFFF'}
        />
        <SharedButton
          onPress={() => props.ctx.menuActions.toggleMenu('bar')}
          buttonSizes={{ width: styles.menu.width, height: styles.menu.height, }}
          iconSizes={{ width: styles.menu.width - 24, height: styles.menu.height - 27, }}
          source={require('@images/menu.png')}
          backgroundColor={'#FFFFFF'} performOnStart
        >
          {/* props.ctx.menuActions.open() */}
          <Menu name='bar' onSelect={() => slideTo('next')}>
            <MenuTrigger
              children={
                <View style={{ width: 50, alignItems: 'center', justifyContent: 'center', }}>
                  <Image style={{ width: 20, height: 18, }} source={require('@images/menu.png')}/>
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
              <MenuOption children={<Option text='ІСТОРІЯ ЗАМОВЛЕНЬ' dimensions={[16, 19]} icon={require('@images/history.png')} index={0} />} value={1} />
              <MenuOption children={<Option text='ІНКАСАЦІЯ' dimensions={[17, 16]} icon={require('@images/warehouse.png')} index={1} />} value={2} />
              <MenuOption children={<Option text='ДЕВАЙСИ' dimensions={[17, 18]} icon={require('@images/devices.png')} index={2} />} value={3} />
              <MenuOption children={<Option text='НАЛАШТУВАННЯ' dimensions={[17, 18]} icon={require('@images/settings.png')} index={3} />} value={4} />
              <MenuOption children={<Option text='ЗАКІНЧИТИ ЗМІНУ' dimensions={[20, 19]} icon={require('@images/flag.png')} index={4} />} value={5} />
            </MenuOptions>
          </Menu>
        </SharedButton>
      </View>
      <Products products={products} />
      <Toast
        ref={toast}
        opacity={1}
        style={{ paddingHorizontal: 20, backgroundColor:'#00000066'}}
        position='bottom'
        positionValue={50}
        textStyle={{
          marginBottom: 2,
          color: '#FFFFFF',
          fontSize: 17,
          fontFamily: PROBA_REGULAR,
        }}
        fadeInDuration={600}
        fadeOutDuration={800}
      />
    </View>
  )
}

export default withMenuContext(RightSide)