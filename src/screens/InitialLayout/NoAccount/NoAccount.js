import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
} from 'react-native';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import Toast, { DURATION } from 'react-native-easy-toast'
import styles from './styles';

import API from '@api';

import { saveAccountData } from '@reducers/AccountReducer'

function NoAccount(props) {
  const { navigation } = props;

  const dispatch = useDispatch();

  const inputRef = useRef(null);
  const toastRef = useRef(null)

  const [loading, setLoadingStatus] = useState(false);
  const [values, setValues] = useState({
    identifier: '',
    password: '',
  });

  const handleCode = async () => {
    try {
      setLoadingStatus(true);
      inputRef.current && inputRef.current.blur();
      Keyboard.dismiss();

      const data = await API.requestAccount(values);

      console.log('data', data);

      if (!data) throw new Error('Invalid response');

      setLoadingStatus(false);

      dispatch(saveAccountData(data))

      navigation.jumpTo('Login');
    } catch (error) {
      console.log('error', error.message);

      toastRef.current.show('Аккаунт не знайдено')

      setLoadingStatus(false);
    }
  };

  const handleValues = field => text => {
    setValues(prev => ({
      ...prev,
      [field]: text,
    }));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
      keyboardShouldPersistTaps={'handled'}
    >
      <TouchableOpacity
        style={styles.helpContainer}
        onPressIn={() => {}}
        activeOpacity={0.7}
      >
        <Text style={styles.helpText}>Де такий знайти?</Text>
      </TouchableOpacity>

      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-160}>
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FastImage
            style={styles.headingLogo}
            source={require('@images/logo-heading.png')}
          />

          <Text style={styles.heading}>Прив’язка планшета до Adoo Cloud</Text>

          <View style={styles.midContainer}>
            <View>
              <Text style={styles.inputLabelText}>Ідентифікатор закладу</Text>
              <TextInput
                ref={inputRef}
                style={styles.input}
                value={values?.identifier}
                onChangeText={text => handleValues('identifier')(text)}
                placeholder="Ідентифікатор закладу"
                placeholderTextColor="#CCCCCC88"
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => handleValues('identifier')('')}
                activeOpacity={0.6}
              >
                {values?.identifier?.length > 0 && (
                  <FastImage
                    style={{ width: 14, height: 14 }}
                    source={require('@images/x_icon.png')}
                  />
                )}
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.inputLabelText}>Пароль доступу</Text>
              <TextInput
                ref={inputRef}
                style={styles.input}
                value={values?.password}
                onChangeText={text => handleValues('password')(text)}
                placeholder="Пароль доступу"
                placeholderTextColor="#CCCCCC88"
                keyboardType="decimal-pad"
                autoCapitalize="characters"
              />
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => handleValues('password')('')}
                activeOpacity={0.6}
              >
                {values?.password?.length > 0 && (
                  <FastImage
                    style={{ width: 14, height: 14 }}
                    source={require('@images/x_icon.png')}
                  />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                (values?.identifier?.length < 3 ||
                  values?.password?.length < 3) &&
                  styles.disabled,
              ]}
              onPress={handleCode}
              activeOpacity={0.8}
            >
              {loading ? (
                <Progress.Circle
                  endAngle={0.7}
                  size={25}
                  color={'#FFFFFF'}
                  borderWidth={1.5}
                  indeterminate={true}
                />
              ) : (
                <Text style={styles.submitText}>Підтвердити</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      <Toast
        ref={toastRef}
        opacity={1}
        style={{ paddingHorizontal: 40, backgroundColor: '#00000088' }}
        position="bottom"
        positionValue={100}
        textStyle={styles.toastText}
        fadeInDuration={200}
        fadeOutDuration={800}
      />
    </ScrollView>
  );
}

export default NoAccount;
