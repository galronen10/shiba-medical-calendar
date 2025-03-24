import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import { UserAppointmentsSection } from '../userAppointmentsSection';
import { useNavigation } from '@react-navigation/native';
import { EAppRoutes } from '@/models/routes.model';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#008fd6',
    borderRadius: 50,
    marginTop: 12,
    width: '80%',
  },
  buttonContainer: {
    alignItems: 'center',
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
    bottom: 16,
    position: 'absolute',
    width: '100%',
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  listsContainer: {
    flex: 1,
    marginBottom: 24,
    padding: 16,
  },
});

export const UserAppointments: FC = () => {
  const navigation = useNavigation();

  const handleNewAppointment = () => {
    navigation.navigate(EAppRoutes.schedulerForm);
  };

  return (
    <View style={styles.container}>
      <View style={styles.listsContainer}>
        <UserAppointmentsSection />

        <UserAppointmentsSection isPast />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={handleNewAppointment}
        >
          זימון תור חדש
        </Button>
      </View>
    </View>
  );
};
