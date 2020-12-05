import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import RNBootSplash from 'react-native-bootsplash'
import { Root } from 'native-base'

import { ProfileList, ProfileDetails, profileListScreenOptions, profileDetailsScreenOptions } from './screens'

import type { IProfile } from './models'


export type RootStackParamList = {
  ProfileList: undefined;
  ProfileDetails: IProfile
}

const Stack = createStackNavigator<RootStackParamList>()

export function App() {

  /**
   * Effect hook to hide the splash screen when the component,
   * and hence the whole component tree mounts.
   */
  React.useEffect(() => {
    RNBootSplash.hide({ fade: true })
  }, [])

  return (
    <Root>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='ProfileList'
            options={ profileListScreenOptions }
            component={ ProfileList } />
          <Stack.Screen
            name='ProfileDetails'
            options={ profileDetailsScreenOptions }
            component={ ProfileDetails } />
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  )
}