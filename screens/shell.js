import React, { Component } from 'react'
import {Text,View, Dimensions, ScrollView, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopRibbon from '../components/topRibbon'
import BackArrow from '../components/backArrow'
import * as Font from 'expo-font'
import {FontAwesome} from '@expo/vector-icons'

import { promiseFullList } from '../backend/fetchTable'
class Shell extends Component {
  render() {
    return (
      <View></View>
    )
  }
}

export default Shell;
