import React, { FC, useRef, useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { ConfirmationResult, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from 'config/firebase';
import PhoneInput from 'react-native-phone-number-input';
import { toast } from '@/utils';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 15,
    width: '100%',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export const LoginScreen: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmResult, setConfirmResult] = useState<ConfirmationResult | null>(
    null,
  );

  const phoneInputRef = useRef<PhoneInput>(null);

  const handleSendCode = async () => {
    const checkValid = phoneInputRef.current?.isValidNumber(phoneNumber);
    if (!checkValid) {
      toast.error('המספר שהוכנס אינו תקין');
    }

    try {
      const confirmation = await signInWithPhoneNumber(auth, '+16505550101');
      setConfirmResult(confirmation);
    } catch (error: any) {
      Alert.alert('Error', error.message);
      console.log(error.message);
    }
  };

  const handleVerifyCode = async () => {
    try {
      if (confirmResult) {
        await confirmResult.confirm(verificationCode);
        Alert.alert('Success', 'You are logged in!');
      }
    } catch (error: any) {
      Alert.alert('Error', 'Invalid verification code');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>התחבר בעזרת מספר טלפון</Text>

      {!confirmResult ? (
        <>
          <PhoneInput
            ref={phoneInputRef}
            defaultCode="IL"
            layout="first"
            onChangeFormattedText={setPhoneNumber}
            withDarkTheme
            withShadow
            autoFocus
          />

          <Button mode="contained" onPress={handleSendCode}>
            Send Verification Code
          </Button>
        </>
      ) : (
        <>
          <TextInput
            label="Verification Code"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="numeric"
            style={styles.input}
          />
          <Button mode="contained" onPress={handleVerifyCode}>
            Verify Code
          </Button>
        </>
      )}
    </View>
  );
};
