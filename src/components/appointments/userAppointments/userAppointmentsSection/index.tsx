import { FC, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { AppointmentsList } from '@/components/appointments/appointmentList';
import {
  selectNewAppointmentsList,
  selectOldAppointmentsList,
} from '@/redux/appointments';
import { Text } from 'react-native-paper';
import { useAppSelector } from '@/hooks/store';
import { IAppointments } from '@/models/appointment.entity';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#008fd6',
    borderRadius: 50,
    marginTop: 12,
    width: '80%',
  },
  buttonContainer: {
    alignItems: 'center',
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
    bottom: 16,
    position: 'absolute',
    width: '100%',
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  listsContainer: {
    flex: 1,
    marginBottom: 24,
    padding: 16,
  },
  section: {
    flex: 1,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

interface IProps {
  isPast?: boolean;
}
export const UserAppointmentsSection: FC<IProps> = ({ isPast = false }) => {
  const appointmentsList: IAppointments[] = useAppSelector(
    isPast ? selectOldAppointmentsList : selectNewAppointmentsList,
  );

  const title = useMemo(
    () =>
      isPast
        ? 'תורי העבר שלי'
        : `קיימים ${appointmentsList.length} תורים עתידיים`,
    [isPast, appointmentsList],
  );

  return appointmentsList.length ? (
    <View style={styles.section}>
      <Text variant="titleLarge" style={styles.sectionTitle}>
        {title}
      </Text>
      <AppointmentsList appointmentsList={appointmentsList} isPast={isPast} />
    </View>
  ) : (
    <View />
  );
};
