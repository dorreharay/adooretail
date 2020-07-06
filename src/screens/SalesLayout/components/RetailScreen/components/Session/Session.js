import React, { useState, useEffect, useMemo, useRef, } from 'react'
import { View, Text, TouchableOpacity, TextInput, TouchableOpacityBase, ScrollView, } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Toast, { DURATION } from 'react-native-easy-toast'
import styles from './styles'
import FastImage from 'react-native-fast-image'

import { syncSessions, } from '@helpers'
import { currentSessionSelector, } from '@selectors'
import { setStartCash, setEmployees, updateCurrentSession, restoreDefaultShift, resetSessions, } from '@reducers/UserReducer'
import { setEndOfSessionStatus, setResetStatus, } from '@reducers/TempReducer'

import { getFormattedDate, } from '@dateFormatter'
import { deviceWidth, deviceHeight } from '@dimensions'

function Session(props) {
  const { isVisible, setSessionModalVisible } = props

  const toastRef = useRef(null)

  const dispatch = useDispatch()
  const navigation = useNavigation()

  const currentSession = useSelector(currentSessionSelector)
  const { employees, img_url, shift_start, shift_end, } = useSelector(state => state.user.currentAccount)
  const endOfSession = useSelector(state => state.temp.endOfSession)
  const modalStatus = useSelector(state => state.temp.modalStatus)

  const [startSum, setStartSum] = useState('0')
  const [endSum, setEndSum] = useState('0')
  const [employeesPickerOpened, setEmployeesPicker] = useState(false)
  const [selected, setSelected] = useState([])
  const [submitStatus, setSubmitStatus] = useState(false)

  const handleChange = (e) => {
    let value = e.nativeEvent.text
      .replace(/[^.\d]/g, '')
      .replace('..', '.')

    if (value === '.') {
      value = value.replace('.', '')
    }

    const arr = value.split('')

    if (arr.filter(item => item === '.').length > 1) {
      value = arr.reverse().join('').replace('.', '')
      value = value.split('').reverse().join('')
    }

    if (endOfSession) {
      setEndSum(value)
    } else {
      setStartSum(value)
    }
  }

  const clearText = () => {
    if (endOfSession) {
      setEndSum(prev => prev === '0' ? '' : prev)
    } else {
      setStartSum(prev => prev === '0' ? '' : prev)
    }
  }

  const handleSubmit = () => {
    if(!endOfSession) {
      startSession()
    } else {
      endSession()
    }
  }

  const startSession = () => {
    if (!canProceed) return

    function guidGenerator() {
      let S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    const selectedEmployees = employees.filter((item, index) => selected.includes(index)).map(item => item.name)

    let newSession = {
      startSum,
      employees: selectedEmployees,
      incasations: [],
      receipts: [],
      shift_start,
      shift_end,
      localId: guidGenerator(),
      transactions: [],
    }

    dispatch(updateCurrentSession({ status: 'new', newSessionProp: newSession }))
    dispatch(setEmployees([]))
    dispatch(setStartCash(0))

    setSessionModalVisible(false)
  }

  const endSession = async () => {
    if (!canProceed) return

    dispatch(updateCurrentSession({ status: 'end', endCash: endSum }))
    dispatch(restoreDefaultShift())

    setSubmitStatus(true)

    setTimeout(() => {
      navigation.jumpTo('Login')

      setSubmitStatus(false)

      dispatch(setEndOfSessionStatus(false))
    }, 1000)

    await syncSessions(() => { }, null, 1)

    dispatch(resetSessions())
  }


  const renderMainContent = () => {
    return (
      <>
        <Text style={styles.heading}>{endOfSession ? modalStatus ? 'Закінчіть попередню касову зміну' : 'Закінчіть касову зміну' : 'Розпочніть касову зміну'}</Text>

        <View>
          <Text style={styles.label}>Готівкова каса на початку зміни</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, endOfSession && styles.disabled]}
              value={startSum}
              onChange={handleChange}
              maxLength={7}
              onFocus={clearText}
              keyboardType={'number-pad'}
              pointerEvents={endOfSession ? 'none' : 'auto'}
            />
            <Text style={styles.currency}>грн</Text>
          </View>
        </View>
        {endOfSession ? (
          <>
            <View>
              <Text style={styles.label}>Готівкова каса на кінці зміни</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={endSum}
                  onChange={handleChange}
                  maxLength={7}
                  onFocus={clearText}
                  keyboardType={'number-pad'}
                />
                <Text style={styles.currency}>грн</Text>
              </View>
            </View>
            <View>
              <Text style={styles.label}>Звіт терміналу</Text>
              <View style={styles.inputContainer}>
                <TouchableOpacity
                  style={styles.debitReportButton}
                  activeOpacity={0.8}
                >
                  <Text style={styles.debitReportButtonText}>Завантажити фото</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
            <View>
              <Text style={styles.label}>Працівники</Text>
              <View style={styles.inputContainer}>
                <TouchableOpacity
                  style={styles.debitReportButton}
                  onPress={() => setEmployeesPicker(true)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.debitReportButtonText}>{selected.length === 0 ? 'Натисніть, щоб вибрати працівників' : `${selected.length === 1 ? 'Обраний' : 'Обрано'} ${selected.length} ${selected.length === 1 ? 'працівник' : selected.length < 5 ? 'працівника' : 'працівників'}`}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.linearButton}
          activeOpacity={1}
        >
          <LinearGradient
            style={styles.linearButtonGradient}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={canProceed ? ['#DB3E69', '#EF9058'] : ['#DB3E6955', '#EF905855']}
          >
            <Text style={styles.linearButtonText}>{submitStatus ? 'Касова зміна завершена' : 'Готово'}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </>
    )
  }

  const renderEmployeesList = () => {
    return (
      <>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, }}>
          <Text style={[styles.heading, { marginTop: 0, marginBottom: 0, }]}>Працівники</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => setEmployeesPicker(false)}>
            <FastImage
              style={{ width: 20, height: 20, }}
              source={require('@images/x_icon.png')}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ height: deviceHeight * 0.5, marginBottom: 15, }}>
          {employees.map((employee, index) => (
            <TouchableOpacity 
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#F2F2F2', }}
              onPress={() => setSelected(prev => prev.includes(index) ? prev.filter(item => item !== index) : ([...prev, index]))}
              activeOpacity={1}
            >
              <View style={styles.employee} key={index}>
                <FastImage
                  style={{ width: 50, height: 50, borderRadius: 100, }}
                  source={{ uri: employee.icon ? employee.icon : img_url }}
                />
                <Text style={styles.employeeName}>{employee.name}</Text>
              </View>

              {selected.includes(index) && (
                <View style={styles.selectedButton} key={index}>
                  <FastImage
                    style={{ width: 16, height: 16, }}
                    source={require('@images/tick_white.png')}
                  />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </>
    )
  }

  useEffect(() => {
    if (endOfSession) {
      setStartSum(currentSession.startSum)
      if (isVisible) {
        setStartSum(currentSession.startSum)
      }
    }
  }, [isVisible])

  const canProceed = useMemo(() => {
    return endOfSession ? +endSum > 0 && endSum !== '' : +startSum > 0 && startSum !== '' && selected.length > 0
  }, [startSum, endSum, selected])

  return (
    <View style={[styles.wrapper, isVisible && { top: 0, }]}>
      <TouchableOpacity
        style={styles.touchWrapper}
        onPress={() => {
          if (!endOfSession || modalStatus) return
          setSessionModalVisible(false)
        }}
        activeOpacity={1}
      />
      <KeyboardAwareScrollView
        style={{ zIndex: 13, }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        extraScrollHeight={270}
        keyboardOpeningTime={0}
        enableOnAndroid={true}
      >
        <View style={styles.container}>
          {employeesPickerOpened ? renderEmployeesList() : renderMainContent()}
        </View>
      </KeyboardAwareScrollView>
      <Toast
        ref={toastRef}
        opacity={1}
        style={{ paddingHorizontal: 40, backgroundColor: '#00000088' }}
        position='bottom'
        positionValue={150}
        textStyle={styles.toastText}
        fadeInDuration={200}
        fadeOutDuration={800}
      />
    </View>
  )
}

export default Session