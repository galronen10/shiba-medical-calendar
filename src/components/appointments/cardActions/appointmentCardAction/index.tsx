import { IAppointments } from '@/models/appointment.entity';
import { EAppRoutes } from '@/models/routes.model';
import { setFormByAppointment } from '@/redux/schedulerForm';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Button, Divider } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { AppointmentCardAddReminder } from '../appointmentCardAddReminder';
import { AppointmentCardDeleteButton } from '../appointmentCardDeleteButton';

const styles = StyleSheet.create({
  actions: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  card: {
    borderRadius: 10,
    height: 'auto',
    margin: 10,
    overflow: 'hidden',
    width: 300,
  },
  createButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    marginVertical: 5,
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

export const AppointmentCardActions: React.FC<IProps> = ({
  appointment,
  isPast,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onReschedule = () => {
    dispatch(setFormByAppointment({ appointment, isWithId: true }));
    navigation.navigate(EAppRoutes.schedulerForm, {
      screen: EAppRoutes.selectTime,
    });
  };

  const onNewSimilarAppointment = () => {
    dispatch(setFormByAppointment({ appointment, isWithId: false }));
    navigation.navigate(EAppRoutes.schedulerForm, {
      screen: EAppRoutes.selectTime,
    });
  };

  return isPast ? (
    <Button
      mode="contained"
      onPress={onNewSimilarAppointment}
      style={styles.createButton}
    >
      זימון תור חדש
    </Button>
  ) : (
    <>
      <Card.Actions style={styles.actions}>
        <AppointmentCardAddReminder appointment={appointment} />
        <Button icon="sync" onPress={onReschedule}>
          שינוי תור
        </Button>
      </Card.Actions>
      <Divider />
      <AppointmentCardDeleteButton appointmentId={appointment.id} />
    </>
  );
};
