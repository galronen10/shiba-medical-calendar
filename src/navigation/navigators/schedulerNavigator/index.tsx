import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EAppRoutes } from '@/models/routes.model';
import {
  SelectMedicalFieldFormScreen,
  SelectDoctorScreen,
  SelectTimeScreen,
} from '@/screens';
import { titleDisplayText } from '@/navigation/models';
import { HeaderCloseForm } from '@/navigation/components';

const stack = createNativeStackNavigator();

export const SchedulerNavigator = () => {
  return (
    <stack.Navigator
      initialRouteName={EAppRoutes.selectField}
      screenOptions={({ route, navigation: { navigate } }) => ({
        headerTitleAlign: 'center',
        title: titleDisplayText[route.name as EAppRoutes],
        headerRight: () => <HeaderCloseForm navigate={navigate} />,
      })}
    >
      <stack.Screen
        name={EAppRoutes.selectField}
        component={SelectMedicalFieldFormScreen}
      />
      <stack.Screen
        name={EAppRoutes.selectDoctor}
        component={SelectDoctorScreen}
      />
      <stack.Screen name={EAppRoutes.selectTime} component={SelectTimeScreen} />
    </stack.Navigator>
  );
};
