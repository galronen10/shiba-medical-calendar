import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { DeleteAppointmentDialog } from '../deleteAppointmnetDialog';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cancelButton: {
    alignSelf: 'center',
    marginVertical: 5,
  },
});

interface IProps {
  appointmentId: number;
}

export const AppointmentCardDeleteButton: React.FC<IProps> = ({
  appointmentId,
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
      <Button
        mode="text"
        onPress={openDialog}
        textColor="red"
        icon="close-circle-outline"
        style={styles.cancelButton}
      >
        ביטול תור
      </Button>

      {showDialog && (
        <DeleteAppointmentDialog
          handleClose={closeDialog}
          appointmentId={appointmentId}
        />
      )}
    </>
  );
};
