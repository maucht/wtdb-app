import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopRibbon from '../components/topRibbon'
import { Component } from 'react'
import * as Font from "expo-font"
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



  render() {
    return (
      <>
        <TopRibbon header="Home"/>

        <SafeAreaView style = {styles.homeContainer}>
          <View style = {styles.homeCategories}></View>
        </SafeAreaView>

      </>
    )
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

  }

})