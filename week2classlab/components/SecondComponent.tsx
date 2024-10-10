import React from 'react'
import { View, Text } from 'react-native'

const SecondComponent = ({counter}: {counter: number}) => {
  return (
    <View>
      <Text>Second Component rendered {counter} times</Text>
    </View>
  )
}

export default SecondComponent