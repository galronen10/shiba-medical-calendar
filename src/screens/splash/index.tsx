import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth } from 'config/firebase';
import { EAppRoutes } from '@/models/routes.model';
import { FullSizeLoader } from '@/components/common';

export const SplashScreen: FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      navigation.reset({
        index: 0,
        // routes: [{ name: user ? EAppRoutes.home : EAppRoutes.login }],
        routes: [{ name: EAppRoutes.main }],
      });
    });

    return () => unsubscribe();
  }, []);

  return <FullSizeLoader />;
};
