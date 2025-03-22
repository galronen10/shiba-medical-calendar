import { Main } from '@/components/main';
import { store } from '@/redux';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import './config/firebase';

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <Main />
      </PaperProvider>
    </StoreProvider>
  );
}
