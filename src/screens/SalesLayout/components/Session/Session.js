import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Toast, { DURATION } from 'react-native-easy-toast';
import BackgroundTimer from 'react-native-background-timer';
import styles from './styles';
import FastImage from 'react-native-fast-image';

import { dbidGenerator } from '@helpers';

import { syncSessions } from '@helpers';
import { lastSessionSelector } from '@selectors';
import {
  updateCurrentSession,
  restoreDefaultShift,
  resetSessions,
  resetUser,
} from '@reducers/UserReducer';
import { createSession, updateSession } from '@reducers/SessionReducer';
import {
  setEndOfSessionStatus,
  setSessionModalState,
} from '@reducers/TempReducer';

import { deviceHeight } from '@dimensions';
import _BackgroundTimer from 'react-native-background-timer';

function Session() {
  const toastRef = useRef(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const lastSession = useSelector(lastSessionSelector);
  const account = useSelector(state => state.account);
  const endOfSession = useSelector(state => state.temp.endOfSession);
  const modalStatus = useSelector(state => state.temp.modalStatus);
  const sessionModalVisible = useSelector(
    state => state.temp.sessionModalVisible,
  );
  const resetAccount = useSelector(state => state.temp.resetAccount);

  const [values, setValues] = useState({
    total_start: 0,
    total_end: 0,
    selected_employees: [],
  });
  const [employeesPickerOpened, setEmployeesPicker] = useState(false);

  const handleValue = field => value => {
    setValues(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChange = e => {
    let value = e.nativeEvent.text.replace(/[^.\d]/g, '').replace('..', '.');

    if (value === '.') {
      value = value.replace('.', '');
    }

    const arr = value.split('');

    if (arr.filter(item => item === '.').length > 1) {
      value = arr
        .reverse()
        .join('')
        .replace('.', '');
      value = value
        .split('')
        .reverse()
        .join('');
    }

    if (endOfSession) {
      handleValue('total_end')(value);
    } else {
      handleValue('total_start')(value);
    }
  };

  const clearText = () => {
    if (endOfSession) {
      handleValue('total_end')(prev => (prev === '0' ? '' : prev));
    } else {
      handleValue('total_start')(prev => (prev === '0' ? '' : prev));
    }
  };

  const handleSubmit = () => {
    if (!endOfSession) {
      startSession();
    } else {
      endSession();
    }
  };

  const startSession = () => {
    if (!canProceed) return;

    const newSession = {
      employees: values.selected_employees,
      receipts: [],
      transactions: [],
      summary: {
        total_start: +values?.total_start || 0,
        total_end: null,
        time_start: new Date().toISOString(),
        time_end: null,
        zbalance: null,
      },
      client_id: account?._id,
      session_id: dbidGenerator(),
    };

    setValues({
      total_start: 0,
      total_end: 0,
      selected_employees: [],
    });

    dispatch(createSession(newSession));

    dispatch(setSessionModalState(false));
  };

  const endSession = async () => {
    if (!canProceed) return;

    dispatch(
      updateSession({
        session_id: lastSession?.session_id,
        summary: {
          total_end: +values?.total_end || 0,
          time_end: new Date().toISOString(),
          zbalance: +values?.zbalance,
        },
      }),
    );

    navigation.jumpTo('Login');

    BackgroundTimer.setTimeout(() => {
      handleValue('total_end')(0);
      dispatch(setEndOfSessionStatus(false));
      dispatch(setSessionModalState(true));
    }, 300);

    await syncSessions();

    // dispatch(resetSessions());
  };

  const renderMainContent = () => {
    return (
      <View style={{ width: '86%', paddingTop: 35, paddingBottom: 30 }}>
        <Text style={styles.heading}>
          {endOfSession ? 'Закінчити касову зміну' : 'Розпочати касову зміну'}
        </Text>

        {!endOfSession && (
          <View>
            <Text style={styles.label}>Готівкова каса на початку зміни</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, endOfSession && styles.disabled]}
                value={values?.total_start}
                placeholder="0"
                onChangeText={value => handleValue('total_start')(value)}
                maxLength={7}
                onFocus={clearText}
                keyboardType={'number-pad'}
                pointerEvents={endOfSession ? 'none' : 'auto'}
              />
              <Text style={styles.currency}>грн</Text>
            </View>
          </View>
        )}
        {endOfSession ? (
          <>
            <View>
              <Text style={styles.label}>Готівкова каса на кінці зміни</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={values?.total_end}
                  placeholder="0"
                  onChangeText={value => handleValue('total_end')(value)}
                  maxLength={7}
                  onFocus={() => handleValue('total_end')('')}
                  keyboardType={'number-pad'}
                />
                <Text style={styles.currency}>грн</Text>
              </View>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.label}>Z-Баланс</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={values?.zbalance}
                  placeholder="0"
                  onChangeText={value => handleValue('zbalance')(value)}
                  maxLength={7}
                  onFocus={() => handleValue('zbalance')('')}
                  keyboardType={'number-pad'}
                />
                <Text style={styles.currency}>грн</Text>
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
                <Text style={styles.debitReportButtonText}>
                  {values?.selected_employees?.length === 0
                    ? 'Натисніть, щоб вибрати працівників'
                    : `${
                        values?.selected_employees?.length === 1
                          ? 'Обраний'
                          : 'Обрано'
                      } ${values?.selected_employees?.length} ${
                        values?.selected_employees?.length === 1
                          ? 'працівник'
                          : values?.selected_employees?.length < 5
                          ? 'працівника'
                          : 'працівників'
                      }`}
                </Text>
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
            colors={
              canProceed ? ['#DB3E69', '#EF9058'] : ['#DB3E6955', '#EF905855']
            }
          >
            <Text style={styles.linearButtonText}>Готово</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmployeesList = () => {
    return (
      <View
        style={{ width: '86%', maxHeight: deviceHeight * 0.7, paddingTop: 25 }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}
        >
          <Text style={[styles.heading, { marginTop: 0, marginBottom: 0 }]}>
            Працівники
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setEmployeesPicker(false)}
          >
            <FastImage
              style={{ width: 20, height: 20 }}
              source={require('@images/x_icon.png')}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{ maxHeight: deviceHeight * 0.65 }}
          contentContainerStyle={{ paddingBottom: 25, paddingRight: 20 }}
        >
          {account?.employees?.map((employee, index) => {
            const hasEmployeeSelected = values.selected_employees.includes(
              employee.id,
            );

            return (
              <TouchableOpacity
                style={styles.employeeItem}
                onPress={() => {
                  const newValue = hasEmployeeSelected
                    ? values.selected_employees.filter(
                        item => item !== employee.id,
                      )
                    : [...values.selected_employees, employee.id];
                  handleValue('selected_employees')(newValue);
                }}
                activeOpacity={1}
              >
                <View style={styles.employee} key={index}>
                  <FastImage
                    style={{ width: 40, height: 40, borderRadius: 100 }}
                    source={{
                      uri: employee?.icon
                        ? employee?.icon
                        : account?.client_data?.img_url,
                    }}
                  />
                  <Text style={styles.employeeName}>{employee.name}</Text>
                </View>

                {hasEmployeeSelected && (
                  <View style={styles.selectedButton} key={index}>
                    <FastImage
                      style={{ width: 16, height: 16 }}
                      source={require('@images/tick_white.png')}
                    />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const canProceed = useMemo(() => {
    return endOfSession
      ? +values?.total_end > 0 &&
          values?.total_end !== '' &&
          +values?.zbalance > 0 &&
          values?.zbalance !== ''
      : +values?.total_start > 0 &&
          values?.total_start !== '' &&
          values?.selected_employees?.length > 0;
  }, [values, endOfSession]);

  return (
    <View style={[styles.wrapper, sessionModalVisible && { top: 0 }]}>
      <TouchableOpacity
        style={styles.touchWrapper}
        onPress={() => {
          if (!endOfSession || modalStatus) return;
          dispatch(setSessionModalState(false));
        }}
        activeOpacity={1}
      />
      <KeyboardAwareScrollView
        style={{ zIndex: 13 }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        extraScrollHeight={0}
        keyboardOpeningTime={0}
        enableOnAndroid={endOfSession}
      >
        <View style={styles.container}>
          {employeesPickerOpened ? renderEmployeesList() : renderMainContent()}
        </View>
      </KeyboardAwareScrollView>
      <Toast
        ref={toastRef}
        opacity={1}
        style={{ paddingHorizontal: 40, backgroundColor: '#00000088' }}
        position="bottom"
        positionValue={150}
        textStyle={styles.toastText}
        fadeInDuration={200}
        fadeOutDuration={800}
      />
    </View>
  );
}

export default Session;
