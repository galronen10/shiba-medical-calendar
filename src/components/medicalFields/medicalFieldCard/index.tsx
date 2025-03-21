import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import React, { FC } from 'react';
import { IMedicalField } from '@/models/medicalField.model';

const styles = StyleSheet.create({
  card: {
    height: 150,
    margin: 10,
    width: 150,
  },
  textToCenter: {
    textAlign: 'center',
  },
});

interface IProps {
  medicalField: IMedicalField;
}

export const MedicalFieldCard: FC<IProps> = ({ medicalField }) => {
  return (
    <Card style={styles.card}>
      <Card.Title title={medicalField.name} titleStyle={styles.textToCenter} />
      <Card.Content>
        <Text style={styles.textToCenter}>{medicalField.description}</Text>
      </Card.Content>
    </Card>
  );
};
