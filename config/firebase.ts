import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import asyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBuzORXsqJSJQ1ABnlRsySotRvJMmyPYTo',
  authDomain: 'mada-mal.firebaseapp.com',
  projectId: 'mada-mal',
  storageBucket: 'mada-mal.appspot.com',
  messagingSenderId: '479177647580',
  appId: '1:479177647580:web:33bf253fef5b74ffa95b19',
};

const app = initializeApp(firebaseConfig);

export default app;
export const database = getFirestore(app);
export const storage = getStorage(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(asyncStorage),
});
