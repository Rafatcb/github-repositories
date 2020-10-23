import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import { EnterAccount } from '../screens/EnterAccount';
import { Repositories } from '../screens/Repositories';

import type { AppStackParamList } from './types';

const AppStack = createSharedElementStackNavigator<AppStackParamList>();

export const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName="EnterAccount"
        screenOptions={{ headerShown: false }}>
        <AppStack.Screen component={EnterAccount} name="EnterAccount" />
        <AppStack.Screen component={Repositories} name="Repositories" />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
