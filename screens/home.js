import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopRibbon from '../components/topRibbon'
import { Component } from 'react'
import * as Font from "expo-font"
import {  TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons'
import axios from 'axios'

import { Svg } from 'react-native-svg'
import bullets from '../assets/svg/Bullets.svg'
import {secondaryColor} from '../assets/constants.js'

import { promiseFullList } from '../backend/fetchTable'

import AsyncStorage from '@react-native-async-storage/async-storage'



const vw = Dimensions.get('window').width
const vh = Dimensions.get('window').height

// AsyncStorage.clear()
// uncomment this to test table fetching (without cache)

class HomeScreen extends Component {
  state = {
    fontsLoaded:false,
    fullList:null,
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

  handleCatNavPress(navIndex=0){ // make one of these a bombing chart for air rb
    const navMap = new Map([
      [0,"Search"],
      [1,"FullList"],
      [2,"Nations"],
      [3,"Search"],
    ])
    console.log("SHOULD NAVIGATE TO INDEX",navMap.get(navIndex))
    this.props.navigation.navigate(navMap.get(navIndex),{})
  }

  render() { // IDEA: Bump "ALl ammunitions" up 1 and merge the search feature into that. Add a category called "Advanced Search" to replace it
    switch(this.state.fontsLoaded){
      case(true):
        return (
          <>
            <TopRibbon header="Home"/>
    
            <SafeAreaView style = {styles.homeContainer}>
              <View style = {styles.homeCategories}>
                <View style={styles.categoryOne} /*onStartShouldSetResponder={(navIndex)=>this.handleCatNavPress(0)}*/>
                  <Text style = {styles.categoryTextDisabled}>Search</Text>
                  <View marginTop={'-8%'} marginLeft={'11%'}><Entypo name = {'magnifying-glass'} size={vh/14} color={'rgb(80,80,80)'}/></View>
                </View>
                <View style = {styles.categoryTwo} onStartShouldSetResponder={(navIndex) => this.handleCatNavPress(1)}>
                  <Text style = {styles.categoryText}>Full List</Text>
                  <View marginTop = {'-8%'} marginLeft={'11%'}><Entypo name = "book" color = {secondaryColor} size={vh/14}/></View>
                </View>
                <View style = {styles.categoryThree} onStartShouldSetResponder={(navIndex) => this.handleCatNavPress(2)}>
                  <Text style = {styles.categoryText}>By Tech Tree</Text>
                  <View marginTop='-8%' marginLeft='12%'><Entypo name="flag" color={secondaryColor} size = {vh/14}/></View>
                </View>
                <View style = {styles.categoryFour} /*onStartShouldSetResponder={(navIndex) => this.handleCatNavPress(3)}*/>
                  <Text style = {styles.categoryTextDisabled}>More</Text>
                  <View marginTop = {'-8%'} marginLeft={'12%'} ><Entypo name = {'dots-three-horizontal'} color={"rgb(80,80,80)"} size = {vh/14}/></View>
                </View>
              </View>
            </SafeAreaView>
    
          </>
        )
        break;
      case(false):
        return(
          <View style ={styles.homeContainer}></View>
        )
    }

  }
}

export default HomeScreen

const styles = StyleSheet.create({
  homeContainer:{
    height:'100%',
    width:'100%',
    backgroundColor:'rgb(20,20,20)'

},
  homeCategories:{
    height:'75%',
    width:'90%',
    marginTop:'10%',
    marginLeft:'5%',
    backgroundColor:'rgb(30,30,30)',

  },
  categoryOne:{
    height:"25%",
    width:'100%',
    borderBottomColor:'rgb(20,20,20)',
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomWidth:1,


  },
  categoryTwo:{
    height:"25%",
    width:'100%',
    borderBottomColor:'rgb(20,20,20)',
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomWidth:1,
  },
  categoryThree:{
    height:"25%",
    width:'100%',
    borderBottomColor:'rgb(20,20,20)',
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomWidth:1,
  },
  categoryFour:{
    height:"25%",
    width:'100%',
  },

  categoryText:{
    color:secondaryColor,
    alignSelf:'flex-start',
    fontFamily:'Nunito-extra-bold',
    fontSize:vw/19,
    justifyContent:'center',
    textAlign:'center',

    marginLeft:'55%',
    marginTop:'12%',
  },
  categoryTextDisabled:{
    color:"rgb(80,80,80)",
    alignSelf:'flex-start',
    fontFamily:'Nunito-extra-bold',
    fontSize:vw/19,
    justifyContent:'center',
    textAlign:'center',

    marginLeft:'55%',
    marginTop:'12%',
  },

  ammoCat:{
    marginTop:'-15%',
    marginLeft:'13%',
    height:80,

  },
  flagCat:{
    marginTop:'-10%',
    marginLeft:'11%',
    height:80,
    width:80
  },

})