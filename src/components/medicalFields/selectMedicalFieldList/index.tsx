import { FC, useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { styles } from './styles';
import React from 'react';
import { IMedicalField } from '@/models/medicalField.model';
import { api } from '@/api';
import { MedicalFieldCard } from '../medicalFieldCard';

interface IProps {
  selectMedicalField: (medicalField: IMedicalField) => void;
}

export const SelectMedicalFieldList: FC<IProps> = ({ selectMedicalField }) => {
  const [medicalFields, setMedicalFields] = useState<IMedicalField[]>([]);

  useEffect(() => {
    const queryData = async () => {
      const medicalFieldFromServer: IMedicalField[] =
        await api.medicalField.getAll();

      setMedicalFields(medicalFieldFromServer);
    };

    queryData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.formBody}>
        <FlatList
          data={medicalFields}
          numColumns={2}
          renderItem={({ item }) => (
            <Pressable onPress={() => selectMedicalField(item)}>
              <MedicalFieldCard medicalField={item} />
            </Pressable>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};
