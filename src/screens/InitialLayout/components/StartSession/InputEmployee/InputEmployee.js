import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import axios from 'axios';

import { API_URL } from '../../../../../../config/api';

import LoginLoader  from '../../../../../components/LoginLoader';
import SharedBackground from '../../../../../components/SharedBackground';
import EmployeesList from "./components/EmployeesList";

class InputEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: [],
      loading: false,
    };
  }


  handleCheck = (name, index) => {
    const { checked } = this.state;

    if(name !== 'Пусто') {
      this.setState({ checked: checked.includes(index) ? checked.filter((item, key) => index !== item) : [...checked, index] })
    }
  }


  handleProceed = async () => {
    const { employees, startCash, token } = this.props;
    const { checked } = this.state;

    if(checked.length === 0) {
      return
    }

    this.setState({ loading: true })

    try {
      const selectedEmployees = employees.filter((item, index) => checked.includes(index)).map(item => item.name)
 
      const newSessionObj = {
        startSum: startCash,
        employees: selectedEmployees,
        incasations: [],
      }

      await axios.post(`${API_URL}/user/session/init/${token}`, newSessionObj)

      const { data } = await axios.get(`${API_URL}/user/session/${token}`)
      const currentSession = data.current_session;

      this.props.setCurrentSession(currentSession)

      this.props.navigation.navigate('Sales')

      setTimeout(() => this.setState({ checked: [], loading: false, }), 400)

    } catch (e) {
      console.log(e.message)
    }
  }

  render() {
    const { employees } = this.props;
    const { checked, loading } = this.state;

    return (
      <View style={styles.container}>
        {/* <SharedBackground navigation={this.props.navigation} /> */}

        {employees.length !== 0 && <Text style={styles.loginHeading}>Робітники на зміні</Text>}

        <EmployeesList employees={employees} checked={checked} handleCheck={this.handleCheck} />

        {employees.length !== 0 && (
          <TouchableOpacity style={styles.proceedButton} onPress={this.handleProceed} activeOpacity={1}>
            <Image style={{ width: 18, height: 18, transform: [{ rotate: '180deg' }] }} source={require('../../../../../../assets/images/erase.png')} fadeDuration={0}></Image>
          </TouchableOpacity>
        )}
        
        <LoginLoader active={loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  loginHeading: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'comfortaa_light',
    letterSpacing: 1,
  },
  proceedButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginTop: 45,
    borderRadius: 25,
    backgroundColor: '#D2D2D233',
  }
})

export default InputEmployee;
