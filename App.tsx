import { Main } from '@/components/main';
import { store } from '@/redux';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import './config/firebase';
import { PaperProvider, DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  fonts: {
    ...DefaultTheme.fonts,
    default: {
      ...DefaultTheme.fonts.default,
      textAlign: 'right',
    },
  },
};

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <Main />
      </PaperProvider>
    </StoreProvider>
  );
}
