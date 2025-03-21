import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EAppRoutes } from '@/models/routes';
import {
  SelectMedicalFieldScreen,
  SelectDoctorScreen,
  SelectTimeScreen,
} from '@/screens';
import { titleDisplayText } from '@/navigation/models';
import { HeaderCloseForm } from '@/navigation/components';

const stack = createNativeStackNavigator();

export const SchedulerNavigator = () => {
  return (
    <stack.Navigator
      screenOptions={({ route, navigation: { navigate } }) => {
        const pageName = titleDisplayText[route.name as EAppRoutes];
        return {
          headerTitleAlign: 'center',
          title: pageName,
          tabBarLabel: pageName,
          headerRight: () => <HeaderCloseForm navigate={navigate} />,
        };
      }}
    >
      <stack.Screen
        name={EAppRoutes.selectField}
        component={SelectMedicalFieldScreen}
      />
      <stack.Screen
        name={EAppRoutes.selectDoctor}
        component={SelectDoctorScreen}
      />
      <stack.Screen name={EAppRoutes.selectTime} component={SelectTimeScreen} />
    </stack.Navigator>
  );
};
