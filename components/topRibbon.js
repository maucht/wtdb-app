import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TopRibbon = (props) => {
  return (
    <View style = {styles.pageRibbon}>
        <Text style = {styles.pageRibbonHeader}>{props.header}</Text>
    </View>
  )
}

export default TopRibbon

const styles = StyleSheet.create({
    pageRibbon:{
        width:'100%',
        height:'10%',
        justifyContent:'center',
        backgroundColor:'rgb(15,30,60)'
    
    },
      pageRibbonHeader:{
        textAlign:'center',
      },
})