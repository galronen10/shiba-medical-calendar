import { IDoctor } from '@/models/doctor.model';
import { IMedicalField } from '@/models/medicalField.model';
import { IUserRegister } from '@/models/user.model';
import { auth } from 'config/firebase';
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doctorsStub } from './doctorsStub';
import axios from 'axios';
import { IAppointmentDTO } from '@/models/appointment.entity';

export const serverURL = process.env.SERVER_URL || 'http://192.168.1.29:3000';

export const axiosInstance = axios.create({
  baseURL: serverURL,
  timeout: 15000,
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*',
  },
});

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
    getAll: async (): Promise<IMedicalField[]> => {
      const res = await axiosInstance.get(`/medicalFields`);
      return res.data;
    },
  },
  doctor: {
    getByMedicalFieldId: async (fieldId: number): Promise<IDoctor[]> =>
      doctorsStub,
  },
  appointments: {
    getAppointmentsExistingDates: async (
      doctorId: number,
      date: string,
    ): Promise<Date[]> => {
      return [];
    },
    setAppointment: async (newAppointment: IAppointmentDTO): Promise<void> => {
      await axiosInstance.post(`/appointments`, newAppointment);
    },
  },
};
