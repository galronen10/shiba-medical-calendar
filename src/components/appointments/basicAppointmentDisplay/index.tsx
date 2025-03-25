/* eslint-disable react-native/no-raw-text */
import React, { FC } from 'react';
import { Text, Card, Divider } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { GenderIcon } from '@/components/common';
import { IDoctor } from '@/models/doctor.model';
import { IMedicalField } from '@/models/medicalField.model';
import { ISchedulerSelectedTime } from '@/models/schedulerForm.model';

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
    textAlign: 'right',
  },
  details: {
    fontSize: 16,
    fontWeight: 'bold',
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
  doctor: IDoctor;
  medicalField: IMedicalField;
  time: ISchedulerSelectedTime;
}

export const BasicAppointmentDisplay: FC<IProps> = ({
  doctor,
  medicalField,
  time,
}) => {
  return (
    <Card style={styles.card}>
      <Card.Title
        title={doctor.name}
        titleStyle={styles.title}
        subtitleStyle={styles.subTitle}
        subtitle={`תחום שירות: ${medicalField.name}`}
        right={() => <GenderIcon isFemale={!!doctor.isFemale} />}
      />
      <Divider />
      <Card.Content>
        <Text style={styles.details}>ביקור ב{doctor.clinicName}</Text>
        <Text
          style={styles.details}
        >{`בתאריך ${time.date} בשעה ${time.time}`}</Text>
      </Card.Content>
    </Card>
  );
};
