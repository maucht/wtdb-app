import React, { Component } from 'react'
import {Text,View, Dimensions, ScrollView, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopRibbon from '../components/topRibbon'
import BackArrow from '../components/backArrow'
import * as Font from 'expo-font'
import {FontAwesome} from '@expo/vector-icons'
import { promiseFullList } from '../backend/fetchTable'
import {secondaryColor} from '../assets/colorPallette.js'

const vw = Dimensions.get('window').width
const vh = Dimensions.get('window').height

const ammoIconMap = new Map([
  ["HE",require("../assets/ammoIcons/HE_icon.png")],
  ["AP",require("../assets/ammoIcons/AP_icon.png")],
  ["APHE",require("../assets/ammoIcons/APHE.png")],
  ["AC",require("../assets/ammoIcons/AC_icon.png")],
  ["APBC",require("../assets/ammoIcons/APBC_icon.png")],
  ["APC",require("../assets/ammoIcons/APC_icon.png")],
  ["APCBC",require("../assets/ammoIcons/APCBC_icon.png")],
  ["APCR",require("../assets/ammoIcons/APCR_icon.png")],
  ["APDS",require("../assets/ammoIcons/APDS_icon.png")],
  ["APFSDS",require("../assets/ammoIcons/APFSDS_icon.png")],
  ["APHECBC",require("../assets/ammoIcons/APHECBC_icon.png")],
  ["ATGM",require("../assets/ammoIcons/ATGM_icon.png")],
  ["ATGM-HE",require("../assets/ammoIcons/ATGM-HE_icon.png")],
  ["ATGM-OTA",require("../assets/ammoIcons/ATGM-OTA_icon.png")],
  ["ATGM-TANDEM",require("../assets/ammoIcons/ATGM-Tandem_Icon.png")],
  ["ATGM-VT",require("../assets/ammoIcons/ATGM-VT_icon.png")],
  ["HEAT",require("../assets/ammoIcons/HEAT_icon.png")],
  ["HEATFS",require("../assets/ammoIcons/HEATFS_icon.png")],
  ["HEATFS-VT",require("../assets/ammoIcons/HEATFS-VT_icon.png")],
  ["HEAT-GRENADE",require("../assets/ammoIcons/HEAT-Grenade_icon.png")],
  ["HE-GRENADE",require("../assets/ammoIcons/HE-Grenade_icon.png")],
  ["HESH",require("../assets/ammoIcons/HESH_icon.png")],
  ["HE-TF",require("../assets/ammoIcons/HE-TF_icon.png")],
  ["HE-VT",require("../assets/ammoIcons/HE-VT_icon.png")],
  ["ROCKET",require("../assets/ammoIcons/Rocket_icon.png")],
  ["SHRAPNEL",require("../assets/ammoIcons/Shrapnel_icon.png")],
  ["VOG",require("../assets/ammoIcons/VOG_icon.png")],
])


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

    findAmmoIcon(ammoType){
      if(!ammoIconMap.has(ammoType)){
          return ammoIconMap.get("APHE")
      }
      else{
          return ammoIconMap.get(ammoType)
      }

  }
  componentDidMount(){
    this.loadFonts()
  }
  nonAtgmFields(){ // Call these to only return fields that are used when needed
    if(this.state.shellData.ShellCaliber!=null){
    return (
      <Text style = {styles.shellCaliberText}>Caliber: {this.state.shellData.ShellCaliber}{this.secondCaliberFields()}</Text>
    )
    }
  }
  explosiveFields(){
    if(this.state.shellData.TntEquivalent!=null){
    return(
      <>
      <Text style = {styles.shellCaliberText}>TNT Equivalent: {this.state.shellData.TntEquivalent}g</Text>
      <Text style={styles.shellCaliberText}>Fuze Sensitivity: {this.state.shellData.FuzeSensitivity}mm</Text>
      </>
    )
    }
  } 
  secondCaliberFields(){
    if(this.state.shellData.ShellSecondCaliber!=null){
      return(
        <Text>/{this.state.shellData.ShellSecondCaliber}mm</Text>
      )
    }
    else{
      return(
        <Text>mm</Text>
      )
    }
  }
  penFields(){
    return(
      <>
      <Text style = {styles.topPenText}><Text style = {styles.penDistHeaders}>10m</Text> - {this.state.shellData.TenPen}mm        <Text style = {styles.topPenText}><Text style = {styles.penDistHeaders}>100m</Text> - {this.state.shellData.HundredPen}mm</Text></Text>
      
      <Text style = {styles.topPenText}><Text style = {styles.penDistHeaders}>500m</Text> - {this.state.shellData.FiveHundredPen}mm       <Text style = {styles.topPenText}><Text style = {styles.penDistHeaders}>1000m</Text> - {this.state.shellData.ThousandPen}mm</Text></Text>

      </>
    )
  }
  render() {
    switch(this.state.fontsLoaded){
      case(true):
      return (
        <View style = {styles.homeContainer}>
          <TopRibbon header = {"Details"}/>
          <BackArrow screenToNavigate = "FullList" marginTop="10%"/>
          
          <View style = {styles.infoSection}>
          <Text style = {styles.shellNameHeader}>{this.state.shellData.ShellName}</Text>
          <Image source = {this.findAmmoIcon(this.state.shellData.ShellType)} style = {styles.ammoImage}/>
          <Text style = {styles.shellTypeText}>Type: {this.state.shellData.ShellType}</Text>
          <Text style = {styles.shellTypeText}>Velocity: {this.state.shellData.Velocity} m/s</Text>
          {this.nonAtgmFields()}
          {this.explosiveFields()}
          <Text style = {styles.shellPenStatsHeader}>Pen Stats</Text>
          <View style = {styles.shellPenStats}>
            {this.penFields()}
          </View>
          <Text></Text>
          </View>
          
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
  infoSection:{
    height:'82%',
    width:'94%',
    marginTop:'10%',
    marginLeft:'3%',
    padding:'3%',
    backgroundColor:'rgb(30,30,30)'
  },
  ammoImage:{
    position:'relative',
    height:vh/12,
    width:vh/12,
    marginTop:'3%',
    borderRadius:6,
    alignSelf:'center'
},
  shellNameHeader:{
    textAlign:'center',
    fontFamily:'Nunito-bold',
    fontSize:vw/15,
    color:'white',
  },
  shellTypeText:{
    color:'rgb(205,205,205)',
    fontFamily:'Nunito-bold',
    marginTop:'10%',
    fontSize: vh/46,
  },
  shellCaliberText:{
    color:'rgb(205,205,205)',
    fontFamily:'Nunito-bold',
    marginTop:'10%',
    fontSize: vh/46,
  },
  shellPenStatsHeader:{
    alignSelf:'center',
    color:'rgb(245,245,245)',
    fontSize:vh/40,
    fontFamily:'Nunito-bold',
    marginTop:vh/26,
  },
  shellPenStats:{
    position:'absolute',
    width:'100%',
    height:'25%',
    marginTop:'140%',
    alignSelf:'center',
    borderWidth:4,
    justifyContent:'center',
    paddingBottom:'5%',
    paddingLeft:'5%',
  },
  topPenText:{
    color:'rgb(205,205,205)',
    fontSize:vw/22.5,
    marginLeft:vw/20,
    marginTop:vh/50,
    fontFamily:'Nunito-bold', 
  },
  penDistHeaders:{
    color:secondaryColor,
  },
}

export default Shell;
