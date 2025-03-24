import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth } from 'config/firebase';
import { EAppRoutes } from '@/models/routes.model';
import { FullSizeLoader } from '@/components/common';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux';
import { loadAppointments } from '@/redux/appointments';

export const SplashScreen: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadAppointments());
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) dispatch(loadAppointments());

      navigation.reset({
        index: 0,
        // routes: [{ name: user ? EAppRoutes.home : EAppRoutes.login }],
        routes: [{ name: EAppRoutes.home }],
      });
    });

    return () => unsubscribe();
  }, []);

  return <FullSizeLoader />;
};
