import { Main } from '@/components/main';
import { store } from '@/redux';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import './config/firebase';
import { PaperProvider, DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#008fd6',
  },
  fonts: {
    ...DefaultTheme.fonts,
    default: {
      textAlign: 'right',
      ...DefaultTheme.fonts.default,
    },
    headlineSmall: { ...DefaultTheme.fonts.headlineSmall, textAlign: 'right' },
    headlineMedium: {
      ...DefaultTheme.fonts.headlineMedium,
      textAlign: 'right',
    },
    headlineLarge: { ...DefaultTheme.fonts.headlineLarge, textAlign: 'right' },
    titleSmall: { ...DefaultTheme.fonts.titleSmall, textAlign: 'right' },
    titleMedium: { ...DefaultTheme.fonts.titleMedium, textAlign: 'right' },
    titleLarge: { ...DefaultTheme.fonts.titleLarge, textAlign: 'right' },
    bodySmall: { ...DefaultTheme.fonts.bodySmall, textAlign: 'right' },
    bodyMedium: { ...DefaultTheme.fonts.bodyMedium, textAlign: 'right' },
    bodyLarge: { ...DefaultTheme.fonts.bodyLarge, textAlign: 'right' },
    labelSmall: { ...DefaultTheme.fonts.labelSmall, textAlign: 'right' },
    labelMedium: { ...DefaultTheme.fonts.labelMedium, textAlign: 'right' },
    labelLarge: { ...DefaultTheme.fonts.labelLarge, textAlign: 'right' },
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
