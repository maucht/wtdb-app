import { StyleSheet, Text, View, Dimensions} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopRibbon from '../components/topRibbon'
import { Component } from 'react'
import * as Font from "expo-font"
import {  TouchableWithoutFeedback } from 'react-native-gesture-handler'



const vw = Dimensions.get('window').width
const vh = Dimensions.get('window').height

class HomeScreen extends Component {
  state = {
    fontsLoaded:false,
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

  handleCatNavPress(navIndex=0){
    console.log("SHOULD NAVIGATE TO SOMETHING")
  }

  render() {
    switch(this.state.fontsLoaded){
      case(true):
        return (
          <>
            <TopRibbon header="Home"/>
    
            <SafeAreaView style = {styles.homeContainer}>
              <View style = {styles.homeCategories}>
                <View style={styles.categoryOne} onStartShouldSetResponder={this.handleCatNavPress}>
                  <Text style = {styles.categoryText}>Search</Text>
                </View>
                <View style = {styles.categoryTwo} onStartShouldSetResponder={this.handleCatNavPress}>
                  <Text style = {styles.categoryText}>All{`\n`}Ammunitions</Text>
                </View>
                <View style = {styles.categoryThree} onStartShouldSetResponder={this.handleCatNavPress}>
                  <Text style = {styles.categoryText}>By Nation</Text>
                </View>
                <View style = {styles.categoryFour} onStartShouldSetResponder={this.handleCatNavPress}>
                  <Text style = {styles.categoryText}>More</Text>
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
    color:'white',
    fontFamily:'Nunito-extra-bold',
    fontSize:vw/19,
    justifyContent:'center',
    textAlign:'center',

    marginLeft:'55%',
    marginTop:'12%',
  },

  

})