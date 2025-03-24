import { FC } from 'react';
import { FlatList, View } from 'react-native';
import React from 'react';
import { IAppointments } from '@/models/appointment.entity';
import { AppointmentCard } from '../appointmentCard';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
});

interface IProps {
  appointmentsList: IAppointments[];
  isPast?: boolean;
}

export const AppointmentsList: FC<IProps> = ({
  appointmentsList,
  isPast = false,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={appointmentsList}
        renderItem={({ item }) => (
          <AppointmentCard appointment={item} isPast={isPast} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};
