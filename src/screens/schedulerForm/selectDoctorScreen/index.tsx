import { FC, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  selectDoctorForForm,
  selectSchedulerMedicalField,
} from '@/redux/schedulerForm';
import { IMedicalField } from '@/models/medicalField.model';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '@/hooks/store';
import { IDoctor } from '@/models/doctor.model';
import { EAppRoutes } from '@/models/routes.model';
import { api } from '@/api';
import { DoctorsList } from '@/components/doctors';
import { toast } from '@/utils';
import { FullSizeLoader } from '@/components/common';

export const SelectDoctorScreen: FC = () => {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const selectedMedicalField: IMedicalField | undefined = useAppSelector(
    selectSchedulerMedicalField,
  );

  useEffect(() => {
    const queryData = async () => {
      setIsLoading(true);
      try {
        const doctorsFromServer: IDoctor[] =
          await api.doctor.getByMedicalFieldId(selectedMedicalField!.id);

        setDoctors(doctorsFromServer);
        setIsLoading(false);
      } catch (error) {
        toast.error(' שגיאה בטעינת רשימת הרופאים אנא בחר תחום בשנית');
        navigation.goBack();
      }
    };

    if (selectedMedicalField) queryData();
    else setIsLoading(false);
  }, [selectedMedicalField]);

  const selectDoctor = useCallback(
    (doctor: IDoctor) => {
      dispatch(selectDoctorForForm(doctor));
      navigation.navigate(EAppRoutes.selectTime);
    },
    [dispatch],
  );

  return (
    <View style={styles.container}>
      <View style={styles.formBody}>
        {isLoading ? (
          <FullSizeLoader />
        ) : (
          <DoctorsList doctorsList={doctors} onDoctorSelect={selectDoctor} />
        )}
      </View>
    </View>
  );
};
