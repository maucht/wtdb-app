import React, { Component } from 'react'
import {Text,View, Dimensions, ScrollView, Image, Touchable, TouchableHighlight} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopRibbon from '../components/topRibbon'
import BackArrow from '../components/backArrow'
import * as Font from 'expo-font'
import {FontAwesome} from '@expo/vector-icons'

import { promiseFullList } from '../backend/fetchTable'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'


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


var fullList=new Map();

class FullListScreen extends Component {
    state = {
        fontsLoaded:false,
        listLoaded:false,
        fullList:null,
        dropdown1Toggle:false,
        listStartIndex:0, // Tick up by 10 or so every page turn
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
        promiseFullList().then((data)=>{
            fullList = data
            this.setState({fullList:true})
            this.setState({listLoaded:fullList})
        })
    }
    findAmmoIcon(ammoType){
        if(!ammoIconMap.has(ammoType)){

            return ammoIconMap.get("APHE")
        }
        else{
            return ammoIconMap.get(ammoType)
        }

    }
    shellClicked(shell){
        console.log("SHELL CLICKED",shell.ShellName)
        this.props.navigation.navigate("Shell",{shell})
    }
    render() { // should default filter to alphabetical
        switch(this.state.fontsLoaded){
            case(true):
                if(this.state.listLoaded){
                    console.log(this.state.fullList)
                    return (
                        <View style = {styles.homeContainer}>
            
                        <TopRibbon header={"Full"}/>
                        <BackArrow screenToNavigate = "Home" marginTop="10%"/>
                        <View style = {styles.dropdown1}  onStartShouldSetResponder={()=>this.setState({dropdown1Toggle: !this.state.dropdown1Toggle})}>
                            <Text style={styles.dropdownText}>Filter</Text>
                            <View marginLeft={vw/1.15} marginTop={-vh/30}>
                                <FontAwesome name={this.state.dropdown1Toggle==true ? "angle-up":"angle-down"} color="white" size={30}/>
                            </View>
                        </View>
                        <View height={'100%'} style={{flex:2}}>
                        <ScrollView marginTop={20}>
                            {
                                this.state.listLoaded.map((data)=>{ // There is a limit to load amount. Use pages to solve
                                    // console.log(data) use to test that every shell is being caught
                                    switch(ammoIconMap.has(data.ShellType)){
                                        case(false):
                                            return(
                                            <View key = {data.Id} width={'90%'} left={'5%'} backgroundColor="rgb(30,30,30)" style={{flex:1}} paddingBottom={'10%'} borderWidth={0.2} borderColor="rgb(20,20,20)">
                                                <Text key = {data.Id} style = {styles.shellNameText}>{data.ShellName}</Text>
                                                <Text style = {styles.shellTypeText}>{data.ShellType} {data.ShellCaliber}mm</Text>
                                            </View>
                                    )
                                        case(true):
                                            return(
                                            <TouchableHighlight onPress={(shell)=>this.shellClicked(data)}>
                                            <View key = {data.Id} width={'90%'} left={'5%'} backgroundColor="rgb(30,30,30)" style={{flex:1}} paddingBottom={'10%'} borderWidth={0.2} borderColor="rgb(20,20,20)">
                                                <Text style = {styles.shellNameText}>{data.ShellName}</Text>
                                                <Text style = {styles.shellTypeText}>
                                                    {data.ShellType}
                                                    {data.ShellCaliber != null ? " "+data.ShellCaliber : ""}
                                                    {data.ShellSecondCaliber != null ? "/"+data.ShellSecondCaliber : ""}mm
                                                </Text>
                                                <Image source ={this.findAmmoIcon(data.ShellType)} marginLeft={'10%'} marginTop={'10%'} style = {styles.ammoImage}/>
                                            </View>
                                            </TouchableHighlight>
                                            )
                                        }
                                })
                            }
                            <View>
                                <Text>Page</Text>
                            </View>
                        </ScrollView>
                        
                        </View>
            
                        </View>
                )
                    }
                    else{
                        return (
                            <View style = {styles.homeContainer}>
                
                            <TopRibbon header={"Full"}/>
                
                            </View>
                    )
                    }
            break;
            case(false):
                return(
                    <View style = {styles.homeContainer}>
                        <TopRibbon header = {"Full"}/>
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
    dropdown1:{
        height:'10%',
        width:'100%',
        marginTop:'0%',
        backgroundColor:'rgb(30,30,30)',
        borderTopColor:'rgb(0,0,0)',
        borderBottomWidth:0,
        bordertopWidth:2,
        justifyContent:'center',
        
    },
    dropdownText:{
        fontFamily:'Nunito-extra-bold',
        color:'white',
        marginLeft:vw/15,
        fontSize:vh/30
    },
    shellNameText:{
        fontFamily:'Nunito-extra-bold',
        fontSize:vw/20,
        color:'white',
        marginLeft:'60%',
        marginTop:'5%',
        flex:1
    },
    shellTypeText:{
        fontFamily:'Nunito-extra-bold',
        fontSize:vw/27,
        color:'rgb(100,100,100)',
        marginLeft:'60%',
        marginTop:'10%',
        flex:1,
    },
    ammoImage:{
        position:'absolute',
        height:vh/20,
        width:vh/20,
        borderRadius:6,
    },
}
export default FullListScreen;