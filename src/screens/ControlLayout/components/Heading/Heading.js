import React, { useState, } from 'react'
import { View, Text, TouchableOpacity, } from 'react-native'
import { useDispatch, useSelector, } from 'react-redux'
import FastImage from 'react-native-fast-image'
import styles from './styles'

import { setStartCash, } from '@reducers/UserReducer'
import { setEndOfSessionStatus, setSessionModalState, setResetStatus, } from '@reducers/TempReducer';

function Heading(props) {
  const { navigation, activeTab, setActiveTab, } = props

  const dispatch = useDispatch()

  const account = useSelector(state => state.account)

  const [exitPromptVisible, setExitPromptState] = useState(false)

  const endSession = () => {
    dispatch(setStartCash(0))
    dispatch(setResetStatus(true))
    dispatch(setEndOfSessionStatus(true))
    dispatch(setSessionModalState(true))
    setExitPromptState(false)

    navigation.jumpTo('SalesLayout')
  }

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.jumpTo('SalesLayout')}
        scale={0.9}
      >
        <View style={styles.backButtonInner}>
          <FastImage
            style={styles.backIcon}
            source={require('@images/back.png')}
          />
          <Text style={styles.backIconText}>
            Назад до меню
          </Text>
        </View>
      </TouchableOpacity> */}

      <View>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => { }}
          activeOpacity={0.8}
        >
          <FastImage
            style={styles.accountIcon}
            source={require('@images/session_process.png')}
          />

          <Text style={[styles.menuItemActiveText, { fontSize: 18, }]}>
            {account ? account?.client_data?.business_name : ''}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuButton, activeTab === 0 && styles.activeMenuButton]}
          onPress={() => setActiveTab(0)}
          activeOpacity={1}
        >
          <View style={styles.accountIcon} />
          <Text style={[styles.menuItemText, activeTab === 0 && styles.menuItemActiveText]}>
            Операції
          </Text>
        </TouchableOpacity>
        {/* {settings.printer_enabled && (
          <TouchableOpacity
            style={[styles.menuButton, activeTab === 1 && styles.activeMenuButton]}
            onPress={() => setActiveTab(1)}
            activeOpacity={1}
          >
            <View style={styles.accountIcon} />
            <Text style={[styles.menuItemText, activeTab === 1 && styles.menuItemActiveText]}>
              Девайси
          </Text>
          </TouchableOpacity>
        )} */}
        {/* {settings.printer_enabled && (
          <TouchableOpacity
            style={[styles.menuButton, activeTab === 2 && styles.activeMenuButton]}
            onPress={() => setActiveTab(2)}
            activeOpacity={1}
          >
            <View style={styles.accountIcon} />
            <Text style={[styles.menuItemText, activeTab === 2 && styles.menuItemActiveText]}>
              Вигляд чеку
          </Text>
          </TouchableOpacity>
        )} */}
        <TouchableOpacity
          style={[styles.menuButton, activeTab === 3 && styles.activeMenuButton]}
          onPress={() => setActiveTab(3)}
          activeOpacity={1}
        >
          <View style={styles.accountIcon} />
          <Text style={[styles.menuItemText, activeTab === 3 && styles.menuItemActiveText]}>
            Налаштування
          </Text>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity
        style={[styles.menuButton, { marginBottom: 10, }]}
        onPress={() => setExitPromptState(true)}
        activeOpacity={1}
      >
        <FastImage
          style={styles.accountIcon}
          source={require('@images/logout.png')}
        />
        <Text style={styles.menuItemText}>
          Вийти з аккаунту
        </Text>
      </TouchableOpacity>

      <Modal
        visible={exitPromptVisible}
        footer={
          <ModalFooter>
            <ModalButton
              text='Скасувати'
              textStyle={[styles.promptText, { color: '#DB3E5A' }]}
              onPress={() => setExitPromptState(false)}
            />
            <ModalButton
              text='Закінчити та вийти'
              textStyle={[styles.promptText, { color: '#343434' }]}
              onPress={endSession}
            />
          </ModalFooter>
        }
      >
        <ModalContent style={{ width: deviceWidth * 0.40, }}>
          <Text style={[styles.promptText, { fontSize: 22, }]}>Ви точно хочете вийти з аккаунту?</Text>
          <Text style={[styles.promptText, { marginTop: 20, }]}>Актуальна зміна буде закінчена. Необхідно ввести кінцеву касу.</Text>
        </ModalContent>
      </Modal> */}
    </View>
  )
}

export default Heading
