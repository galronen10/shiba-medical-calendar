import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import { Text } from 'react-native-paper';
import { IMedicalField } from '@/models/medicalFields';
import { MedicalFieldCard } from '../medicalFieldCard';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

interface IProps {
  medicalFieldList: IMedicalField[];
  noDataText?: string;
  onItemPress?: (medicalField: IMedicalField) => void;
}

export const MedicalFieldList: FC<IProps> = ({
  medicalFieldList,
  noDataText = 'אין מידע',
  onItemPress,
}) => {
  return medicalFieldList.length ? (
    <FlatList
      data={medicalFieldList}
      numColumns={2}
      renderItem={({ item }) => (
        <Pressable onPress={() => onItemPress && onItemPress(item)}>
          <MedicalFieldCard medicalField={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  ) : (
    <View style={styles.container}>
      <Text style={styles.text}>{noDataText}</Text>
    </View>
  );
};
