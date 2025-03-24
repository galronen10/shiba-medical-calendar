import { View } from 'react-native';
import React, { FC, useMemo } from 'react';
import { IDoctor } from '@/models/doctor.model';
import { Button, Card, IconButton, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { GenderIcon } from '@/components/common';

export const styles = StyleSheet.create({
  actions: {
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
    padding: 10,
  },
  card: {
    alignContent: 'center',
  },
  container: {
    margin: 10,
  },
  detailRow: {
    aligndoctors: 'center',
    flexDirection: 'row-reverse',
  },
  detailText: {
    fontSize: 13,
    marginLeft: 6,
  },
  detailsIcon: {
    marginVertical: 0,
  },
  header: {
    aligndoctors: 'center',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  username: {
    alignSelf: 'flex-end',
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 6,
    textAlign: 'right',
  },
});

interface IProps {
  doctor: IDoctor;
  onDoctorSelect?: (doctor: IDoctor) => void;
}

const hebrewDays: { [key: number]: string } = {
  0: 'א׳',
  1: 'ב׳',
  2: 'ג׳',
  3: 'ד׳',
  4: 'ה׳',
  5: 'ו׳',
  6: 'ש׳',
};

export const DoctorCard: FC<IProps> = ({ doctor, onDoctorSelect }) => {
  const daysText = useMemo(
    () =>
      `ימי עבודה: ${doctor.workingDays.map((day) => hebrewDays[day]).join(',  ')}`,
    [doctor.workingDays],
  );

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          style={styles.header}
          title={doctor.name}
          titleStyle={styles.username}
          right={() => <GenderIcon isFemale={doctor.isFemale} />}
        />
        <Card.Content>
          <View style={styles.detailRow}>
            <IconButton
              icon="hospital-building"
              size={18}
              style={styles.detailsIcon}
            />
            <Text style={styles.detailText}>{doctor.clinicName}</Text>
          </View>
          <View style={styles.detailRow}>
            <IconButton icon="phone" size={18} style={styles.detailsIcon} />
            <Text style={styles.detailText}>{doctor.phone}</Text>
          </View>
          <View style={styles.detailRow}>
            <IconButton
              icon="clock-outline"
              size={18}
              style={styles.detailsIcon}
            />
            <Text style={styles.detailText}>
              משך פגישה: {doctor.appointmentDuration} דקות
            </Text>
          </View>
          <View style={styles.detailRow}>
            <IconButton
              icon="calendar-check"
              size={18}
              style={styles.detailsIcon}
            />
            <Text style={styles.detailText}>{daysText}</Text>
          </View>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button mode="contained" onPress={() => onDoctorSelect?.(doctor)}>
            בחר ברופא זה
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};
