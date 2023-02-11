import PropTypes from 'prop-types'
import {Text, View, Dimensions} from 'react-native'
import React, { Component } from 'react'
import BackArrow from '../components/backArrow'
import TopRibbon from '../components/topRibbon'
import {Entypo} from '@expo/vector-icons'
import { TouchableHighlight } from 'react-native-gesture-handler'

const vh = Dimensions.get('window').height
const vw = Dimensions.get('window').width


class SearchScreen extends Component {
  render() {
    return (
        <View style = {styles.screenContainer}>
        <TopRibbon header={"Search"}/>
        <BackArrow screenToNavigate = "Home"/>
        </View>
    )
    }
}

const styles = {
    screenContainer:{
        width:'100%',
        height:'100%',
        backgroundColor:'rgb(20,20,20)',
    },
}
export default SearchScreen;