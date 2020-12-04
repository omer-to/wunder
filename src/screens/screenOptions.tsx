import React from 'react'

import { StackNavigationOptions } from '@react-navigation/stack'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { colors, fonts } from '../styles'

/**
 * react-navigation Stack.Screen options for @component ProfileList
 */

export const profileListScreenOptions: StackNavigationOptions = {
    title: 'PROFILES',
    headerTintColor: colors.textGray,
    headerTitleAlign: 'left',
    headerTitleStyle: {
        fontSize: fonts.largeTextFont
    },
    headerRight: (props) => <Ionicons name='menu-outline' color={ colors.lightPurple } size={ 35 } style={ { marginRight: 15 } } />

}

/**
 * react-navigation Stack.Screen options for @component ProfileDetails
 */
export const profileDetailsScreenOptions: StackNavigationOptions = {
    title: 'MY PROFILE',
    headerBackTitleVisible: false,
    headerTintColor: colors.textGray,
    headerTitleAlign: 'left',
    headerBackImage: ({ tintColor }) => <Fontisto name='arrow-left-l' color={ colors.lightPurple } size={ 40 } style={ { marginLeft: 10 } } />,

}