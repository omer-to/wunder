import React from 'react'
import { View, StyleSheet } from 'react-native'
import { H3, Text as NBText } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { colors, fonts } from '../styles'


/**
 * Props that @component { ContactInfo } expects to receive
 */
interface Props {
    contact: { email: string, cell: string, phone: string }
    children?: React.ReactNode
}


/**
 * 
 * Presentational React component rendering the content of the custom callout.
 * 
 */
export function ContactInfo(props: Props): JSX.Element {
    const { contact } = props

    return (
        <View>
            <H3 style={ styles.header } >Contact Info</H3>
            <View style={ styles.contactInfoContainer }>
                <Ionicons
                    name='mail-outline'
                    color={ colors.white }
                    size={ fonts.regularTextFont }
                    style={ styles.icon }
                />
                <NBText style={ { ...styles.emailText } }>{ contact.email }</NBText>
            </View>
            <View style={ styles.contactInfoContainer }>
                <Ionicons
                    name='md-phone-portrait-outline'
                    color={ colors.white }
                    size={ fonts.regularTextFont }
                    style={ styles.icon }
                />
                <NBText style={ { ...styles.cellText } }>{ contact.cell }</NBText>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        color: colors.white,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline'
    },
    contactInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    emailText: {
        color: colors.white,
        paddingVertical: 7
    },
    cellText: {
        color: colors.white
    },
    icon: {
        marginRight: 10
    }
})