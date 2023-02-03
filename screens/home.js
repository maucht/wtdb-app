import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopRibbon from '../components/topRibbon'
import { Component } from 'react'

class HomeScreen extends Component {
  render() {
    return (
      <>
        <TopRibbon header="home"/>

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
    backgroundColor:'rgb(20,40,70)'

},
  homeCategories:{
    height:'75%',
    width:'90%',
    marginTop:'10%',
    marginLeft:'5%',
    backgroundColor:'rgb(15,30,60)',

  }

})