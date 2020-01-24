import React, { useState, useEffect, useRef, } from 'react'
import { View, Text, Animated, TouchableOpacity, } from 'react-native'
import Draggable from 'react-native-draggable';
import styles from './styles'

import { blockSizes } from '@blockSizes'

import SharedButton from '@shared/SharedButton';
import FastImage from 'react-native-fast-image';

function PointScheme() {
  const dragRef = useRef(null)

  const [animatedWidth] = useState(new Animated.Value(100))
  const [animatedHeight] = useState(new Animated.Value(100))

  const [currentSize, setCurrentSize] = useState({ width: 0, height: 0 })
  const [activeBlockIndex, setActiveBlock] = useState(false)

  const activateBlockEdit = (index) => {
    setActiveBlock(index)
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    let newRandomSizeIndex = Math.floor(Math.random() * (max - min + 1)) + min

    return newRandomSizeIndex;
  }

  const getRandomResize = () => {
    const newSize = blockSizes[getRandomIntInclusive(0, blockSizes.length - 1)]

    setCurrentSize(newSize)

    animateResize(newSize.width, newSize.height)
  }

  const animateResize = (newWidth, newHeight) => {
    Animated.parallel([
      Animated.timing(
        animatedWidth,
        {
          toValue: newWidth,
          duration: 300,
        },
      ).start(),
      Animated.timing(
        animatedHeight,
        {
          toValue: newHeight,
          duration: 300,
        },
      ).start()
    ])
  }

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

  return (
    <View style={styles.container}>
      <View style={styles.dragContainer}>
        {activeBlockIndex !== false && (
          <SharedButton
            style={styles.doneButton}
            onPress={() => setActiveBlock(false)}
            scale={0.85}
          >
            <Text style={styles.doneButtonText}>DONE</Text>
          </SharedButton>
        )}

        <Draggable disabled={activeBlockIndex !== 0}>
          <AnimatedTouchable
            style={[
              styles.block,
              activeBlockIndex === 0 && styles.activeBlockBorder,
              {
                width: animatedWidth,
                height: animatedHeight,
              }
            ]}
            onLongPress={() => activateBlockEdit(0)}
            activeOpacity={1}
          >
            <View style={styles.innerContainer}>
              {/* <Text style={[styles.blockText, { fontSize: (currentSize.width + currentSize.height) / currentSize.width + currentSize.height * 0.4 }]}>Касир</Text> */}
            </View>

            {activeBlockIndex === 0 && (
              <>
                <SharedButton
                  style={styles.rightTopCorner}
                  onPress={getRandomResize}
                  scale={0.85}
                >
                  <FastImage
                    style={{ width: 20, height: 20, }}
                    source={require('@images/refresh.png')}
                  />
                </SharedButton>
              </>
            )}

          </AnimatedTouchable>
        </Draggable>
      </View>

    </View>
  )
}

export default PointScheme
