import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from '../../utils';
import { HomeScreen, LoginScreen, SplashScreen } from '@/screens';
import { EAppRoutes } from '@/models/routes';
import { SchedulerNavigator } from '../schedulerNavigator';

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={EAppRoutes.splash}>
        <RootStack.Group
          screenOptions={{
            headerShown: false,
          }}
        >
          <RootStack.Screen name={EAppRoutes.splash} component={SplashScreen} />
          <RootStack.Screen
            name={EAppRoutes.schedulerForm}
            component={SchedulerNavigator}
            options={{ headerShown: false }}
          />

          <RootStack.Screen name={EAppRoutes.home} component={HomeScreen} />
          <RootStack.Screen name={EAppRoutes.login} component={LoginScreen} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
