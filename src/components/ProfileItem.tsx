import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, GestureResponderEvent, } from 'react-native'
import Reanimated, { timing, block, cond, Value, debug, clockRunning, Easing, set, startClock, stopClock, Clock, useCode, eq, add, interpolate, Extrapolate, not, } from 'react-native-reanimated'
import { Icon, ListItem, Left, Body, Right, Thumbnail, Text, } from 'native-base'

import { colors, fonts } from '../styles';



/**
 * Props that @component { ProfileItem } expects to receive
 */
interface Props {
    age: number
    firstName: string
    image: string
    onPress: (e: GestureResponderEvent) => void
}


export class ProfileItem extends Component<Props> {
    opacity!: Value<number>

    constructor(props: Props) {
        super(props)

        this.opacity = new Value(0)
        // @ts-ignore
        this._config = {
            duration: 500,
            toValue: new Value(1),
            easing: Easing.inOut(Easing.ease),
        };
        // @ts-ignore
        this._anim = timing(this.opacity, this._config);
    }
    componentDidMount() {
        // @ts-ignore
        this._anim.start();
    }


    render() {
        const { firstName, age, onPress, image } = this.props
        const itemBody = `${firstName}, ${age}`

        return (
            <Reanimated.View style={ { opacity: this.opacity } }>
                <ListItem>
                    <Left style={ { ...styles.left } }>
                        <Thumbnail source={ { uri: image } } style={ styles.thumbnail } />
                    </Left>
                    <Body>
                        <Text style={ styles.text }  >{ itemBody }</Text>
                    </Body>
                    <Right>
                        <TouchableOpacity
                            style={ { ...styles.button } }
                            onPress={ onPress }
                            activeOpacity={ 0.2 }
                        >
                            <Icon
                                type={ 'Ionicons' }
                                name="arrow-forward"
                                style={ { ...styles.rightArrow } }
                            />
                        </TouchableOpacity>
                    </Right>
                </ListItem>
            </Reanimated.View>
        )
    }
}



const styles = StyleSheet.create({
    rightArrow: {
        position: 'absolute',
        color: colors.textGray,
        fontSize: fonts.arrowFont,
        margin: 0,
        padding: 0
    },
    text: {
        color: colors.lightPurple,
        fontSize: fonts.regularTextFont,
        writingDirection: 'ltr'
    },
    thumbnail: {
        width: fonts.avatar,
        height: fonts.avatar,
        borderRadius: fonts.avatar / 2
    },
    left: {
        minWidth: fonts.avatar,
        maxWidth: fonts.avatar + 20
    },
    button: {
        width: fonts.arrowFont,
        height: fonts.arrowFont,
        justifyContent: 'center',
        alignItems: 'center',
    }
})