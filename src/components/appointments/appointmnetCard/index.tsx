import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Button, IconButton, Divider } from 'react-native-paper';

interface AppointmentCardProps {
  title: string;
  serviceType: string;
  location: string;
  date: string;
  time: string;
  onReschedule: () => void;
  onAddReminder: () => void;
  onCancel: () => void;
}

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
    margin: 10,
    overflow: 'hidden',
  },
  details: {
    fontSize: 16,
    marginVertical: 4,
  },
  serviceType: {
    color: '#666',
    fontSize: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  title,
  serviceType,
  location,
  date,
  time,
  onReschedule,
  onAddReminder,
  onCancel,
}) => {
  return (
    <Card style={styles.card}>
      <Card.Title
        title={<Text style={styles.title}>{title}</Text>}
        subtitle={
          <Text style={styles.serviceType}>{`תחום שירות: ${serviceType}`}</Text>
        }
        left={(props) => (
          <IconButton {...props} icon="hospital-building" color="#f57c00" />
        )}
      />
      <Divider />
      <Card.Content>
        <Text style={styles.details}>{location}</Text>
        <Text style={styles.details}>{`${date} | ${time}`}</Text>
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
