import { StyleSheet, View } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import React, { FC } from 'react';
import { IMedicalField } from '@/models/medicalFields';

const styles = StyleSheet.create({
  card: {
    alignContent: 'center',
    width: 150,
  },
  container: {
    margin: 10,
  },
  reportData: {
    textAlign: 'right',
  },
});

interface IProps {
  medicalField: IMedicalField;
}

export const MedicalFieldCard: FC<IProps> = ({ medicalField }) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={medicalField.name} />
        <Card.Content>
          <Paragraph style={styles.reportData}>
            {medicalField.description}
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};
