import React, { FC, useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { ConfirmationResult, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from 'config/firebase';

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

  const handleSendCode = async () => {
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
      <Text style={styles.title}>Login with Phone</Text>

      {!confirmResult ? (
        <>
          <TextInput
            label="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            style={styles.input}
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
