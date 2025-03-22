import { StyleSheet, View } from 'react-native';
import React, { FC, useCallback } from 'react';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { EAppRoutes } from '@/models/routes.model';
import { useDispatch } from 'react-redux';
import { SelectMedicalFieldList } from '@/components/medicalFields';
import { IMedicalField } from '@/models/medicalField.model';
import { selectMedicalFieldForForm } from '@/redux/schedulerForm';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    marginTop: 20,
  },
  headlineText: {
    fontWeight: 'bold',
    marginHorizontal: 20,
    textAlign: 'center',
  },
});

export const HomeScreen: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectMedicalField = useCallback(
    (medicalField: IMedicalField) => {
      dispatch(selectMedicalFieldForForm(medicalField));
      navigation.navigate(EAppRoutes.schedulerForm, {
        screen: EAppRoutes.selectDoctor,
      });
    },
    [dispatch],
  );

  const openUserAppointment = (): void => {
    navigation.navigate(EAppRoutes.userAppointments);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.headlineText}>
        בחר תחום שירות על מנת לקבוע תור ראשון
      </Text>

      <Button mode="contained" onPress={openUserAppointment}>
        פגישות של המשתמש
      </Button>
      <SelectMedicalFieldList selectMedicalField={selectMedicalField} />
    </View>
  );
};
