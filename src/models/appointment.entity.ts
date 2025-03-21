import { IDoctor } from './doctor.model';
import { IMedicalField } from './medicalField.model';

export interface IAppointments {
  id: number;
  date: Date;
  doctor: Pick<IDoctor, 'id' | 'name'>;
  medicalField: IMedicalField;
}

export interface IAppointmentDTO {
  date: Date;
  doctorId: number;
  userId: number;
}
