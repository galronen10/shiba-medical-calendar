import { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useAppSelector } from '@/hooks/store';
import { api } from '@/api';
import { selectUserId } from '@/redux/user';
import { IAppointments } from '@/models/appointment.entity';
import { compareAsc } from 'date-fns';
import { Text } from 'react-native-paper';
import { AppointmentsList } from '@/components/appointments/appointmentList';

const styles = StyleSheet.create({
  container: { height: '100%', width: '100%' },
});

export const UserAppointments: FC = () => {
  const [oldAppointments, setOldAppointments] = useState<IAppointments[]>([]);
  const [newAppointments, setNewAppointments] = useState<IAppointments[]>([]);

  const userId: string = useAppSelector(selectUserId);

  useEffect(() => {
    const queryData = async () => {
      const appointmentsFromServer: IAppointments[] =
        await api.appointments.getByUser(userId);

      const currDate = new Date();

      const prevAppointment = appointmentsFromServer.filter(
        (appointment) => compareAsc(currDate, appointment.date) !== -1,
      );
      const nextAppointment = appointmentsFromServer.filter(
        (appointment) => compareAsc(currDate, appointment.date) === -1,
      );

      setOldAppointments(prevAppointment);
      setNewAppointments(nextAppointment);
    };

    if (userId) queryData();
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text>new</Text>
      <AppointmentsList appointmentsList={newAppointments} />

      <Text>old</Text>
      <AppointmentsList appointmentsList={oldAppointments} />
    </View>
  );
};
