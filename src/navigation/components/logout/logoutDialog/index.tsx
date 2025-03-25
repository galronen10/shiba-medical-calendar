/* eslint-disable react-native/no-raw-text */
import React, { FC, useState } from 'react';
import { styles } from './styles';
import { Portal, Dialog, Text, Button } from 'react-native-paper';
import { toast } from '@/utils';
import { EAppRoutes } from '@/models/routes.model';
import { logout } from '@/redux/user';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { resetAppointment } from '@/redux/appointments';

interface ILogoutDialogProps {
  isVisible: boolean;
  handleClose: () => void;
}

export const LogoutDialog: FC<ILogoutDialogProps> = ({
  handleClose,
  isVisible,
}) => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onLogout = async () => {
    setIsButtonLoading(true);
    try {
      dispatch(logout());
      dispatch(resetAppointment());
      setIsButtonLoading(false);
      handleClose();
      navigation.reset({
        index: 0,
        routes: [{ name: EAppRoutes.auth }],
      });
    } catch (error: any) {
      toast.error('אירעה שגיאה בהתנתקות');
      setIsButtonLoading(false);
    }
  };

  return (
    <Portal>
      <Dialog
        visible={isVisible}
        onDismiss={handleClose}
        style={styles.container}
      >
        <Dialog.Title style={styles.title}>התנתקות</Dialog.Title>
        <Dialog.Actions>
          <Button
            loading={isButtonLoading}
            mode="contained"
            onPress={onLogout}
            style={[styles.button, styles.deleteButton]}
          >
            <Text style={styles.textStyle}>התנתק</Text>
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
