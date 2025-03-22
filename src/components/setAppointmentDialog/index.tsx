/* eslint-disable react-native/no-raw-text */
import React, { FC, useState } from 'react';
import {
  Portal,
  Dialog,
  Text,
  Button,
  Card,
  Divider,
} from 'react-native-paper';
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
import { GenderIcon } from '../common';

const styles = StyleSheet.create({
  bodyText: {
    textAlign: 'right',
  },
  button: {
    borderRadius: 10,
    elevation: 2,
    padding: 5,
  },
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
  textStyle: {
    color: Colors.background,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
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
  const userId: string = useAppSelector(selectUserId);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onConfirm = async () => {
    setIsButtonLoading(true);
    try {
      const newAppointment: IAppointmentDTO = {
        userId,
        doctorId: selectedFormData.selectedDoctor!.id,
        date: new Date(
          `${selectedFormData.selectedTime!.date}T${selectedFormData.selectedTime!.time}:00Z`,
        ),
      };

      await api.appointments.setAppointment(newAppointment);
      setIsButtonLoading(false);
      dispatch(resetForm());
      navigation.navigate(EAppRoutes.home);
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
          <Card style={styles.card}>
            <Card.Title
              title={selectedFormData.selectedDoctor?.name}
              titleStyle={styles.title}
              subtitleStyle={styles.subTitle}
              subtitle={`תחום שירות: ${selectedFormData.selectedField?.name}`}
              right={() => (
                <GenderIcon
                  isFemale={!!selectedFormData.selectedDoctor?.isFemale}
                />
              )}
            />
            <Divider />
            <Card.Content>
              <Text style={styles.details}>
                ביקור ב{selectedFormData.selectedDoctor?.clinicName}
              </Text>
              <Text
                style={styles.details}
              >{`בתאריך ${selectedFormData.selectedTime?.date} בשעה ${selectedFormData.selectedTime?.time}`}</Text>
            </Card.Content>
          </Card>
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
