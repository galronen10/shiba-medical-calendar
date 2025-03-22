import { FlatList, View } from 'react-native';
import React, { FC } from 'react';
import { IDoctor } from '@/models/doctor.model';
import { Button, Card } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { GenderIcon } from '@/components/common';

export const styles = StyleSheet.create({
  card: {
    alignContent: 'center',
    paddingBottom: 20,
  },
  container: {
    margin: 10,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  username: {
    alignSelf: 'flex-end',
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 6,
    textAlign: 'right',
  },
});

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
        <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Title
              style={styles.header}
              title={item.name}
              titleStyle={styles.username}
              right={() => <GenderIcon isFemale={item.isFemale} />}
            />
            <Card.Actions>
              <Button onPress={() => onDoctorSelect && onDoctorSelect(item)}>
                בחר ברופא זה
              </Button>
            </Card.Actions>
          </Card>
        </View>
      )}
    />
  );
};
