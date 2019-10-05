import React from 'react'
import { View, Text, Image } from 'react-native'

import { PROBA_REGULAR } from '../../../../../../../config/fonts'

function Option({ text, icon, index, dimensions }) {
  return (
    <View 
      style={
        [
          {
            width: '100%',
            height: 65,
            padding: 0,
            margin: 0,
            paddingHorizontal: 25,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
          }, 
          index === 0 && { borderTopLeftRadius: 5, borderTopRightRadius: 5, },
          index === 3 && { borderBottomLeftRadius: 5, borderBottomRightRadius: 5, },
          index !== 4 && { borderBottomColor: '#EEEEEE', borderBottomWidth: 1 },
          index === 4 && { marginTop: 10, borderRadius: 5, backgroundColor: '#FFFFFF', }
        ]
      }
    >
      <Text style={{ color: index === 4 ? '#CC1B1B' : '#000000', fontSize: 17, fontFamily: PROBA_REGULAR }}>{text}</Text>
      <Image style={{ width: dimensions[0], height: dimensions[1] }} source={icon}></Image>
    </View>
  )
}

export default Option

