import React, { Component } from 'react'
import {Text,View, Dimensions, ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopRibbon from '../components/topRibbon'
import BackArrow from '../components/backArrow'
import * as Font from 'expo-font'
import {FontAwesome} from '@expo/vector-icons'

import { promiseFullList } from '../backend/fetchTable'


const vw = Dimensions.get('window').width
const vh = Dimensions.get('window').height


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
    render() {
        switch(this.state.fontsLoaded){
            case(true):
                if(this.state.listLoaded){
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

                        <ScrollView height={'300%'}>
                            {this.state.listLoaded.map((data)=>{ // There is a limit to load amount. Use pages to solve
                                return(
                                    <View width={'90%'} height={'1%'} left={'5%'} backgroundColor="red">
                                        <Text>{data.ShellName}</Text>
                                    </View>
                                )
                            })}
                            <View>
                                <Text>Page</Text>
                            </View>
                        </ScrollView>
            
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
    }
}
export default FullListScreen;