import React, { Component } from 'react';
import { Animated, View, TouchableWithoutFeedback, StyleSheet, Image, Alert } from 'react-native';

class SharedButton extends Component {
  state = {
    animatePress: new Animated.Value(1),
    updateIconAnimation: new Animated.Value(0),
  }

  animateIn = () => {
    const { animatePress } = this.state;

    Animated.timing(animatePress, {
      toValue: 0.7,
      duration: 100,
    }).start()
  }

  animateOut = () => {
    const { animatePress } = this.state;

    Animated.timing(animatePress, {
      toValue: 1,
      duration: 200,
    }).start()
    
    if(this.props.onPress)
      this.props.onPress()

    if(this.props.rotateOnPress)
      this.rotateIcon()
        if(this.props.loadAgain)
          this.props.loadAgain()
  }

  rotateIcon = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.updateIconAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(this.state.updateIconAnimation, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        })
      ]),
      {
        iterations: 1
      }
    ).start()
  }

  render() {
    const { buttonSizes, iconSizes, source, loading, backgroundColor, borderRadius, } = this.props;
    const { animatePress, updateIconAnimation, } = this.state;

    const spin = updateIconAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    return (
      <View>
        <TouchableWithoutFeedback
          onPressIn={this.animateIn}
          onPressOut={this.animateOut}
        >
          <Animated.View style={{
            ...styles.button,
            ...buttonSizes,
            borderRadius: borderRadius ? borderRadius : 5,
            backgroundColor: backgroundColor ? backgroundColor : '',
            transform: [{
              scale: animatePress
            }]
          }}>
            {this.props.children ? (
              this.props.children
            ) : (
              loading ? (
                null
              ) : (
                <Animated.Image style={{ width: iconSizes.width, height: iconSizes.height, transform: [{ rotate: spin }] }} source={source} />
              )
            )}
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default SharedButton;