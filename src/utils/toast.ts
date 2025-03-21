import Toast from 'react-native-toast-message';

export const success = (text: string) =>
  Toast.show({
    type: 'success',
    visibilityTime: 1500,
    text1: text,
  });

export const error = (text: string) =>
  Toast.show({
    type: 'error',
    visibilityTime: 1500,
    text1: text,
  });
