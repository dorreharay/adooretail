import React, { useState, useEffect, useRef, } from 'react'
import { View, Text, Animated, TouchableOpacity, ImageBackgroundBase, } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import {
  DragResizeBlock,
} from './Drag';
import styles from './styles'

import { blockSizes } from '@blockSizes'
import { setBounds } from '@reducers/UserReducer'

import SharedButton from '@shared/SharedButton';

function PointScheme() {
  const dragRef = useRef(null)

  const dispatch = useDispatch()

  const bounds = useSelector(state => state.user.bounds)

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

  const handleDrag = (x, y, index) => {
    const newBounds = bounds.map((item, key) => key === index ? ({
      ...item,
      position: {
        x, y
      }
    }) : item)

    dispatch(setBounds(newBounds))
  }

  const handleResize = (w, h, index) => {
    const newBounds = bounds.map((item, key) => key === index ? ({
      ...item,
      sizes: {
        w, h
      }
    }) : item)

    dispatch(setBounds(newBounds))
  }

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

        {bounds.map((item, index) => (
          <DragResizeBlock
            minW={100}
            minH={100}
            w={item.sizes.w}
            h={item.sizes.h}
            x={item.position.x}
            y={item.position.y}
            connectors={activeBlockIndex === index ? ['tl', 'tr', 'br', 'bl', 'c'] : []}
            onDragEnd={([x, y]) => handleDrag(x, y, index)}
            onResizeEnd={([x, y]) => handleResize(x, y, index)}
          >
            <TouchableOpacity
              style={[
                styles.block,
                activeBlockIndex === index && styles.activeBlockBorder,
              ]}
              onLongPress={() => activateBlockEdit(index)}
              activeOpacity={1}
            >
              <View style={styles.innerContainer}>
                <Text style={styles.blockText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          </DragResizeBlock>
        ))}


      </View>

    </View>
  )
}

export default PointScheme
