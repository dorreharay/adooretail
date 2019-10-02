import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import axios from 'axios';
import Ripple from 'react-native-material-ripple';
import { API_URL } from '../../../../../config/api';
import LoginLoader  from '../../../../components/LoginLoader';
import SharedBackground from '../../../../components/SharedBackground';

class InputCash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordArray: [
        { entered: false, },
        { entered: false, },
        { entered: false, },
        { entered: false, },
        { entered: false, },
        { entered: false, },
        { entered: false, },
        { entered: false, },
      ],
      currentInput: '0',
    };
  }

  componentDidUpdate() {
    const { currentInput, passwordArray } = this.state;

    if(currentInput.length === passwordArray.length) {

      this.validateDeviceID(currentInput)
    }
  }

  validateDeviceID = (deviceId) => {
    if(deviceId === '00000000') {
      this.props.navigation.navigate('Sales')
    } else {
      // this.setState({ currentInput: '' })
    }    
  }

  handleKeyPress = (input) => {
    let { currentInput, passwordArray } = this.state;

    let newInput = currentInput;

    if(currentInput == '0') {
      currentInput = ''
    }

    if(currentInput.length < passwordArray.length) {
      newInput = currentInput + input;
    } else {
      return
    }

    const enteredLength = passwordArray.filter(item => item.entered === true).length

    this.setState({
      currentInput: newInput,
      passwordArray: passwordArray.map((item, index) => index === enteredLength ? ({ ...item, entered: true, }) : item) 
    })
  }

  handleDeleteSign = () => {
    let { currentInput, passwordArray } = this.state;

    let newInput = currentInput;

    if(currentInput.length > 0) {
      newInput = currentInput.slice(0, -1);
    } else {
      return
    }

    if(currentInput.length === 1) {
      newInput = '0'
    }

    const enteredLength = passwordArray.filter(item => item.entered === true).length

    this.setState({
      currentInput: newInput,
      passwordArray: passwordArray.map((item, index) => index === enteredLength - 1 ? ({ ...item, entered: false, }) : item) 
    })
  }

  handleProceed = async () => {
    const { token, endOfSession } = this.props; 
    const { currentInput } = this.state;

    return

    if(endOfSession.status) {
      try {
        this.setState({ loading: true })
    
        // asyncReceiptsStorage.find({}, async (err, localReceipts) => {

        //   await axios.put(`${API_URL}/user/receipts/${token}`, { localReceipts, session_id: endOfSession.sessionID })
        // })

        // await axios.post(`${API_URL}/user/session/terminate/${token}`, { session_id: endOfSession.sessionID, endSum: currentInput })
  
        // asyncReceiptsStorage.remove({}, { multi: true }, async (err, productsDocs) => {})
        
        this.props.setEndOfSessionStatus({ status: false, sessionID: '', })
        this.props.navigation.navigate('Login')
      } catch(e) {

        this.props.navigation.navigate('Login')
        console.log(e.message)
      }

      this.setState({ loading: false })

      return
    }

    this.setState({ loading: true })

    try {
      const result = await axios.get(`${API_URL}/user/employees/${token}`)
      
      const employees = result.data.employees;
  
      this.props.setEmployees(employees)

      this.props.setStartCash(currentInput)
      this.props.navigation.navigate('InputEmployee')

      setTimeout(() => 
        this.setState({
          passwordArray: [
            { entered: false, },
            { entered: false, },
            { entered: false, },
            { entered: false, },
            { entered: false, },
            { entered: false, },
            { entered: false, },
            { entered: false, },
          ],
          currentInput: '0',
          loading: false
        })
      , 400)
      
      
    } catch (e) {
      console.log(e.message)
    }
  }

  // ImageResizeMode

  render() {
    const { endOfSession = { status: false, } } = this.props;
    const { currentInput, loading } = this.state;
  
    return (
      <View style={styles.container}>
        <SharedBackground navigation={this.props.navigation} />
        <Text style={styles.loginHeading}><Text style={styles.loginHeadingSuper}>C</Text>ума в касі на {endOfSession.status ? 'кінці' : 'початку'} зміни</Text>
        <Text style={styles.loginCaption}>{currentInput}</Text>
        <View style={styles.lsNumpad}>
        <Ripple style={styles.lsNum} onPress={() => this.handleKeyPress('1')} rippleColor={'#565656'} rippleContainerBorderRadius={50} rippleCentered>
            <Text style={styles.lsNumText}>1</Text>
          </Ripple>
          <Ripple style={styles.lsNum} onPress={() => this.handleKeyPress('2')} rippleColor={'#565656'} rippleContainerBorderRadius={50} rippleCentered>
            <Text style={styles.lsNumText}>2</Text>
          </Ripple>
          <Ripple style={styles.lsNum} onPress={() => this.handleKeyPress('3')} rippleColor={'#565656'} rippleContainerBorderRadius={50} rippleCentered>
            <Text style={styles.lsNumText}>3</Text>
          </Ripple>
          <Ripple style={styles.lsNum} onPress={() => this.handleKeyPress('4')} rippleColor={'#565656'} rippleContainerBorderRadius={50} rippleCentered>
            <Text style={styles.lsNumText}>4</Text>
          </Ripple>
          <Ripple style={styles.lsNum} onPress={() => this.handleKeyPress('5')} rippleColor={'#565656'} rippleContainerBorderRadius={50} rippleCentered>
            <Text style={styles.lsNumText}>5</Text>
          </Ripple>
          <Ripple style={styles.lsNum} onPress={() => this.handleKeyPress('6')} rippleColor={'#565656'} rippleContainerBorderRadius={50} rippleCentered>
            <Text style={styles.lsNumText}>6</Text>
          </Ripple>
          <Ripple style={styles.lsNum} onPress={() => this.handleKeyPress('7')} rippleColor={'#565656'} rippleContainerBorderRadius={50} rippleCentered>
            <Text style={styles.lsNumText}>7</Text>
          </Ripple>
          <Ripple style={styles.lsNum} onPress={() => this.handleKeyPress('8')} rippleColor={'#565656'} rippleContainerBorderRadius={50} rippleCentered>
            <Text style={styles.lsNumText}>8</Text>
          </Ripple>
          <Ripple style={styles.lsNum} onPress={() => this.handleKeyPress('9')} rippleColor={'#565656'} rippleContainerBorderRadius={50} rippleCentered>
            <Text style={styles.lsNumText}>9</Text>
          </Ripple>
          <TouchableOpacity style={styles.lsNum} onPress={this.handleProceed} activeOpacity={1}>
            <Image style={{ width: 30, height: 30, marginRight: 5, }} source={require('../../../../../assets/images/key.png')} fadeDuration={0}/>
          </TouchableOpacity>
          <Ripple style={styles.lsNum} onPress={() => this.handleKeyPress('0')} rippleColor={'#565656'} rippleContainerBorderRadius={50} rippleCentered>
            <Text style={styles.lsNumText}>0</Text>
          </Ripple>
          <TouchableOpacity style={styles.lsNum} onPress={this.handleDeleteSign} activeOpacity={1}>
            <Image style={{ width: 34, height: 28, marginRight: 5, }} source={require('../../../../../assets/images/erase.png')} fadeDuration={0}/>
          </TouchableOpacity>
        </View>
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
    paddingTop: '3%',
  },
  loginHeading: {
    color: '#F7F7F7',
    fontSize: 17,
    fontFamily: 'comfortaa_light',
    letterSpacing: 1,
  },
  loginHeadingSuper: {
    color: '#F7F7F7',
    fontSize: 17,
    fontFamily: 'comfortaa_light',
    letterSpacing: 2,
  },
  idDots: {
    width: 380,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 50,
  },
  dot: {
    width: 27,
    height: 27.5,
  },
  loginCaption: {
    color: '#F7F7F7',
    fontSize: 50,
    fontFamily: 'comfortaa_light',
    marginTop: 50,
  },
  lsNumpad: {
    width: 480,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
  },  
  lsNum: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 100,
  },
  lsNumText: {
    color: '#F6F6F6',
    fontSize: 40,
    fontFamily: 'comfortaa_light',
    textAlign: 'center',
    textAlignVertical :'center',
    // elevation: 1,
  },
})

export default InputCash;
