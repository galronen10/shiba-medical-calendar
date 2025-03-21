import { FC, useCallback } from 'react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { selectMedicalFieldForForm } from '@/redux/schedulerForm';
import { IMedicalField } from '@/models/medicalFields';
import { useNavigation } from '@react-navigation/native';
import { EAppRoutes } from '@/models/routes';
import { SelectMedicalFieldList } from '@/components/medicalFields';

export const SelectMedicalFieldFormScreen: FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const selectMedicalField = useCallback(
    (medicalField: IMedicalField) => {
      dispatch(selectMedicalFieldForForm(medicalField));
      navigation.navigate(EAppRoutes.selectDoctor);
    },
    [dispatch],
  );

  return <SelectMedicalFieldList selectMedicalField={selectMedicalField} />;
};
