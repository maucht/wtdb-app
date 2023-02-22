import React, { Component } from 'react'
import {Text,View, Dimensions, ScrollView, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopRibbon from '../components/topRibbon'
import BackArrow from '../components/backArrow'
import * as Font from 'expo-font'
import {FontAwesome} from '@expo/vector-icons'
import { promiseFullList } from '../backend/fetchTable'


class Shell extends Component {
  state = {
    shellData : this.props.route.params.shell,
    fontsLoaded:false,
  }
  async loadFonts(){
    await Font.loadAsync({
        'Nunito-regular': require('../assets/fonts/NunitoSans-Regular.ttf'),
        'Nunito-bold':require('../assets/fonts/NunitoSans-Bold.ttf'),
        'Nunito-extra-bold':require('../assets/fonts/NunitoSans-ExtraBold.ttf')

    })
    console.log("loaded fonts","shell")
    this.setState({fontsLoaded:true})
    }
  componentDidMount(){
    this.loadFonts()
  }
  render() {
    switch(this.state.fontsLoaded){
      case(true):
      return (
        <View style = {styles.homeContainer}>
          <TopRibbon header = {this.state.shellData.ShellName}/>
          <BackArrow screenToNavigate = "FullList" marginTop="10%"/>
          
          
        </View>
      )
      break;
      case(false):
      return(
      <View style = {styles.homeContainer}>
      </View>
      )
    }

  }
}

const styles = {
  homeContainer:{
    height:'100%',
    width:'100%',
    backgroundColor:'rgb(20,20,20)'
  },
}

export default Shell;
