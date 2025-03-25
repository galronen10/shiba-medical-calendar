import React, { FC, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { ConfirmationResult } from 'firebase/auth';
import PhoneInput from 'react-native-phone-number-input';
import { toast } from '@/utils';
import { VerifyPhoneLoginDialog } from '@/components/verifyPhoneLoginDialog';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export const LoginScreen: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmResult, setConfirmResult] = useState<ConfirmationResult | null>(
    null,
  );
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] =
    useState<boolean>(false);

  const phoneInputRef = useRef<PhoneInput>(null);

  const handleSendCode = async () => {
    const checkValid = phoneInputRef.current?.isValidNumber(phoneNumber);
    if (!checkValid) {
      toast.error('המספר שהוכנס אינו תקין');
    } else {
      setIsVerificationDialogOpen(true);
      // try {
      //   const confirmation = await signInWithPhoneNumber(auth, '+16505550101');
      //   setConfirmResult(confirmation);
      // } catch (error: any) {
      //   Alert.alert('Error', error.message);
      //   console.log(error);
      // }
    }
  };

  const closeDialog = () => {
    setIsVerificationDialogOpen(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>התחבר בעזרת מספר טלפון</Text>

      <PhoneInput
        ref={phoneInputRef}
        defaultCode="IL"
        layout="first"
        onChangeFormattedText={setPhoneNumber}
        withDarkTheme
        withShadow
        autoFocus
        containerStyle={styles.input}
      />

      <Button mode="contained" onPress={handleSendCode}>
        שלח קוד אישור
      </Button>

      <VerifyPhoneLoginDialog
        phone={phoneNumber}
        handleClose={closeDialog}
        isVisible={isVerificationDialogOpen}
      />
    </View>
  );
};
