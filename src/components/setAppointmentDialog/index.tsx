/* eslint-disable react-native/no-raw-text */
import React, { FC, useState } from 'react';
import { styles } from './styles';
import { Portal, Dialog, Text, Button } from 'react-native-paper';
import { toast } from '@/utils';
import { useAppSelector } from '@/hooks/store';
import {
  ISchedulerFormState,
  resetForm,
  selectSchedulerFromState,
} from '@/redux/schedulerForm';
import { dateFormatterWithTime } from '@/utils/date';
import { EAppRoutes } from '@/models/routes';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onConfirm = async () => {
    setIsButtonLoading(true);
    try {
      // await api.report.deleteReport(reportId);
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
          <Text>{selectedFormData.selectedDoctor!.name}</Text>
          <Text>{selectedFormData.selectedField!.name}</Text>
          <Text>{dateFormatterWithTime(selectedFormData.selectedTime!)}</Text>
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
