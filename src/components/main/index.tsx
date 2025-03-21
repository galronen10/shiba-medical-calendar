import { MainNavigator } from '@/navigation';
import React, { FC } from 'react';
import Toast from 'react-native-toast-message';

export const Main: FC = () => {
  return (
    <>
      <MainNavigator />
      <Toast />
    </>
  );
};
