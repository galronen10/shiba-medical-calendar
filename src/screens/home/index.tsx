import { StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { EAppRoutes } from '@/models/routes';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
  },
});

export const HomeScreen: FC = () => {
  const navigation = useNavigation();

  const openScheduleAppointment = (): void => {
    navigation.navigate(EAppRoutes.schedulerForm);
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={openScheduleAppointment}>
        קבע פגישה
      </Button>
    </View>
  );
};
