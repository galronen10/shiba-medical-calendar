import { IDoctor } from './doctor.model';
import { IUser } from './user.model';

export interface IAppointments {
  id: number;
  date: Date;
  doctor: IDoctor;
  user: IUser;
}

export interface IAppointmentDTO {
  date: Date;
  doctorId: number;
  userId: number;
}
