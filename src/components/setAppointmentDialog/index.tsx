/* eslint-disable react-native/no-raw-text */
import React, { FC, useState } from 'react';
import { Portal, Dialog, Text, Button } from 'react-native-paper';
import { toast } from '@/utils';
import { useAppSelector } from '@/hooks/store';
import {
  ISchedulerFormState,
  resetForm,
  selectSchedulerFromState,
} from '@/redux/schedulerForm';
import { EAppRoutes } from '@/models/routes.model';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { api } from '@/api';
import { IAppointmentDTO } from '@/models/appointment.entity';
import { selectUserId } from '@/redux/user';
import { StyleSheet } from 'react-native';
import Colors from '@/constants/colors';
import { loadAppointments } from '@/redux/appointments';
import { AppDispatch } from '@/redux';
import { BasicAppointmentDisplay } from '../appointments/basicAppointmentDisplay';
import { parseDateFromTimeAndDateString } from '@/utils/date';

const styles = StyleSheet.create({
  bodyText: {
    textAlign: 'right',
  },
  button: {
    borderRadius: 10,
    elevation: 2,
    padding: 5,
  },
  textStyle: {
    color: Colors.background,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

interface IProps {
  isVisible: boolean;
  handleClose: () => void;
}

export const SetAppointmentDialog: FC<IProps> = ({
  handleClose,
  isVisible,
}) => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const selectedFormData: ISchedulerFormState = useAppSelector(
    selectSchedulerFromState,
  );
  const userId: number = useAppSelector(selectUserId)!;

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  const onConfirm = async () => {
    setIsButtonLoading(true);
    const appointmentDate = parseDateFromTimeAndDateString(
      selectedFormData.selectedTime!.date,
      selectedFormData.selectedTime!.time,
    );

    const newAppointment: IAppointmentDTO = {
      userId,
      doctorId: selectedFormData.selectedDoctor!.id,
      date: appointmentDate,
    };

    if (selectedFormData.appointmentId)
      newAppointment.id = selectedFormData.appointmentId;

    try {
      await api.appointments.setAppointment(newAppointment);
      setIsButtonLoading(false);
      toast.success('התור נקבע בהצלחה');
      navigation.navigate(EAppRoutes.home);
      dispatch(resetForm());
      dispatch(loadAppointments());
    } catch (error: any) {
      toast.error('אירעה שגיאה בתהליך קביעת הפגישה');
      setIsButtonLoading(false);
    }
  };

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={handleClose}>
        <Dialog.Title style={styles.bodyText}>קביעת תור</Dialog.Title>
        <Dialog.Content>
          {selectedFormData && (
            <BasicAppointmentDisplay
              doctor={selectedFormData.selectedDoctor!}
              medicalField={selectedFormData.selectedField!}
              time={selectedFormData.selectedTime!}
            />
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={handleClose}
            style={styles.button}
            mode="contained"
            buttonColor="red"
          >
            <Text style={styles.textStyle}> חזור</Text>
          </Button>
          <Button
            mode="contained"
            loading={isButtonLoading}
            onPress={onConfirm}
            style={styles.button}
          >
            <Text style={styles.textStyle}>אשר תור</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
