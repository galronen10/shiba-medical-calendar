import { IAppointments } from '@/models/appointment.entity';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import AddToCalendarDialog from '../addToCalenderDialog';

interface IProps {
  appointment: IAppointments;
}

export const AppointmentCardAddReminder: React.FC<IProps> = ({
  appointment,
}) => {
  const [showDialog, setShowDialog] = useState(false);

  const closeDialog = (): void => {
    setShowDialog(false);
  };

  const openDialog = (): void => {
    setShowDialog(true);
  };

  return (
    <>
      <Button icon="calendar" onPress={openDialog}>
        הוספת תזכורת
      </Button>

      {showDialog && (
        <AddToCalendarDialog
          handleClose={closeDialog}
          appointment={appointment}
        />
      )}
    </>
  );
};
