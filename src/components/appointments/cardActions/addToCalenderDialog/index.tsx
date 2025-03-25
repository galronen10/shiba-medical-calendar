import React, { useState, useEffect, FC, useMemo } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import * as Calendar from 'expo-calendar';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { IAppointments } from '@/models/appointment.entity';
import { toast } from '@/utils';
import { addMinutes } from 'date-fns';
import Colors from '@/constants/colors';
import { BasicAppointmentDisplay } from '../../basicAppointmentDisplay';
import { ISchedulerSelectedTime } from '@/models/schedulerForm.model';
import { dateToStringFormatter, dateToTimeStringFormatter } from '@/utils/date';

const styles = StyleSheet.create({
  appointmentContainer: {
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    elevation: 2,
    padding: 5,
  },
  textStyle: {
    color: Colors.background,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

interface IProps {
  handleClose: () => void;
  appointment: IAppointments;
}

export const AddToCalendarDialog: FC<IProps> = ({
  appointment,
  handleClose,
}) => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        setHasPermission(true);
      }
    })();
  }, []);

  const addEventToCalendar = async () => {
    try {
      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT,
      );
      const defaultCalendar = calendars.find((cal) => cal.allowsModifications);

      if (!defaultCalendar) {
        toast.error('אנא וודא שקיים לוח שנה במכשיר אליו ניתן להוסיף אירוע');
        return;
      }

      const { date: startDate, doctor } = appointment;

      const eventDetails = {
        title: `תור ל${doctor.name}`,
        startDate,
        endDate: addMinutes(startDate, doctor.appointmentDuration),
        timeZone: 'GMT',
        location: doctor.clinicName,
      };

      await Calendar.createEventAsync(defaultCalendar.id, eventDetails);
      toast.success('האירוע התווסף ליומן בהצלחה');
      handleClose();
    } catch (error) {
      toast.error('התרחשה שגיאה בהוספת האירוע לוח השנה במכשיר');
    }
  };

  const openSettings = () => {
    Linking.openSettings();
  };

  const dateForDisplay: ISchedulerSelectedTime = useMemo(
    () => ({
      date: dateToStringFormatter(appointment.date),
      time: dateToTimeStringFormatter(appointment.date),
    }),
    [appointment.date],
  );

  return (
    <Portal>
      <Dialog visible={true} onDismiss={handleClose}>
        <Dialog.Title>הוספת תזכורת</Dialog.Title>
        <Dialog.Content>
          {hasPermission ? (
            <>
              <Text>האם אתה רוצה להוסיף תזכורת לתור</Text>
              <View style={styles.appointmentContainer}>
                <BasicAppointmentDisplay
                  doctor={appointment.doctor}
                  medicalField={appointment.medicalField}
                  time={dateForDisplay}
                />
              </View>
            </>
          ) : (
            <Text>
              על מנת להוסיף תזכורת חובה הרשאה ללוח שנה. אנא אשר זאת בהגדרות.
            </Text>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            style={styles.button}
            onPress={handleClose}
            mode="contained"
            buttonColor="red"
          >
            <Text style={styles.textStyle}>בטל</Text>
          </Button>
          {hasPermission ? (
            <Button
              mode="contained"
              onPress={addEventToCalendar}
              style={styles.button}
            >
              <Text style={styles.textStyle}>אשר</Text>
            </Button>
          ) : (
            <Button
              mode="contained"
              onPress={openSettings}
              style={styles.button}
            >
              <Text style={styles.textStyle}>פתח הגדרות</Text>
            </Button>
          )}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AddToCalendarDialog;
