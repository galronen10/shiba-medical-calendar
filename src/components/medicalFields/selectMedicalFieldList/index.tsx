import { FC, useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { styles } from './styles';
import React from 'react';
import { IMedicalField } from '@/models/medicalField.model';
import { api } from '@/api';
import { MedicalFieldCard } from '../medicalFieldCard';
import { FullSizeLoader } from '@/components/common';

interface IProps {
  selectMedicalField: (medicalField: IMedicalField) => void;
  handleLoadError: () => void;
}

export const SelectMedicalFieldList: FC<IProps> = ({
  selectMedicalField,
  handleLoadError,
}) => {
  const [medicalFields, setMedicalFields] = useState<IMedicalField[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const queryData = async () => {
      setIsLoading(true);

      try {
        const medicalFieldFromServer: IMedicalField[] =
          await api.medicalField.getAll();

        setMedicalFields(medicalFieldFromServer);
      } catch {
        handleLoadError();
      }
      setIsLoading(false);
    };

    queryData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.formBody}>
        {isLoading ? (
          <FullSizeLoader />
        ) : (
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
        )}
      </View>
    </View>
  );
};
