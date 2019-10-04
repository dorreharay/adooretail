import React, { Component } from 'react';
import { Animated, View, TouchableWithoutFeedback, StyleSheet, Image, TouchableOpacity } from 'react-native';

class SharedButton extends Component {
  state = {
    animatePress: new Animated.Value(1)
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
    
    if(this.props.onPress) this.props.onPress()
  }

  render() {
    const { buttonSizes, iconSizes, source, loading, } = this.props;
    const { animatePress, } = this.state;

    return (
      <View>
        <TouchableWithoutFeedback
          onPressIn={this.animateIn}
          onPressOut={this.animateOut}
        >
          <Animated.View style={{
            ...styles.button,
            width: buttonSizes.width,
            height: buttonSizes.height,
            borderRadius: 5,
            transform: [{
              scale: animatePress
            }]
          }}>
            {loading ? (
              null
            ) : (
              <Image style={{ width: iconSizes.width, height: iconSizes.height, }} source={source} />
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