import { FlatList, View } from 'react-native';
import React, { FC } from 'react';
import { IDoctor } from '@/models/doctors';
import { Button, Card, Icon } from 'react-native-paper';
import { styles } from './styles';

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
              right={() => (
                <Icon
                  source={item.isFemale ? 'human-female' : 'human-male'}
                  size={20}
                />
              )}
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
