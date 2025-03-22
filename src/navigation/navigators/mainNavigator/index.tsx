import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from '../../utils';
import { HomeScreen, LoginScreen, SplashScreen } from '@/screens';
import { EAppRoutes } from '@/models/routes.model';
import { SchedulerNavigator } from '../schedulerNavigator';
import { titleDisplayText } from '@/navigation/models';
import { UserAppointments } from '@/screens/userAppointments';

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={EAppRoutes.splash}>
        <RootStack.Group
          screenOptions={({ route }) => ({
            headerTitleAlign: 'center',
            title: titleDisplayText[route.name as EAppRoutes],
          })}
        >
          <RootStack.Screen
            name={EAppRoutes.splash}
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name={EAppRoutes.userAppointments}
            component={UserAppointments}
            options={{ headerShown: true }}
          />
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
