import PropTypes from 'prop-types'
import {Text,View, Dimensions, ScrollView, Image, Touchable, TouchableHighlight} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopRibbon from '../components/topRibbon'
import BackArrow from '../components/backArrow'
import React, { Component } from 'react'
import { secondaryColor } from '../assets/constants'
import * as Font from 'expo-font'

const vw = Dimensions.get('window').width
const vh = Dimensions.get('window').height

class NationWise extends Component {
    state = {
        nation: this.props.route.params.nation
    }
    render() {
        return (
            <Text>{this.state.nation}</Text>
        )
    }
}
export default NationWise