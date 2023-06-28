import React, { Component } from 'react'
import {Text,View, Dimensions, ScrollView, Image, Touchable, TouchableHighlight} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopRibbon from '../components/topRibbon'
import BackArrow from '../components/backArrow'
import * as Font from 'expo-font'
import {FontAwesome} from '@expo/vector-icons'
import {Entypo} from '@expo/vector-icons'

import { promiseFullList } from '../backend/fetchTable'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { SearchBar } from 'react-native-elements'

import Checkbox from 'expo-checkbox';

import { ammoIconMap } from '../assets/constants'
import Shell from './shell'
import AsyncStorage from '@react-native-async-storage/async-storage';

const vw = Dimensions.get('window').width
const vh = Dimensions.get('window').height




class ShellTypeObj{
    index;
    name;
    filterChecked;
}

var fullList=new Map();

class FullListScreen extends Component {
    state = {
        natNav:this.props.route.params.nation,

        fontsLoaded:false,
        listLoaded:false,
        fullList:null,
        dropdown1Toggle:false,
        searchBarToggle:false,

        iterateFilterTypeHash: new Map(), // 1 dont filter, 2 filter
        filterShellTypeObjects: [],
        loadedFilterTypes:false,
        allFilterChecks:[],
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
    async loadTestData(){
        try{
            await AsyncStorage.setItem("tempkey","mmmUh")
        }
        catch(error){
            console.log("loadTestData error:",error)
        }
    }
    async loadList() {
        const cached = await AsyncStorage.getItem("FullList");
        console.warn("THIS IS CACHED:", cached);
      
        if (cached == null || JSON.parse(cached) == null) {
          console.log("Caching full list for the first time");
      
          try {
            const myData = await promiseFullList();
            this.setState({ fullList: true, listLoaded: myData });
            await AsyncStorage.setItem("FullList", JSON.stringify(myData));
          } catch (error) {
            console.log("Error retrieving or storing full list:", error);
          }
        } else {
          this.setState({
            fullList: true,
            listLoaded: JSON.parse(cached),
          });
          console.log("Full list already in cache:", cached);
        }
      }
      
      
    componentDidMount(){
        this.loadFonts()
        this.loadTestData()
        this.loadList()
        /*=promiseFullList().then((data)=>{
            fullList = data
            this.setState({fullList:true})
            this.setState({listLoaded:fullList})
        })*/
        console.log("NAVIGATING FROM:",this.state.natNav)

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
        if(this.state.dropdown1Toggle == false){
            return(
            <View style = {styles.dropdown1}  onStartShouldSetResponder={()=>this.setState({dropdown1Toggle: !this.state.dropdown1Toggle, searchBarToggle:false})}>
            <Text style={styles.dropdownText}>Filter</Text>
            <View marginLeft={vw/1.15} marginTop={-vh/30}>
                <FontAwesome name={this.state.dropdown1Toggle==true ? "angle-up":"angle-down"} color="white" size={30}/>
            </View>
            </View> )
        }
        else{
            // i implemented this bubble sort all by myself from scratch. very proud.
            for(let i = 0; i < (this.state.filterShellTypeObjects.length) - 1; i ++){
                for(let j = i + 1; j < this.state.filterShellTypeObjects.length; j ++){
                    if(this.state.filterShellTypeObjects[j].name.charAt(0) < this.state.filterShellTypeObjects[i].name.charAt(0)){
                        let temp = this.state.filterShellTypeObjects[j]
                        this.state.filterShellTypeObjects[j] = this.state.filterShellTypeObjects[i]
                        this.state.filterShellTypeObjects[i] = temp
                    }

                }
            }
            for(let i = 0; i < this.state.filterShellTypeObjects.length; i ++){
                this.state.filterShellTypeObjects[i].index = i
            }
            //this.state.filterShellTypeObjects[0].filterChecked = true // test check for AP
            return(
                <View style = {styles.dropdown1Open} >
                <Text style={styles.dropdownText} onStartShouldSetResponder={()=>this.setState({dropdown1Toggle: !this.state.dropdown1Toggle, searchBarToggle:false
                , iterateFilterTypeHash: new Map()
                })}>Filter</Text>
                <View marginLeft={vw/1.15} marginTop={-vh/30} onStartShouldSetResponder={()=>
                    this.setState({dropdown1Toggle: !this.state.dropdown1Toggle, searchBarToggle:false,
                    
                    })}>
                    <FontAwesome name={this.state.dropdown1Toggle==true ? "angle-up":"angle-down"} color="white" size={30}/>
                </View>
                
                <View height={'100%'} style={{flex:2}}>
                        <ScrollView marginTop={20}>
                            {
                                this.state.filterShellTypeObjects.map((typeObj)=>{
                                    return(
                                        <View key ={typeObj.name} style = {styles.filterRow}>
                                            <Text style = {styles.filterType}>{typeObj.name}
                                            <Checkbox
                                            style = {styles.filterCheckbox}
                                            value = {typeObj.filterChecked}
                                            onValueChange={()=>{
                                                let tempTypeArray = this.state.filterShellTypeObjects
                                                let tempIterateMap = this.state.iterateFilterTypeHash
                                                tempTypeArray[typeObj.index].filterChecked = !this.state.filterShellTypeObjects[typeObj.index].filterChecked
                                                tempIterateMap[typeObj.name] = 2
                                                this.setState({
                                                    filterShellTypeObjects: tempTypeArray,
                                                    iterateFilterTypeHash:tempIterateMap
                                                },()=>{
                                                    let tempCheckedTypes = []
                                                    for(let i = 0; i < this.state.filterShellTypeObjects.length; i ++){
                                                        if(this.state.filterShellTypeObjects[i].filterChecked === true){
                                                            tempCheckedTypes.push(this.state.filterShellTypeObjects[i].name)
                                                        }
                                                    }
                                                    this.setState({
                                                        allFilterChecks:tempCheckedTypes
                                                    },()=>{console.log(this.state.allFilterChecks)})})

                                                // IMPLEMENT A FOR LOOP ITERATING THROUGH ALL OBJECTS, CHECK WHICH BOXES ARE CHECKED. ALSO REMEMBER TO UNSET CHECKED.
                                            }
                                            }
                                            />
                                            </Text>

                                        </View>
                                        )
                                })
                            }
                        </ScrollView>
                        
                        </View>

                </View> )
            }
        }
    handleSearchCancel(){
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
    codifyNatName(nationRaw){
        const natNameMap = new Map([
            ["United States", "USA"],
            ["Germany", "GER"]
        ])
        //console.log("COFIDYING",nationRaw,"TO", natNameMap.get(nationRaw))
        return natNameMap.get(nationRaw)
    }
    render() { // should default filter to alphabetical
        switch(this.state.fontsLoaded){
            case(true):
                if(this.state.listLoaded){
                    console.log(this.state.fullList)
                    return (
                        <View style = {styles.homeContainer}>
                        
                        <TopRibbon header={this.state.natNav == undefined ? "Full" : this.state.natNav}/>
                        <BackArrow screenToNavigate = "Home" marginTop={100}/>
                        
                        {!this.state.searchBarToggle ? this.filterView():<></>}
                        {this.searchView()}
                        <View height={'100%'} style={{flex:2}}>
                        <ScrollView marginTop={20}>
                            {
                                this.state.listLoaded.map((data)=>{ // There is a limit to load amount. Use pages to solve
                                    // console.log(data) use to test that every shell is being caught
                                    // TESTING
                                    if(!this.state.iterateFilterTypeHash.has(data.ShellType) && !this.state.loadedTypes){
                                        this.state.iterateFilterTypeHash.set(data.ShellType,1)
            
                                        
                                        let currObj = new ShellTypeObj()
                                        currObj.name = data.ShellType
                                        currObj.filterChecked = false
                                        this.state.filterShellTypeObjects.push(currObj)
                                    }
                                    // TESTING END

                                    if(data.ShellName.toLowerCase().includes(this.state.searchValue.toLowerCase()) 
                                    && (this.state.allFilterChecks.length === 0 || this.state.allFilterChecks.includes(data.ShellType))
                                    && (this.state.natNav == undefined || this.codifyNatName(this.state.natNav) == data.Nation)
                                    ){
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
                            {
                                ()=>{this.setState({
                                    loadedFilterTypes:true
                                })
                            }
                            }
                        </ScrollView>
                        
                        </View>
            
                        </View>
                )
                    }
                    else{
                        return (
                            <View style = {styles.homeContainer}>
                
                            <TopRibbon header={this.state.natNav == undefined ? "Full" : this.state.natNav}/>
                
                            </View>
                    )
                    }
            break;
            case(false):
                return(
                    <View style = {styles.homeContainer}>
                        <TopRibbon header={this.state.natNav == undefined ? "Full" : this.state.natNav}/>
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
        elevation:1
        //justifyContent:'center',
        
    },
    dropdown1Open:{
        height:'40%',
        width:'100%',
        marginTop:'0%',
        backgroundColor:'rgb(30,30,30)',
        borderTopColor:'rgb(0,0,0)',
        borderBottomWidth:0,
        bordertopWidth:2,
        //justifyContent:'center',
        
    },
    dropdownText:{
        fontFamily:'Nunito-extra-bold',
        color:'white',
        marginLeft:vw/15,
        marginTop:vh/40,
        fontSize:30
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

    filterType:{
        color:'white',
        fontFamily:'Nunito-extra-bold',
        fontSize:vw/27,
        marginBottom:'5%',
        marginLeft:'10%',
        paddingRight:10
        

    },
    filterRow:{
        
        
        
    },
    filterCheckbox:{
        transform: [{translateX: 10}],
        top:0,
        left:0,
        position:'absolute'
    },
}
export default FullListScreen;