import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { IFormFieldInput } from '@/models/form';
import { HelperText, TextInput } from 'react-native-paper';
import { InputModeOptions, View } from 'react-native';
import React from 'react';

interface ITextFieldFormInputProps extends IFormFieldInput {
  isMultiline?: boolean;
  inputMode?: InputModeOptions;
  isPassword?: boolean;
}

export const TextFieldFormInput: FC<ITextFieldFormInputProps> = ({
  control,
  formData,
  isMultiline = false,
  inputMode = 'text',
  isPassword = false,
}) => {
  return (
    <Controller
      name={formData.fieldName}
      control={control}
      render={({
        field: { onChange, value, disabled },
        fieldState: { error },
      }) => (
        <View>
          <TextInput
            inputMode={inputMode}
            numberOfLines={4}
            multiline={isMultiline}
            style={formData.style}
            placeholder={formData.placeholder ?? ''}
            label={formData.label}
            disabled={disabled}
            secureTextEntry={isPassword}
            value={value ?? ''}
            textAlign="right"
            onChangeText={onChange}
            error={!!error}
          />
          <HelperText type="error" visible={!!error}>
            {error?.message}
          </HelperText>
        </View>
      )}
    />
  );
};
