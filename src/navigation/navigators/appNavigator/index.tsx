import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from '../../utils';
import { SplashScreen } from '@/screens';
import { EAppRoutes } from '@/models/routes.model';
import { AuthNavigator } from '../authNavigator';
import { MainNavigator } from '../mainNavigator';

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={EAppRoutes.splash}
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Group>
          <RootStack.Screen name={EAppRoutes.splash} component={SplashScreen} />

          <RootStack.Screen name={EAppRoutes.auth} component={AuthNavigator} />
          <RootStack.Screen name={EAppRoutes.main} component={MainNavigator} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
