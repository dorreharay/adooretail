import React from 'react'
import { View, Text, Image } from 'react-native'

import { PROBA_LIGHT } from '@fonts'

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
            borderLeftWidth: 1,
            borderLeftColor: '#EAEAEA',
            borderRightWidth: 1,
            borderRightColor: '#EAEAEA',
            backgroundColor: '#FFFFFF',
          }, 
          index === 0 && { borderTopWidth: 1, borderTopColor: '#EAEAEA', borderTopLeftRadius: 5, borderTopRightRadius: 5, },
          index === 3 && { borderBottomWidth: 1, borderBottomColor: '#EAEAEA', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, },
          index !== 4 && { borderBottomColor: '#EEEEEE', borderBottomWidth: 1 },
          index === 4 && { marginTop: 5, borderRadius: 5, borderWidth: 1, borderColor: '#EAEAEA', backgroundColor: '#FFFFFF', }
        ]
      }
    >
      <Image style={{ width: dimensions[0], height: dimensions[1], marginRight: 20, }} source={icon}></Image>
      <Text style={{ flexGrow: 1, color: index === 4 ? '#CC1B1B' : '#000000', fontSize: 18, fontFamily: PROBA_LIGHT }}>{text}</Text>
    </View>
  )
}

export default Option

