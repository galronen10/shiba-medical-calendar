import { GenderIcon } from '@/components/common';
import { IAppointments } from '@/models/appointment.entity';
import { dateToTimeStringFormatter, dateToStringFormatter } from '@/utils/date';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';
import { AppointmentCardActions } from '../appointmentCardAction';

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    height: 'auto',
    margin: 10,
    overflow: 'hidden',
    width: 300,
  },
  details: {
    fontSize: 16,
    marginVertical: 4,
  },

  subTitle: {
    fontSize: 14,
    textAlign: 'right',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

interface IProps {
  appointment: IAppointments;
  isPast: boolean;
}

export const AppointmentCard: React.FC<IProps> = ({ appointment, isPast }) => {
  const { doctor, medicalField, date } = appointment;
  const timeString = useMemo(() => dateToTimeStringFormatter(date), [date]);
  const dateString = useMemo(() => dateToStringFormatter(date), [date]);

  return (
    <Card style={styles.card}>
      <Card.Title
        title={doctor.name}
        titleStyle={styles.title}
        subtitleStyle={styles.subTitle}
        subtitle={`תחום שירות: ${medicalField.name}`}
        right={() => <GenderIcon isFemale={doctor.isFemale} />}
      />
      <Divider />
      <Card.Content>
        <Text style={styles.details}>ביקור ב{doctor.clinicName}</Text>
        <Text
          style={styles.details}
        >{`בתאריך ${dateString} בשעה ${timeString}`}</Text>
      </Card.Content>
      <Divider />
      <AppointmentCardActions appointment={appointment} isPast={isPast} />
    </Card>
  );
};
