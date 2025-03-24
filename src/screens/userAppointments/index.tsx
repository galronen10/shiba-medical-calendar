import { FC, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useAppSelector } from '@/hooks/store';
import { IAppointments } from '@/models/appointment.entity';
import { Text } from 'react-native-paper';
import { AppointmentsList } from '@/components/appointments/appointmentList';
import {
  selectOldAppointmentsList,
  selectNewAppointmentsList,
  loadAppointments,
} from '@/redux/appointments';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux';

const styles = StyleSheet.create({
  container: { height: '100%', width: '100%' },
});

export const UserAppointments: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const oldAppointments: IAppointments[] = useAppSelector(
    selectOldAppointmentsList,
  );
  const newAppointments: IAppointments[] = useAppSelector(
    selectNewAppointmentsList,
  );

  useEffect(() => {
    dispatch(loadAppointments());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text>new</Text>
      <AppointmentsList appointmentsList={newAppointments} />

      <Text>old</Text>
      <AppointmentsList appointmentsList={oldAppointments} isPast />
    </View>
  );
};
