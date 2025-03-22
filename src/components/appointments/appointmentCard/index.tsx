import { GenderIcon } from '@/components/common';
import { IAppointments } from '@/models/appointment.entity';
import { dateToTimeStringFormatter, dateToStringFormatter } from '@/utils/date';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Button, Divider } from 'react-native-paper';

const styles = StyleSheet.create({
  actions: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  cancelButton: {
    alignSelf: 'center',
    marginVertical: 5,
  },
  card: {
    borderRadius: 10,
    height: 100,
    margin: 10,
    overflow: 'hidden',
    width: 200,
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
}

export const AppointmentCard: React.FC<IProps> = ({
  appointment: { doctor, medicalField, date, id },
}) => {
  const onAddReminder = () => {};
  const onReschedule = () => {};
  const onCancel = () => {};

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
      <Card.Actions style={styles.actions}>
        <Button icon="calendar" onPress={onAddReminder}>
          הוספת תזכורת
        </Button>
        <Button icon="sync" onPress={onReschedule}>
          שינוי תור
        </Button>
      </Card.Actions>
      <Divider />
      <Button
        mode="text"
        onPress={onCancel}
        textColor="red"
        icon="close-circle-outline"
        style={styles.cancelButton}
      >
        ביטול תור
      </Button>
    </Card>
  );
};
