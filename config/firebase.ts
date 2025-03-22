import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import asyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDERz21yetwU711-q3cbMjIbqqD56RA7E4',
  authDomain: 'shiba-medical-calender.firebaseapp.com',
  projectId: 'shiba-medical-calender',
  storageBucket: 'shiba-medical-calender.firebasestorage.app',
  messagingSenderId: '533227820991',
  appId: '1:533227820991:web:d8456874714be5b299b30a',
};

const app = initializeApp(firebaseConfig);

export default app;
export const database = getFirestore(app);
export const storage = getStorage(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(asyncStorage),
});
auth.settings.appVerificationDisabledForTesting = true;
