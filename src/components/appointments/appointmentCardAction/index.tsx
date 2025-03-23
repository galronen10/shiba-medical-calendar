import { IAppointments } from '@/models/appointment.entity';
import { EAppRoutes } from '@/models/routes.model';
import { setFormByAppointment } from '@/redux/schedulerForm';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Button, Divider } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { DeleteAppointmentDialog } from '../deleteAppointmnetDialog';

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

export const AppointmentCardActions: React.FC<IProps> = ({
  appointment,
  isPast,
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onAddReminder = () => {};

  const onReschedule = () => {
    dispatch(setFormByAppointment({ appointment, isWithId: true }));
    navigation.navigate(EAppRoutes.schedulerForm, {
      screen: EAppRoutes.selectTime,
    });
  };

  const closeDeleteDialog = (): void => {
    setShowDeleteDialog(false);
  };

  const openDeleteDialog = (): void => {
    setShowDeleteDialog(true);
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
      style={styles.cancelButton}
    >
      זימון חדש תור נוסף
    </Button>
  ) : (
    <>
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
        onPress={openDeleteDialog}
        textColor="red"
        icon="close-circle-outline"
        style={styles.cancelButton}
      >
        ביטול תור
      </Button>
      <DeleteAppointmentDialog
        handleClose={closeDeleteDialog}
        isVisible={showDeleteDialog}
        appointmentId={appointment.id}
      />
    </>
  );
};
