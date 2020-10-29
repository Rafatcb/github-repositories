import React from 'react';
import { Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import { EnterAccount } from '../screens/EnterAccount';
import { Repositories } from '../screens/Repositories';
import { RepositoryDetails } from '../screens/RepositoryDetails';

import type { AppStackParamList } from './types';

const AppStack = createSharedElementStackNavigator<AppStackParamList>();

export const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName="EnterAccount"
        screenOptions={{
          gestureEnabled: Platform.OS === 'ios',
          headerShown: false,
        }}
      >
        <AppStack.Screen component={EnterAccount} name="EnterAccount" />
        <AppStack.Screen component={Repositories} name="Repositories" />
        <AppStack.Screen
          component={RepositoryDetails}
          name="RepositoryDetails"
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
