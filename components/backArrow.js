import { View, Text } from 'react-native'
import React from 'react'
import {Entypo} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const BackArrow = (props) => {
  const navigation = useNavigation()
  return (
    <View marginTop={'-14%'} marginLeft={'8%'} width={'18%'} elevation = {11} onStartShouldSetResponder={()=>navigation.navigate(props.screenToNavigate)}>
      <Entypo name="arrow-with-circle-left" color="white" size={40}/>
    </View>
  )
}

export default BackArrow