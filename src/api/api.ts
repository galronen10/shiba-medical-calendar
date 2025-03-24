import { IDoctor } from '@/models/doctor.model';
import { IMedicalField } from '@/models/medicalField.model';
import { auth } from 'config/firebase';
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import axios from 'axios';
import { IAppointmentDTO, IAppointments } from '@/models/appointment.entity';

export const serverURL = process.env.SERVER_URL || 'http:/192.168.1.29:3000';

export const axiosInstance = axios.create({
  baseURL: serverURL,
  timeout: 15000,
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*',
  },
});

const APPOINTMENT_API = '/appointments';
const DOCTOR_API = '/doctors';
const MEDICAL_FIELD_API = '/medicalFields';

export const api = {
  auth: {
    register: async (data): Promise<void> => {
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
      const res = await axiosInstance.get(MEDICAL_FIELD_API);
      return res.data;
    },
  },
  doctor: {
    getByMedicalFieldId: async (fieldId: number): Promise<IDoctor[]> => {
      const res = await axiosInstance.get(`${DOCTOR_API}/byField/${fieldId}`);
      return res.data;
    },
  },
  appointments: {
    getExistingAppointmentsByDateAndDoctor: async (
      doctorId: number,
      date: string,
    ): Promise<Date[]> => {
      const res = await axiosInstance.get(
        `${APPOINTMENT_API}/byDateAndDoctor/${doctorId}/${date}`,
      );
      return res.data;
    },
    getByUser: async (userId: string): Promise<IAppointments[]> => {
      const res = await axiosInstance.get(`${APPOINTMENT_API}/user/${userId}`);
      return res.data;
    },
    setAppointment: async (newAppointment: IAppointmentDTO): Promise<void> => {
      await axiosInstance.post(APPOINTMENT_API, newAppointment);
    },
    deleteById: async (appointmentId: number): Promise<void> => {
      await axiosInstance.delete(`${APPOINTMENT_API}/${appointmentId}`);
    },
  },
};
