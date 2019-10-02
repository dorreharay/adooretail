import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Easing } from "react-native";
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';
import Orientation from 'react-native-orientation';

import LoginLoader  from '../../../../components/LoginLoader';
import SharedBackground from '../../../../components/SharedBackground';

const filledDot = require('../../../assets/images/filled-dot.png')
const unfilledDot = require('../../../assets/images/unfilled-dot.png')

class StartPanel extends Component {
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
    this.animatedValue = new Animated.Value(0)
  }
  
  componentDidMount() {
    Orientation.lockToLandscape();
  }

  
  render() {
    const { passwordArray, loading, error } = this.state;
  
    return (
      <LinearGradient style={styles.container} start={{x: -1, y: -1}} end={{x: 1, y: 1}} colors={['#6F6F6F', '#1B1B1B']}>
        <SharedBackground navigation={false} /> 
        
        <View style={{ flexWrap: 'wrap', width: '50%', height: '50%', }}>
          <Ripple 
            style={{ alignItems: 'center', justifyContent: 'center', justifyContent: 'center', width: '28%', height: '40%', paddingHorizontal: '5%', marginRight: '5%', marginBottom: '5%', backgroundColor: '#D2D2D24D' }}
            rippleColor={'#F3F3F3'}
          >
            <Text style={{ fontSize: 16, color: '#ffffff', fontFamily: 'comfortaa_regular', textAlign: 'center', lineHeight: 20, }}>Новий аккаунт</Text>
          </Ripple>
          <Ripple 
            style={{ alignItems: 'center', justifyContent: 'center', width: '28%', height: '40%', marginBottom: '5%', borderRadius: 4, backgroundColor: '#D2D2D24D' }}
            rippleColor={'#F3F3F3'}
          >
            <Text style={{ fontSize: 16, color: '#ffffff', fontFamily: 'comfortaa_regular' }}>В розробці</Text>
          </Ripple>
          <Ripple 
            style={{ alignItems: 'center', justifyContent: 'center', width: '28%', height: '40%', marginBottom: '5%', borderRadius: 4, backgroundColor: '#D2D2D24D' }}
            onPress={() => this.props.navigation.navigate('Login')}  rippleColor={'#F3F3F3'}
          >
            <Text style={{ fontSize: 16, color: '#ffffff', fontFamily: 'comfortaa_regular' }}>Вхід</Text>
          </Ripple>
          <Ripple
            style={{ alignItems: 'center', justifyContent: 'center', width: '28%', height: '40%', marginRight: '5%', backgroundColor: '#D2D2D24D' }}
            rippleColor={'#F3F3F3'}
          >
            <Text style={{ fontSize: 16, color: '#ffffff', fontFamily: 'comfortaa_regular' }}>В розробці</Text>
          </Ripple>
          <Ripple
            style={{ alignItems: 'center', justifyContent: 'center', width: '28%', height: '40%', marginRight: '5%', marginBottom: '5%', backgroundColor: '#D2D2D24D' }}
            rippleColor={'#F3F3F3'}
          >
            <Text style={{ fontSize: 16, color: '#ffffff', fontFamily: 'comfortaa_regular' }}>Інформація</Text>
          </Ripple>
          <Ripple
            style={{ alignItems: 'center', justifyContent: 'center', width: '28%', height: '40%', backgroundColor: '#D2D2D24D' }}
            rippleColor={'#F3F3F3'}
          >
            <Text style={{ fontSize: 16, color: '#ffffff', fontFamily: 'comfortaa_regular' }}>В розробці</Text>
          </Ripple>
        </View>

        <LoginLoader active={loading} />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default StartPanel;
