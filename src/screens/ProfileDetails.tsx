import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Grid, Col, Row, Thumbnail, H3, Text as NBText, ActionSheet, Toast } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MapView, { Marker, Callout, Region } from 'react-native-maps'
import Clipboard from '@react-native-community/clipboard'
import { showLocation } from 'react-native-map-link'

import type { RouteProp } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import type { RootStackParamList } from '../App'

import { colors, fonts, margins } from '../styles'
import { CustomCallOut } from '../components'





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
    mapview!: MapView | null

    /**
     * Called when the @component { MapView } is laid out,
     * used to animate to a region.
     */
    onLayout(): void {
        const { coordinates } = this.props.route.params
        const region: Region = {
            ...coordinates,
            latitudeDelta: 0.35,
            longitudeDelta: 0.35
        }
        this.mapview?.animateToRegion(region, 2000)
    }

    onCalloutPress(): void {
        const { contact, coordinates } = this.props.route.params
        const { email, cell } = contact
        const options = [ email, cell ]

        const buttons: string[] = [ 'Copy email', 'Copy phone number', 'Get directions', 'Cancel' ]
        const toastTexts: string[] = [ 'Email copied to clipboard', 'Phone number copied to clipboard' ]

        ActionSheet.show(
            {
                options: buttons,
                cancelButtonIndex: buttons.length - 1,
                title: "Get in touch"
            },
            buttonIndex => {
                switch (buttonIndex) {
                    case 0:
                    case 1:
                        Clipboard.setString(options[ buttonIndex ])
                        Toast.show({
                            text: toastTexts[ buttonIndex ],
                            position: "top",
                            duration: 2000,
                            textStyle: { textAlign: 'center' }
                        })
                        break;
                    case 2:
                        showLocation({
                            ...coordinates,
                            googleForceLatLon: true,  // optionally force GoogleMaps to use the latlon for the query instead of the title
                            dialogMessage: 'Choose the app you like to use', // optional (default: 'What app would you like to use?')
                        })
                        break;
                    default:
                        break;
                }
            }
        )
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     *
     */
    render() {
        const { age, avatar, coordinates, gender, name, contact } = this.props.route.params
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
                    <MapView initialRegion={ { ...coordinates, latitudeDelta: 0.00, longitudeDelta: 0.00 } }
                        onLayout={ this.onLayout.bind(this) }
                        style={ { ...styles.map } } ref={ mapview => this.mapview = mapview }>
                        <Marker coordinate={ coordinates } pinColor={ colors.darkPurple }>
                            <Callout tooltip onPress={ this.onCalloutPress.bind(this) } >
                                <CustomCallOut>
                                    <View>
                                        <H3 style={ { color: colors.white, textDecorationStyle: 'solid', textDecorationLine: 'underline' } } >Contact Info</H3>
                                        <NBText style={ { ...styles.emailText } }>{ contact.email }</NBText>
                                        <NBText style={ { ...styles.cellText } }>{ contact.cell }</NBText>
                                    </View>
                                </CustomCallOut>
                            </Callout>
                        </Marker>
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
    },
    emailText: {
        color: colors.white,
        paddingVertical: 7
    },
    cellText: {
        color: colors.white
    }
})
