import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EAppRoutes } from '@/models/routes.model';
import { HomeScreen } from '@/screens';
import { titleDisplayText } from '@/navigation/models';
import { SchedulerNavigator } from '../schedulerNavigator';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux';
import { loadAppointments } from '@/redux/appointments';
import { LogoutButton } from '@/navigation/components';

const stack = createNativeStackNavigator();

export const MainNavigator = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadAppointments());
  }, []);

  return (
    <stack.Navigator
      initialRouteName={EAppRoutes.home}
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        title: titleDisplayText[route.name as EAppRoutes],
      })}
    >
      <stack.Screen
        name={EAppRoutes.schedulerForm}
        component={SchedulerNavigator}
        options={{ headerShown: false }}
      />

      <stack.Screen
        name={EAppRoutes.home}
        component={HomeScreen}
        options={() => ({ headerRight: LogoutButton })}
      />
    </stack.Navigator>
  );
};
