import PropTypes from 'prop-types'
import {Text,View, Dimensions, ScrollView, Image, Touchable, TouchableHighlight} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopRibbon from '../components/topRibbon'
import BackArrow from '../components/backArrow'
import React, { Component } from 'react'
import { secondaryColor } from '../assets/constants'
import * as Font from 'expo-font'

const vw = Dimensions.get('window').width
const vh = Dimensions.get('window').height

class Nations extends Component{
  state = {
    fontsLoaded:false
  }
  async loadFonts(){
    await Font.loadAsync({
        'Nunito-regular': require('../assets/fonts/NunitoSans-Regular.ttf'),
        'Nunito-bold':require('../assets/fonts/NunitoSans-Bold.ttf'),
        'Nunito-extra-bold':require('../assets/fonts/NunitoSans-ExtraBold.ttf')

    })
    console.log("loaded fonts")
    this.setState({fontsLoaded:true})
    }
  componentDidMount(){
    this.loadFonts()
  }
  handleNatNav(nation){
    this.props.navigation.navigate("NationWise",{nation})
  }
  render() {
    if(this.state.fontsLoaded){
    return (
      <View style = {styles.homeContainer}>
        <TopRibbon header = "Nations"/>
        <BackArrow screenToNavigate = "Home" marginTop="10%"/>
        <View style = {styles.nationContainer}>
          <View style = {styles.nationView} onStartShouldSetResponder={(nation)=>this.handleNatNav("United States")}>
            <Image source = {require("../assets/flags/us_flag_colored.png")} style = {styles.nationFlag}/>
            <Text style = {styles.nationText}>United States</Text>
          </View>

          <View style = {styles.nationView} onStartShouldSetResponder={(nation)=>this.handleNatNav("Germany")}>
            <Image source = {require("../assets/flags/ger_flag_colored.png")} style = {styles.nationFlag}/>
            <Text style = {styles.nationText}>Germany</Text>
          </View>
        </View>
      </View>
    )
    }
    else{
      return (
        <View style = {styles.homeContainer}>
          <TopRibbon header = "Nations"/>
          <BackArrow screenToNavigate = "Home" marginTop="10%"/>
        </View>
      )
    }
  }
}

const styles = {
  homeContainer:{
      height:'100%',
      width:'100%',
      backgroundColor:'rgb(20,20,20)',
  },
  nationContainer:{
    height:'30%',
    width:'90%',
    marginLeft:'5%',
    marginTop:'20%',
    backgroundColor:'rgb(30,30,30)'
  },
  nationView:{
    width:'100%',
    height:'50%',
    borderBottomColor:'rgb(20,20,20)',
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomWidth:1,
  },
  nationFlag:{
    height:vh/16,
    width:vh/10,
    left:vw/10,
    top:'25%',
    borderColor:'rgb(20,20,20)',
    borderWidth:1
  },
  nationText:{
    color:secondaryColor,
    alignSelf:'flex-start',
    fontFamily:'Nunito-extra-bold',
    fontSize:vw/19,
    justifyContent:'center',
    textAlign:'center',

    marginLeft:'55%',
    marginTop:'-5%',
  },
}
export default Nations