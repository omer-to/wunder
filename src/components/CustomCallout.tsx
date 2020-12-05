import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import type { ViewStyle } from 'react-native'

import { colors } from '../styles'


interface Props {
    style?: ViewStyle
}


/**
 * Map callout that displays when the user presses on a marker on the map.
 */
export class CustomCallOut extends Component<Props> {
    render() {
        return (
            <View style={ [ styles.container, ] } >
                <View style={ [ styles.bubble, this.props.style ] }>
                    { this.props.children }
                </View>
                <View style={ styles.arrowBorder } />
                <View style={ styles.arrow } />
            </View>
        )
    }
}



const bubleTop = 14
const arrowMarginTop = - bubleTop - 4

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'center',
        flex: 1,
        backgroundColor: 'transparent',
    },
    bubble: {
        flexDirection: 'row',
        backgroundColor: colors.darkPurple,
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 10,
        top: bubleTop,
        borderColor: 'transparent',
    },
    arrow: {
        alignSelf: 'center',
        borderWidth: 16,
        borderTopColor: colors.darkPurple,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        marginTop: arrowMarginTop,
    },
    arrowBorder: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 16,
    },
});