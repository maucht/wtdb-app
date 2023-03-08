import React, { Component } from 'react'
import {Text,View, Dimensions, ScrollView, Image, Touchable, TouchableHighlight, TouchableWithoutFeedback} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopRibbon from '../components/topRibbon'
import BackArrow from '../components/backArrow'
import * as Font from 'expo-font'
import {FontAwesome} from '@expo/vector-icons'
import {Entypo} from '@expo/vector-icons'

import { promiseFullList } from '../backend/fetchTable'
import { CheckBox, SearchBar } from 'react-native-elements'

import { ammoIconMap } from '../assets/constants'


const vw = Dimensions.get('window').width
const vh = Dimensions.get('window').height


var fullList=new Map();

class FullListScreen extends Component {
    state = {
        fontsLoaded:false,
        listLoaded:false,
        fullList:null,
        dropdown1Toggle:false,
        searchBarToggle:false,

        searchValue:"",
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
    filterView(){
        return(
        <View style = {styles.dropdown1}  onStartShouldSetResponder={()=>this.setState({dropdown1Toggle: !this.state.dropdown1Toggle, searchBarToggle:false})}>
        <Text style={styles.dropdownText}>Filter</Text>
        <View marginLeft={vw/1.15} marginTop={-vh/30}>
            <FontAwesome name={this.state.dropdown1Toggle==true ? "angle-up":"angle-down"} color="white" size={30}/>
        </View>
        </View> 
        )
    }
    fullFilterView(){
        return(
            <View style = {styles.fullFilterView}>
                <View style = {styles.filterTouchableView}>
                    <TouchableWithoutFeedback style = {styles.filterTouchable} onPress={()=>console.log("clicked ammo filter")}>
                        <View>
                            <Text style={styles.filterByShell}>Shell Type</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style = {styles.filterTouchableView}>
                <TouchableWithoutFeedback style={styles.filterTouchable}>
                    <View>
                        <Text style={styles.filterByShell}>Caliber</Text>
                    </View>
                </TouchableWithoutFeedback>
                </View>
                <View style = {styles.filterTouchableView}>
                <TouchableWithoutFeedback style={styles.filterTouchable}>
                    <View>
                        <Text style = {styles.filterByShell}>Explosive</Text>
                    </View>
                </TouchableWithoutFeedback></View>
                <View style = {styles.filterTouchableView}>
                <TouchableWithoutFeedback style={styles.filterTouchable}>
                    <View>
                        <Text style = {styles.filterByShell}>Nation</Text>
                    </View>
                </TouchableWithoutFeedback>
                </View>

            </View>
        )
    }
    handleSearchCancel(){ // this never fires
        console.log("cANNY")
        if(this.searchBar!=null){
            this.searchBar.blur()
        }
        
    }
    searchView(){
        switch(this.state.searchBarToggle){
            case(true):
            return(
                <>
                <SearchBar 
                round = {true} 
                showCancel={null}
                platform = {"default"}
                value = {this.state.searchValue} 
                onChangeText = {(search)=>this.setState({searchValue:search})}
                onCancel = {this.handleSearchCancel}
                containerStyle = {styles.searchBarContainer}
                inputContainerStyle = {styles.searchBarInner}
                cancelButtonTitle="Cancel"
                ref={(searchBar) => { this.searchBar = searchBar; }}
                />
                </>
            )
            break;
            case(false):
            return(
                <>
                <SearchBar 
                round = {true} 
                showCancel={null}
                platform = {"default"}
                value = {this.state.searchValue} 
                onChangeText = {(search)=>this.setState({searchValue:search})}
                onCancel = {this.handleSearchCancel}
                containerStyle = {styles.searchBarContainer}
                inputContainerStyle = {styles.searchBarInner}
                cancelButtonTitle="Cancel"
                ref={(searchBar) => { this.searchBar = searchBar; }}
                />
                </>
            )
            break;

        }
    }
    handleSearchClick(){
        console.log("SEARCH CLICKED")
        this.setState({searchBarToggle:!this.state.searchBarToggle, dropdown1Toggle:false})
    }
    searchIcon(){
        return(
            <View marginLeft = {vw/1.2} size={32} marginTop = {'-9%'} onStartShouldSetResponder={()=>this.handleSearchClick()}>
                <Entypo name = {"magnifying-glass"} color = {'white'} size = {40}/>
            </View>
        )
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
                        
                        {this.filterView()}
                        {this.state.dropdown1Toggle ? this.fullFilterView():<></>}
                        {!this.state.dropdown1Toggle? this.searchView():<></>}
                        <View height={'100%'} style={{flex:2}}>
                        <ScrollView marginTop={20}>
                            {
                                this.state.listLoaded.map((data)=>{ // There is a limit to load amount. Use pages to solve
                                    // console.log(data) use to test that every shell is being caught
                                    if(data.ShellName.toLowerCase().includes(this.state.searchValue.toLowerCase())){
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
                                }})
                            }
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
    searchBarContainer:{
        width:'95%',
        marginTop:'2.5%',
        alignSelf:'center',
        borderRadius:6,
        backgroundColor:'rgb(30,30,30)'
    },
    searchBarInner:{
        width:'90%',
        alignSelf:'center',
    },
    fullFilterView:{
        width:'100%',
        height:'30%',
        backgroundColor:'rgb(30,30,30)'
    },
    filterByShell:{
        marginLeft:'10%',
        fontSize:vh/44,
        color:'white',
        fontFamily:'Nunito-extra-bold'
    },
    filterTouchableView:{
        height:'10%',
        marginTop:'5%',

    },
}
export default FullListScreen;