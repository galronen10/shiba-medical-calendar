import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { IMedicalField } from '@/models/medicalField.model';
import { IDoctor } from '@/models/doctor.model';

// Define a type for the slice state
export interface ISchedulerFormState {
  selectedField?: IMedicalField;
  selectedDoctor?: IDoctor;
  selectedTime?: Date;
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
    selectTimeForForm: (state, action: PayloadAction<Date>) => ({
      ...state,
      selectedTime: action.payload,
    }),
    resetForm: () => ({ ...initialState }),
  },
});

export const {
  resetForm,
  selectMedicalFieldForForm,
  selectDoctorForForm,
  selectTimeForForm,
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
