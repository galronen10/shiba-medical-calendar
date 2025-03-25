import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '..';
import { api } from '@/api';
import { IAppointments } from '@/models/appointment.entity';
import { selectUserId } from '../user';
import { compareAsc } from 'date-fns';

// Define a type for the slice state
interface AppointmentsState {
  oldAppointments: IAppointments[];
  newAppointments: IAppointments[];
  isUserHasAppointments: boolean;
  loading: boolean;
}

// Define the initial state using that type
const initialState: AppointmentsState = {
  newAppointments: [],
  oldAppointments: [],
  isUserHasAppointments: false,
  loading: false,
};

export const loadAppointments = createAsyncThunk(
  'appointments/load',
  async (_, { getState }): Promise<Omit<AppointmentsState, 'loading'>> => {
    const state = getState() as RootState;
    const userId = selectUserId(state);

    if (!userId) return initialState;

    const appointmentsFromServer: IAppointments[] =
      await api.appointments.getByUser(userId);

    const currDate = new Date();

    const oldAppointments = appointmentsFromServer.filter(
      (appointment) => compareAsc(currDate, appointment.date) !== -1,
    );
    const newAppointments = appointmentsFromServer.filter(
      (appointment) => compareAsc(currDate, appointment.date) === -1,
    );

    return {
      newAppointments,
      oldAppointments,
      isUserHasAppointments:
        !!oldAppointments.length || !!newAppointments.length,
    };
  },
);

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    resetAppointment: () => ({ ...initialState }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadAppointments.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(loadAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.newAppointments = action.payload.newAppointments;
        state.oldAppointments = action.payload.oldAppointments;
        state.isUserHasAppointments = action.payload.isUserHasAppointments;
      });
  },
});

export const { resetAppointment } = appointmentSlice.actions;

export const selectAppointmentState = (state: RootState): AppointmentsState =>
  state.appointment;

export const selectOldAppointmentsList = createSelector(
  selectAppointmentState,
  (state: AppointmentsState): IAppointments[] => state.oldAppointments,
);

export const selectNewAppointmentsList = createSelector(
  selectAppointmentState,
  (state: AppointmentsState): IAppointments[] => state.newAppointments,
);

export const selectIsUserHasAppointments = createSelector(
  selectAppointmentState,
  (state: AppointmentsState): boolean => state.isUserHasAppointments,
);

export const selectIsAppointmentsLoading = createSelector(
  selectAppointmentState,
  (state: AppointmentsState): boolean => state.loading,
);

export default appointmentSlice.reducer;
