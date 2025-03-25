import React, { FC } from 'react';
import { useAppSelector } from '@/hooks/store';
import {
  selectIsAppointmentsLoading,
  selectIsUserHasAppointments,
} from '@/redux/appointments';
import {
  NoAppointmentsDisplay,
  UserAppointments,
} from '@/components/appointments/userAppointments';
import { FullSizeLoader } from '@/components/common';

export const HomeScreen: FC = () => {
  const isUserHasAppointments: boolean = useAppSelector(
    selectIsUserHasAppointments,
  );

  const isAppointmentsLoading: boolean = useAppSelector(
    selectIsAppointmentsLoading,
  );

  if (isAppointmentsLoading) return <FullSizeLoader />;

  return isUserHasAppointments ? (
    <UserAppointments />
  ) : (
    <NoAppointmentsDisplay />
  );
};
