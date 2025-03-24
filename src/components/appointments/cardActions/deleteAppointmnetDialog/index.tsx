/* eslint-disable react-native/no-raw-text */
import React, { FC, useState } from 'react';
import { styles } from './styles';
import { Portal, Dialog, Text, Button } from 'react-native-paper';
import { toast } from '@/utils';
import { api } from '@/api';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux';
import { loadAppointments } from '@/redux/appointments';

interface IProps {
  handleClose: () => void;
  appointmentId: number;
}

export const DeleteAppointmentDialog: FC<IProps> = ({
  handleClose,
  appointmentId,
}) => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const onDelete = async () => {
    setIsButtonLoading(true);
    try {
      await api.appointments.deleteById(appointmentId);
      setIsButtonLoading(false);
      dispatch(loadAppointments());

      handleClose();
      toast.success('התור בוטל בהצלחה');
    } catch (error: any) {
      toast.error('אירעה שגיאה בביטול התור');
      setIsButtonLoading(false);
    }
  };

  return (
    <Portal>
      <Dialog visible={true} onDismiss={handleClose}>
        <Dialog.Title style={styles.bodyText}>בטל תור</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.bodyText}>האם אתה בטוח שברצונך לבטל תור זה</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="contained"
            loading={isButtonLoading}
            onPress={onDelete}
            style={[styles.button, styles.deleteButton]}
          >
            <Text style={styles.textStyle}>בטל תור</Text>
          </Button>
          <Button
            onPress={handleClose}
            style={[styles.button, styles.cancelButton]}
          >
            <Text style={styles.textStyle}>חזור</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
