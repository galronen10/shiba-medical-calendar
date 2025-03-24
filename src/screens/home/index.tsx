import React, { FC } from 'react';
import { useAppSelector } from '@/hooks/store';
import { selectIsUserHasAppointments } from '@/redux/appointments';
import {
  NoAppointmentsDisplay,
  UserAppointments,
} from '@/components/appointments/userAppointments';

export const HomeScreen: FC = () => {
  const isUserHasAppointments: boolean = useAppSelector(
    selectIsUserHasAppointments,
  );

  return isUserHasAppointments ? (
    <UserAppointments />
  ) : (
    <NoAppointmentsDisplay />
  );
};
