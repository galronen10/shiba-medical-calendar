import { FlatList } from 'react-native';
import React, { FC } from 'react';
import { IDoctor } from '@/models/doctor.model';
import { DoctorCard } from '../doctorCard';

interface IProps {
  doctorsList: IDoctor[];
  onDoctorSelect?: (doctor: IDoctor) => void;
}

export const DoctorsList: FC<IProps> = ({ doctorsList, onDoctorSelect }) => {
  return (
    <FlatList
      data={doctorsList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <DoctorCard onDoctorSelect={onDoctorSelect} doctor={item} />
      )}
    />
  );
};
