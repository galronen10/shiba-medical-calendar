/* eslint-disable react-native/no-raw-text */
import React, { FC, useState } from 'react';
import {
  Portal,
  Dialog,
  Text,
  Button,
  TextInput,
  HelperText,
} from 'react-native-paper';

import { StyleSheet } from 'react-native';
import Colors from '@/constants/colors';
import { toast } from '@/utils';
import { api } from '@/api';
import { IUser } from '@/models/user.model';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux';
import { useNavigation } from '@react-navigation/native';
import { login } from '@/redux/user';
import { EAppRoutes } from '@/models/routes.model';

const styles = StyleSheet.create({
  bodyText: {
    textAlign: 'right',
  },
  button: {
    borderRadius: 10,
    elevation: 2,
    padding: 5,
  },
  dialogActions: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 15,
    width: '100%',
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
  phone: string;
}

const VERIFICATION_CODE = '111111';

export const VerifyPhoneLoginDialog: FC<IProps> = ({
  handleClose,
  phone,
  isVisible,
}) => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationError, setIsVerificationError] =
    useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  const handleVerifyCode = async () => {
    setIsButtonLoading(true);
    if (verificationCode === VERIFICATION_CODE) {
      try {
        const user: IUser = await api.auth.login(phone);
        dispatch(login(user));
        navigation.reset({
          index: 0,
          routes: [{ name: EAppRoutes.main }],
        });
      } catch (error) {
        toast.error('התרחשה שגיאה בתהליך ההתחברות אנא נסה שנית');
      }
    } else {
      toast.error('הקוד שהוכנס אינו תואם לקוד אשר נשלח בהודעה');
      setIsVerificationError(true);
    }

    setIsButtonLoading(false);
  };

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={handleClose}>
        <Dialog.Title
          style={styles.bodyText}
        >{`הכנס את קוד האישור שקיבלת בהודעה (${VERIFICATION_CODE})`}</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="הכנס קוד אישור"
            placeholder="קוד בן 6 ספרות"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="numeric"
            style={styles.input}
            error={isVerificationError}
            textAlign="right"
          />
          <HelperText type="error" visible={isVerificationError}>
            הוכנס קוד שגוי
          </HelperText>
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogActions}>
          <Button
            mode="contained"
            loading={isButtonLoading}
            onPress={handleVerifyCode}
            style={styles.button}
          >
            <Text style={styles.textStyle}>אשר קוד והתחבר</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
