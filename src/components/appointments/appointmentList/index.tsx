import { FC } from 'react';
import { FlatList, View } from 'react-native';
import React from 'react';
import { IAppointments } from '@/models/appointment.entity';
import { AppointmentCard } from '../appointmentCard';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 20,
    paddingTop: 30,
    width: '100%',
  },
  formBody: {
    alignContent: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 30,
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
      <View style={styles.formBody}>
        <FlatList
          data={appointmentsList}
          renderItem={({ item }) => (
            <AppointmentCard appointment={item} isPast={isPast} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};
