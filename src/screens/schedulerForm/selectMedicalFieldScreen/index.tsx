import { FC, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import React from 'react';
import { MedicalFieldList } from '@/components/medicalFields/medicalFieldsList';
import { useDispatch } from 'react-redux';
import { selectMedicalFieldForForm } from '@/redux/schedulerForm';
import { IMedicalField } from '@/models/medicalFields';
import { useNavigation } from '@react-navigation/native';
import { EAppRoutes } from '@/models/routes';
import { api } from '@/api';

export const SelectMedicalFieldScreen: FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [medicalFields, setMedicalFields] = useState<IMedicalField[]>([]);

  useEffect(() => {
    const queryData = async () => {
      const medicalFieldFromServer: IMedicalField[] =
        await api.medicalField.getAll();

      setMedicalFields(medicalFieldFromServer);
    };

    queryData();
  }, []);

  const selectMedicalField = useCallback(
    (medicalField: IMedicalField) => {
      dispatch(selectMedicalFieldForForm(medicalField));
      navigation.navigate(EAppRoutes.selectDoctor);
    },
    [dispatch],
  );

  return (
    <View style={styles.container}>
      <View style={styles.formBody}>
        <MedicalFieldList
          medicalFieldList={medicalFields}
          onItemPress={selectMedicalField}
        />
      </View>
    </View>
  );
};
