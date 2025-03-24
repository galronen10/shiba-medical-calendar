import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EAppRoutes } from '@/models/routes.model';
import { LoginScreen } from '@/screens';
import { titleDisplayText } from '@/navigation/models';

const stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <stack.Navigator
      initialRouteName={EAppRoutes.login}
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        title: titleDisplayText[route.name as EAppRoutes],
      })}
    >
      <stack.Screen name={EAppRoutes.login} component={LoginScreen} />
    </stack.Navigator>
  );
};
