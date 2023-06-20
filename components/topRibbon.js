import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'
import {secondaryColor} from '../assets/constants.js'

const vw = Dimensions.get('window').width
const vh = Dimensions.get('window').height

const TopRibbon = (props) => {
    const [fontsLoaded] = useFonts({
        'Nunito-extra-bold':require('../assets/fonts/NunitoSans-ExtraBold.ttf')
    })
    switch(fontsLoaded){
        case(true):
            return (
                <View style = {styles.pageRibbon}>
                    <Text style = {styles.pageRibbonHeader}>{props.header}</Text>
                </View>
            )
            break;
        case(false):
            return(
                <View style = {styles.pageRibbon}>
                    <Text style = {styles.pageRibbonHeader}>{props.header}</Text>
                </View>
            )
    }

}

export default TopRibbon

const responsiveRibbonHeight = vh < 1000 && vw < 1000 ? "10%" : "15%" // the unit is density independent pixels. nexus 7 height = 888 dip
const styles = StyleSheet.create({
    pageRibbon:{
        width:'100%',
        height:100, // responsiveRibbonHeight
        justifyContent:'center', 
        backgroundColor:'rgb(30,30,30)',
        elevation:10
    
    },
      pageRibbonHeader:{
        textAlign:'center',
        fontFamily:'Nunito-extra-bold',
        marginTop:vh/38,
        fontSize:30,
        color:secondaryColor,
        elevation:10
      },
})