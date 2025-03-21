import { IDoctor } from '@/models/doctors';
import { IMedicalField } from '@/models/medicalFields';
import { IUserRegister } from '@/models/user';
import { auth } from 'config/firebase';
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { medicalFieldsStub } from './medicalFIeldsStub';
import { doctorsStub } from './doctorsStub';

export const api = {
  auth: {
    register: async (data: IUserRegister): Promise<void> => {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, data.email, data.password);

      const { uid } = userCredential.user;
    },
    login: async (email: string, password: string): Promise<UserCredential> =>
      signInWithEmailAndPassword(auth, email, password),
    logout: async (): Promise<void> => signOut(auth),
  },
  medicalField: {
    getAll: async (): Promise<IMedicalField[]> => medicalFieldsStub,
  },
  doctor: {
    getByMedicalFieldId: async (fieldId: number): Promise<IDoctor[]> =>
      doctorsStub,
  },
  appointments: {
    getAppointmentsByDateAndDoctor: async (
      doctorId: number,
      date: string,
    ): Promise<Date[]> => {
      return [];
    },
  },
};
