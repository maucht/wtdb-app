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

const styles = StyleSheet.create({
    pageRibbon:{
        width:'100%',
        height:'10%',
        justifyContent:'center', 
        backgroundColor:'rgb(30,30,30)'
    
    },
      pageRibbonHeader:{
        textAlign:'center',
        fontFamily:'Nunito-extra-bold',
        marginTop:vh/38,
        fontSize:vw/15,
        color:secondaryColor,
      },
})