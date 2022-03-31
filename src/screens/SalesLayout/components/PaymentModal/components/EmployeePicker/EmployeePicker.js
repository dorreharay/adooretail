import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

import { lastSessionSelector } from '@selectors';

import { setCurrentEmployee } from '@reducers/UserReducer';
import { setEmployeesListVisibility } from '@reducers/OrderReducer';

function EmployeePicker() {
  const dispatch = useDispatch();

  const currentEmployee = useSelector(state => state.user.currentEmployee) || 0;
  const account = useSelector(state => state.account);
  const lastSession = useSelector(lastSessionSelector);

  const employeesListVisible = useSelector(
    state => state.orders.employeesListVisible,
  );

  const handleClickOutSide = () => {
    dispatch(setEmployeesListVisibility(false));
  };

  if (!employeesListVisible) return null;

  return (
    <TouchableOpacity
      style={styles.employeesListContainer}
      onPress={handleClickOutSide}
      activeOpacity={1}
    >
      <View
        style={{
          width: '37%',
          height: '70%',
          borderRadius: 3,
          backgroundColor: '#FFFFFF',
        }}
      >
        <Text style={styles.employeesListHeading}>Працівник</Text>

        <ScrollView style={styles.employeesList}>
          {lastSession?.employees &&
            lastSession?.employees.map((item, key) => (
              <TouchableOpacity
                style={styles.employeesListItem}
                onPress={() => {
                  dispatch(setCurrentEmployee(key));

                  handleClickOutSide();
                }}
                activeOpacity={0.7}
                key={key}
              >
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                  <FastImage
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: '#DDDDDD',
                      borderRadius: 100,
                    }}
                    source={{
                      uri: (account && account?.client_data?.img_url) || '',
                    }}
                  />
                  <Text style={styles.employeesListItemName}>
                    {account?.employees[key]?.name}
                  </Text>
                </View>
                <View style={styles.pickEmployeeButton}>
                  <LinearGradient
                    style={styles.pickEmployeeButtonLinear}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 2 }}
                    colors={
                      currentEmployee !== key
                        ? ['#DB3E69', '#FD9C6C']
                        : ['#f4f4f4', '#f4f4f4']
                    }
                  >
                    <Text
                      style={[
                        styles.pickEmployeeButtonText,
                        currentEmployee === key && { color: '#A4A4A4' },
                      ]}
                    >
                      {currentEmployee === key ? 'обрано' : 'обрати'}
                    </Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
}

export default EmployeePicker;
