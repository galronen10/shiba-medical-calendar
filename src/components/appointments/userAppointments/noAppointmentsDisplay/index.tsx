import { StyleSheet, View } from 'react-native';
import React, { FC, useCallback, useState } from 'react';
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
  errorContainer: {
    height: '100%',
    justifyContent: 'center',
  },
  headlineText: {
    fontWeight: 'bold',
    marginHorizontal: 20,
    textAlign: 'center',
  },
  newAppointmentButton: { margin: 10 },
});

export const NoAppointmentsDisplay: FC = () => {
  const [isLoadError, setIsLoadError] = useState<boolean>(false);
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

  const handleLoadError = () => {
    setIsLoadError(true);
  };

  const handleNewAppointment = () => {
    navigation.navigate(EAppRoutes.schedulerForm);
  };

  return isLoadError ? (
    <View style={styles.errorContainer}>
      <Text variant="headlineSmall" style={styles.headlineText}>
        מצטערים אבל התחרשה שגיאה בטעינת המידע ליצירת תור מהיר אנא נסה דרך הכפתור
      </Text>
      <Button
        mode="contained"
        onPress={handleNewAppointment}
        style={styles.newAppointmentButton}
      >
        זימון תור חדש
      </Button>
    </View>
  ) : (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.headlineText}>
        בחר תחום שירות על מנת לקבוע תור ראשון
      </Text>
      <SelectMedicalFieldList
        selectMedicalField={selectMedicalField}
        handleLoadError={handleLoadError}
      />
    </View>
  );
};
