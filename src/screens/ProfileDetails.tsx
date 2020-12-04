import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Grid, Col, Row, Thumbnail } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MapView, { Marker } from 'react-native-maps'

import type { RouteProp } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import type { RootStackParamList } from '../App'

import { colors, fonts, margins } from '../styles'


/**
 * @type ScreenNavigationProp navigation prop that the Profile Details will reiceve as a Stack Screen
 */
type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileDetails'>


/**
 * @type ScreenNavigationProp route prop that the Profile Details will reiceve as a Stack Screen
 */
type ScreenRouteProp = RouteProp<RootStackParamList, 'ProfileDetails'>


interface Props {
    navigation: ScreenNavigationProp
    route: ScreenRouteProp
}


interface State { }

/**
 * React Component for getting rendering Profile Details of a specific person
 *
 * @extends Component
 */
export class ProfileDetails extends Component<Props, State> {


    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     *
     */
    render() {
        const { age, avatar, coordinates, gender, name } = this.props.route.params
        const fullName = name.first + ' ' + name.last
        const iconName = gender === 'male' ? 'male-outline' : 'female-outline'

        return (
            <Grid style={ { ...styles.grid } }>

                <Row size={ 0.34 }>
                    <Col size={ 0.33 } style={ { justifyContent: 'center' } }>

                        <Thumbnail source={ { uri: avatar } } large style={ { marginLeft: 'auto' } } />
                    </Col>
                    <Col size={ 0.67 } style={ { justifyContent: 'center', marginLeft: margins.sectionHeaderLeftMargin } } >
                        <Text style={ { ...styles.fullNameHeader } }>Name</Text>
                        <Text style={ { ...styles.fullNameText } } >{ fullName }</Text>

                    </Col>
                </Row>

                <Row style={ { ...styles.gridMiddle } } size={ 0.38 } >
                    <MapView initialRegion={ { ...coordinates, latitudeDelta: 0.1922, longitudeDelta: 0.1822, } } style={ { ...styles.map } }>
                        <Marker coordinate={ coordinates } pinColor={ colors.darkPurple } />
                    </MapView>
                </Row>

                <Row size={ 0.28 } >
                    <Col size={ 0.40 }>
                        <Text style={ { ...styles.sectionText } } > Gender</Text>
                        <Ionicons name={ iconName } size={ 50 } color={ colors.darkPurple } style={ { ...styles.icon } } />
                    </Col>
                    <Col size={ 0.60 }>
                        <Row style={ { ...styles.bottomRightUpperRow } } size={ 0.5 }>
                            <Text style={ { ...styles.sectionText } }>Age</Text>
                            <Text style={ { ...styles.ageText, } }>{ age + ' yo' }</Text>
                        </Row>
                        <Row style={ { ...styles.bottomRightLowerRow, } } size={ 0.5 }>
                            <View style={ { justifyContent: 'space-evenly', flex: 1, alignItems: 'flex-end', } } >
                                <View style={ { ...styles.longBar } } />
                                {
                                    Array(8)
                                        .fill(null)
                                        .map((_, i) => i)
                                        .map(v => <View style={ { height: 1, width: 20, backgroundColor: colors.darkPurple } } key={ v } />)
                                }
                            </View>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        )
    }
}


const styles = StyleSheet.create({
    grid: {
        backgroundColor: colors.background
    },
    gridTop: {

    },
    gridMiddle: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: colors.borderGray,
        borderBottomColor: colors.borderGray
    },
    gridBottom: {

    },
    bottomRightUpperRow: {
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderGray,
        borderLeftColor: colors.borderGray,
    },
    bottomRightLowerRow: {
        borderLeftWidth: 1,
        borderLeftColor: colors.borderGray,
        backgroundColor: colors.lightPurple
    },
    sectionText: {
        color: colors.sectionGray,
        fontWeight: '600',
        fontSize: 17,
        left: margins.sectionHeaderLeftMargin,
        top: margins.sectionHeaderTopMargin
    },
    map: {
        flex: 1
    },
    ageText: {
        fontSize: fonts.regularTextFont,
        color: colors.sectionGray,
        fontWeight: '500',
        alignSelf: 'flex-end',
        marginLeft: 'auto',
        right: 40,
        paddingBottom: 5

    },
    icon: {
        // marginLeft: 'auto', marginRight: 'auto', alignSelf: 'center', justifyContent: 'center'
        // borderColor: 'red', borderWidth: 1,
        // flex: 1,alignSelf: 'center'
        marginTop: 'auto', marginBottom: 'auto', alignSelf: 'center'

    },
    fullNameText: {
        fontSize: fonts.regularTextFont,
        color: colors.darkPurple,
        fontWeight: '600'
    },
    fullNameHeader: {
        color: colors.sectionGray,
        fontWeight: '600',
        fontSize: 17,
    },
    longBar: {
        height: 3,
        width: 86,
        backgroundColor: colors.darkPurple,
        position: 'absolute',
        top: 0
    }
})
