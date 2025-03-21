import { Control } from 'react-hook-form';
import { StyleProp } from 'react-native';

export interface IFormFieldInputData {
  label?: string;
  style?: StyleProp<any>;
  fieldName: string;
  placeholder?: string;
}

export interface IFormFieldInput {
  control: Control<any>;
  formData: IFormFieldInputData;
}
