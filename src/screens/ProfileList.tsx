import React, { Component } from 'react'
import { Container, Content, List } from 'native-base'

import type { GestureResponderEvent } from 'react-native'
import type { RouteProp } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import type { RootStackParamList } from '../App'

import { ProfileItem } from '../components'
import { randomUserGenerator } from '../api'
import { IProfile } from '../models'


type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileList'>
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ProfileList'>

interface Props {
    navigation: ProfileScreenNavigationProp
    route: ProfileScreenRouteProp
}
interface State {
    profiles: IProfile[]
}

import { interval, Subscription, pipe, timer } from 'rxjs'
import { startWith, takeUntil, takeWhile } from 'rxjs/operators'

/**
 * React Component for rendering Profiles in a scrollview.
 *
 * @extends Component
 */
export class ProfileList extends Component<Props, State> {
    subscription!: Subscription
    /**
    * Constructor of the component.
    *
    * @inheritdoc
    */
    constructor(props: Props) {
        super(props)
        this.state = {
            profiles: []
        }
    }


    /**
     * Implements {@link Component#componentDidMount()}. Invoked immediately
     * after this component is mounted.
     *
     * @inheritdoc
     * 
     */
    componentDidMount(): void {
        this.props.navigation.addListener('blur', this.onScreenBlur.bind(this))
        this.props.navigation.addListener('focus', this.onScreenFocus.bind(this))
    }


    /**
     * Implements React's {@link Component#componentWillUnmount()}. Invoked
     * immediately before this component is unmounted and destroyed.
     *
     * @inheritdoc
     */
    componentWillUnmount() {
        this.subscription && this.subscription.unsubscribe()
        this.props.navigation.removeListener('blur', this.onScreenBlur)
        this.props.navigation.removeListener('focus', this.onScreenFocus)
        console.log('[ componentWillUnmount this.onScreenFocus ]', this.onScreenFocus)
    }


    /**
     * Method that will fetch data every 5 seconds when the user is on the page,
     * until 50 profiles are fetched,
     * and update the component state accordingly.
     */
    onScreenFocus() {
        const observable$ = interval(2000)
            .pipe(
                startWith(0),
                takeWhile(() => this.state.profiles.length <= 49)
            )
        this.subscription = observable$.subscribe(async () => {
            const user = await randomUserGenerator()
            this.setState({ profiles: [ ...this.state.profiles, user ] })
        })
    }


    /**
     * Method that will stop fetching data when the user is navigated to another page
     * by unsubscribing from RxJS observable.
     */
    onScreenBlur() {
        this.subscription.unsubscribe()
    }


    /**
     * 
     * @param profile User information to pass into the destination component, i.e., @component ProfileDetails
     * @param e React Native event that is triggerred upon pressing
     */
    onPress(profile: IProfile, e: GestureResponderEvent,): void {
        this.props.navigation.navigate('ProfileDetails', profile)
    }


    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     *
     */
    render() {
        const { profiles } = this.state
        return (
            <Container>
                <Content>
                    <List>
                        {
                            profiles.map((profile) =>
                                <ProfileItem
                                    age={ profile.age }
                                    firstName={ profile.name.first }
                                    image={ profile.avatar }
                                    onPress={ this.onPress.bind(this, profile) }
                                    key={ profile.name.first + profile.name.last + profile.age }
                                />)
                        }
                    </List>
                </Content>
            </Container>
        )
    }
}
