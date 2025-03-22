import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  ELoginFields,
  LoginFormData,
  defaultFormValues,
  loginFormDataObject,
  schema,
} from './formUtils';
import { useHandleLogin } from './useHandleLogin';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { styles } from './styles';
import { Button } from 'react-native-paper';
import { TextFieldFormInput } from '@/components/form';

export const LoginScreen: React.FC = () => {
  const { handleWrongFormData, handleValidFormData, isButtonLoading } =
    useHandleLogin();

  const { handleSubmit, control } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormValues,
    resetOptions: {
      keepDirtyValues: false,
    },
  });

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="height">
        <ScrollView>
          <View style={styles.formBody}>
            <TextFieldFormInput
              control={control}
              formData={loginFormDataObject[ELoginFields.EMAIL]}
              inputMode="email"
            />
            <TextFieldFormInput
              control={control}
              formData={loginFormDataObject[ELoginFields.PASSWORD]}
              isPassword
            />{' '}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              loading={isButtonLoading}
              mode="contained"
              onPress={handleSubmit(handleValidFormData, handleWrongFormData)}
              style={styles.loginButton}
            >
              התחבר
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
