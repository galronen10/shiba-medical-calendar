import { IDoctor } from '@/models/doctor.model';
import { IMedicalField } from '@/models/medicalField.model';
import axios from 'axios';
import { IAppointmentDTO, IAppointments } from '@/models/appointment.entity';
import { IUser } from '@/models/user.model';

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
const USER_API = '/user';

export const api = {
  auth: {
    login: async (phone: string): Promise<IUser> =>
      (await axiosInstance.get(`${USER_API}/login/${phone}`)).data,
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
    getByUser: async (userId: number): Promise<IAppointments[]> => {
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
