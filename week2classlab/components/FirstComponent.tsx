import React from 'react'
import { View, Text } from 'react-native'

const FirstComponent = ({counter}: {counter: number}) => {
  return (
    <View>
      <Text>First Component rendered {counter} times</Text>
    </View>
  )
}

export default FirstComponent