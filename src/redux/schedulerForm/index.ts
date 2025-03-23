import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { IMedicalField } from '@/models/medicalField.model';
import { IDoctor } from '@/models/doctor.model';
import { ISchedulerSelectedTime } from '@/models/schedulerForm.model';
import { IAppointments } from '@/models/appointment.entity';

// Define a type for the slice state
export interface ISchedulerFormState {
  selectedField?: IMedicalField;
  selectedDoctor?: IDoctor;
  selectedTime?: ISchedulerSelectedTime;
  appointmentId?: number;
}

// Define the initial state using that type
const initialState: ISchedulerFormState = {};

export const schedulerFormSlice = createSlice({
  name: 'schedulerForm',
  initialState,
  reducers: {
    selectMedicalFieldForForm: (
      _state,
      action: PayloadAction<IMedicalField>,
    ) => ({
      selectedField: action.payload,
    }),
    selectDoctorForForm: (state, action: PayloadAction<IDoctor>) => ({
      selectedField: state.selectedField,
      selectedDoctor: action.payload,
    }),
    selectTimeForForm: (
      state,
      action: PayloadAction<ISchedulerSelectedTime>,
    ) => ({
      ...state,
      selectedTime: action.payload,
    }),
    setFormByAppointment: (
      _state,
      action: PayloadAction<{ appointment: IAppointments; isWithId?: boolean }>,
    ) => {
      const { appointment, isWithId } = action.payload;
      const newState: ISchedulerFormState = {
        selectedField: appointment.medicalField,
        selectedDoctor: appointment.doctor,
      };
      if (isWithId) {
        newState.appointmentId = appointment.id;
      }

      return newState;
    },
    resetForm: () => ({ ...initialState }),
  },
});

export const {
  resetForm,
  selectMedicalFieldForForm,
  selectDoctorForForm,
  selectTimeForForm,
  setFormByAppointment,
} = schedulerFormSlice.actions;

export const selectSchedulerFromState = (
  state: RootState,
): ISchedulerFormState => state.schedulerForm;

export const selectSchedulerMedicalField = createSelector(
  selectSchedulerFromState,
  (schedulerForm: ISchedulerFormState): IMedicalField | undefined =>
    schedulerForm.selectedField,
);

export const selectSchedulerDoctor = createSelector(
  selectSchedulerFromState,
  (schedulerForm: ISchedulerFormState): IDoctor | undefined =>
    schedulerForm.selectedDoctor,
);

export default schedulerFormSlice.reducer;
