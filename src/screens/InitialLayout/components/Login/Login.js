import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Easing, Alert, } from "react-native";
import axios from 'axios';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';
import Orientation from 'react-native-orientation';
import DeviceInfo from 'react-native-device-info';
import Svg, { Circle } from 'react-native-svg';
import Datastore from 'react-native-local-mongodb';
const localOptions = new Datastore({ filename: 'localOptions', autoload: true });

import { API_URL }  from '../../../../../config/api';

import LoginLoader  from '../../../../components/LoginLoader';
import SharedBackground from '../../../../components/SharedBackground';

class Login extends Component {
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
      ],
      loading: false, 
      error: false,
      currentInput: '',
    };
    this.promptPosition = new Animated.Value(-400)
    this.animatedValue = new Animated.Value(0)
  }
  
  componentDidMount() {
    Orientation.lockToLandscape();
    
    // this.validateDeviceID('1111222')

    this.props.navigation.addListener("didFocus", () => {
      // localOptions.remove({}, { multi: true }, async (err, productsDocs) => {})
      localOptions.find({}, async (err, localOptionsArr) => {
        console.log(localOptionsArr)
        if(localOptionsArr.length === 0) {
          this.togglePrompt(true)
        }
      })
    });
  }

  handlePromptChoise = (choisePositive) => {
    localOptions.find({}, async (err, localOptionsArr) => {
      if(localOptionsArr.length === 0) {
        localOptions.insert([{ ...localOptionsArr[0], id: 1, isLoginStartPage: choisePositive }], async (e, newDoc) => this.togglePrompt(false))
      } else {
        localOptions.update({ id: 1 }, { $set: { isLoginStartPage: choisePositive } }, {}, () => this.togglePrompt(false))
      }
    })
  }

  togglePrompt = (status) => {
    console.log(status)

    Animated.timing(this.promptPosition, {
      toValue: status ? 40 : -400, 
      duration: 300,
      easing: Easing.linear
    }).start()
  }

  validateDeviceID = async (deviceId) => {
    this.setState({ loading: true })

    try {
      const result = await axios.get(`${API_URL}/user/token/${deviceId}`)
      const token = result.data.token[0]._id;
      const serverIds = result.data.deviceUniqueId[0].deviceUniqueId;

      const uniqueId = DeviceInfo.getUniqueID();

      if(!serverIds.includes(uniqueId)) {
        throw new Error('Device ID is incorrect') 
      }
    
      const currentSession = result.data.current_session[0].current_session;
      this.props.setAuthToken(token)
      this.props.setCurrentSession(currentSession)
    
        if(_.isEmpty(currentSession)) {
          this.props.snapToIndex(1)
          // this.props.navigation.navigate('InputCash')
        } else {
          this.props.snapToIndex(1)
          // this.props.navigation.navigate('Sales')
        }
        this.setState({ 
          passwordArray: [
            { entered: false, },
            { entered: false, },
            { entered: false, },
            { entered: false, },
            { entered: false, },
            { entered: false, },
            { entered: false, },
          ],
          loading: false,
          error: false,
          currentInput: '',
        })  
    } catch (e) {
      Alert.alert(e.message)
        this.handleAnimation()
        this.setState({
          error: true, loading: false,
          currentInput: '',
          passwordArray: [
            { entered: false, },
            { entered: false, },
            { entered: false, },
            { entered: false, },
            { entered: false, },
            { entered: false, },
            { entered: false, },
          ],
        })
     
    }
  }

  handleKeyPress = (input) => {
    let { currentInput, passwordArray, loading, error } = this.state;

    let newInput = currentInput;

    if(currentInput.length < passwordArray.length) {
      newInput = currentInput + input;
    } else {
      return
    }

    const enteredLength = passwordArray.filter(item => item.entered === true).length

    if(error) {
      this.setState({ error: false })
    }

    this.setState({
      currentInput: newInput,
      passwordArray: passwordArray.map((item, index) => index === enteredLength ? ({ ...item, entered: true, }) : item) 
    })

    if(newInput.length === passwordArray.length && !loading && !error) {
      this.validateDeviceID(newInput)
    }
  }

  handleDeleteSign = () => {
    this.togglePrompt()
    let { currentInput, passwordArray } = this.state;

    let newInput = currentInput;

    if(currentInput.length > 0) {
      newInput = currentInput.slice(0, -1);
    } else {
      return
    }

    const enteredLength = passwordArray.filter(item => item.entered === true).length

    this.setState({
      currentInput: newInput,
      passwordArray: passwordArray.map((item, index) => index === enteredLength - 1 ? ({ ...item, entered: false, }) : item) 
    })
  }

  handleAnimation = () => {
      Animated.sequence([

        Animated.timing(this.animatedValue, {toValue: 10.0, duration: 50, easing: Easing.linear}),

        Animated.timing(this.animatedValue, {toValue: -10.0, duration: 50, easing: Easing.linear}),

        Animated.timing(this.animatedValue, {toValue: 0.0, duration: 50, easing: Easing.linear}),
        
      ]).start();
  }

  render() {
    const { passwordArray, loading, error } = this.state;
  
    return (
      <LinearGradient style={styles.container} start={{x: -1, y: -1}} end={{x: 1, y: 1}} colors={['#6F6F6F00', '#1B1B1B00']}>
        <SharedBackground navigation={this.props.navigation} />
        <Animated.View style={[styles.startPagePrompt, { right: this.promptPosition }]}>
          <View style={{ alignItems: 'center', width: '100%', height: '40%', paddingTop: '10%', paddingLeft: '7%', paddingRight: '10%', }}>
            <Text style={[styles.promptButtonText, { color: '#F6F6F6', fontSize: 22, }]}>Зробити вхід стартовою сторінкою?</Text>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'flex-end', width: '100%', height: '60%', paddingBottom: '10%', }}>
            <Ripple style={styles.promptButton} onPress={() => this.handlePromptChoise(true)} rippleColor={'#F3F3F3'}>
              <Text style={styles.promptButtonText}>Так</Text>
            </Ripple>
            <Ripple style={[styles.promptButton, { marginTop: '7%', paddingBottom: '5%', }]} onPress={() => this.handlePromptChoise(false)} rippleColor={'#F3F3F3'}>
              <Text style={styles.promptButtonText}>Ні</Text>
            </Ripple>
          </View>
        </Animated.View>
        <Text style={styles.loginHeading}><Text style={styles.loginHeadingSuper}>В</Text>хід за допомогою Device ID</Text>
        <Animated.View style={[styles.idDots, { left: this.animatedValue }]}>
          {passwordArray.map((item, index) => (
            <Svg height="45" width="45" key={index}>
              <Circle
                cx="25"
                cy="25"
                r="16"
                strokeWidth="1.5"
                stroke="white"
                fill={item.entered ? 'white' : "#33333300"}
              />
            </Svg>
          ))}
        </Animated.View>
        
        <Text style={styles.loginCaption}>Device ID можна змінити в налаштування Adoo Cloud Account</Text>
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
          <Ripple style={styles.lsNum} onPress={() => this.handleKeyPress('0')} rippleColor={'#565656'} rippleContainerBorderRadius={50} rippleCentered>
            <Text style={styles.lsNumText}></Text>
          </Ripple>
          <Ripple style={styles.lsNum} onPress={() => this.handleKeyPress('0')} rippleColor={'#565656'} rippleContainerBorderRadius={50} rippleCentered>
            <Text style={styles.lsNumText}>0</Text>
          </Ripple>
          <TouchableOpacity style={styles.lsNum} onPress={this.handleDeleteSign} activeOpacity={1}>
            <Image style={{ width: 32, height: 27, marginRight: 5, }} source={require('../../../../../assets/images/erase.png')} fadeDuration={0} />
          </TouchableOpacity>
        </View>
        <LoginLoader active={loading} />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '2%',
  },
  loginHeading: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'comfortaa_light',
    letterSpacing: 1,
  },
  loginHeadingSuper: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'comfortaa_light',
    letterSpacing: 2,
  },
  idDots: {
    width: 380,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 35,
  },
  dot: {
    width: 35,
    height: 35,
  },
  loginCaption: {
    color: '#F7F7F7',
    fontSize: 13,
    fontFamily: 'futura_light',
    marginTop: 50,
  },
  lsNumpad: {
    width: 480,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
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
  startPagePrompt: {
    alignItems: 'center',
    position: 'absolute',
    top: 200,
    width: 280,
    height: 300,
    backgroundColor: '#D2D2D233',
    borderRadius: 3,
    zIndex: 100,
  },
  promptButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '86%',
    height: '40%',
    borderRadius: 3,
    backgroundColor: '#D2D2D233',
  },
  promptButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'futura_light',
  },
})

export default Login;
