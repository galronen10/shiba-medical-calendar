export interface IDoctor {
  id: number;
  name: string;
  appointmentDuration: number;
  workingDays: number[];
  phone: string;
  medicalFieldId: number;
  clinicName: string;
  isFemale: boolean;
}
