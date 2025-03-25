import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  selectSchedulerDoctor,
  selectTimeForForm,
} from '@/redux/schedulerForm';
import { useAppSelector } from '@/hooks/store';
import { IDoctor } from '@/models/doctor.model';
import { addDays } from 'date-fns';
import { Calendar, CalendarProvider, DateData } from 'react-native-calendars';
import { dateToStringFormatter, getClosestDate } from '@/utils/date';
import { findMissingDaysInWeek } from './utils';
import { TimePicker } from '@/components/timePicker';
import { Button } from 'react-native-paper';
import { api } from '@/api';
import { SetAppointmentDialog } from '@/components/setAppointmentDialog';
import { toast } from '@/utils';

const styles = StyleSheet.create({
  confirmButton: {
    marginTop: 40,
  },
  container: {
    height: '90%',
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  datePickerContainer: {
    alignContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    height: 450,
    padding: 10,
  },
  timePicker: {
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
  },
});

export const SelectTimeScreen: FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [minDate, setMinDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>();
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const dispatch = useDispatch();

  const selectedDoctor: IDoctor | undefined = useAppSelector(
    selectSchedulerDoctor,
  );

  useEffect(() => {
    const queryData = async () => {
      try {
        if (selectedDoctor && selectedDate) {
          const timeSlots: string[] =
            await api.appointments.getAvailableTimeSlotsByDateAndDoctor(
              selectedDoctor.id,
              selectedDate,
            );

          setAvailableSlots(timeSlots);
          setSelectedTime(timeSlots.length ? timeSlots[0] : undefined);
        }
      } catch (error) {
        toast.error(' שגיאה בטעינת התורים האפשריים אנא נסה שנית');
      }
    };

    queryData();
  }, [selectedDoctor, selectedDate]);

  useEffect(() => {
    const { appointmentDuration, workingDays } = selectedDoctor!;
    const dateToFormat: Date = getClosestDate(workingDays, appointmentDuration);

    const formattedDate = dateToStringFormatter(dateToFormat);
    setMinDate(formattedDate);
    setSelectedDate(formattedDate);
  }, []);

  const selectTime = () => {
    if (selectedTime) {
      dispatch(
        selectTimeForForm({
          date: selectedDate,
          time: selectedTime,
        }),
      );
      setShowConfirmDialog(true);
    } else {
      toast.error('לא ניתן לקבוע תור מבלי לבחור זמן פנוי');
    }
  };

  const onDayPressed = useCallback((date: DateData) => {
    setSelectedDate(date.dateString);
  }, []);

  const maxDate: string = useMemo(
    () => dateToStringFormatter(addDays(new Date(), 35)),
    [],
  );

  const daysNotWorking = useMemo(
    () =>
      selectedDoctor?.workingDays
        ? findMissingDaysInWeek(selectedDoctor?.workingDays)
        : [],
    [selectedDoctor?.workingDays],
  );

  const closeConfirmDialog = useCallback(() => {
    setShowConfirmDialog(false);
  }, []);

  return showConfirmDialog ? (
    <SetAppointmentDialog handleClose={closeConfirmDialog} isVisible />
  ) : (
    <View style={styles.container}>
      <View style={styles.datePickerContainer}>
        <CalendarProvider date={selectedDate}>
          <Calendar
            firstDay={0}
            minDate={minDate}
            maxDate={maxDate}
            disabledByWeekDays={daysNotWorking}
            hideExtraDays={false}
            showSixWeeks
            onDayPress={onDayPressed}
            disableAllTouchEventsForDisabledDays
            disableAllTouchEventsForInactiveDays
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: 'blue' },
            }}
          />
        </CalendarProvider>
        {selectedDate && (
          <View style={styles.timePicker}>
            <TimePicker
              onTimeUpdate={setSelectedTime}
              timeSlots={availableSlots}
              selectedTime={selectedTime}
            />
          </View>
        )}
      </View>

      <Button
        mode="contained"
        onPress={selectTime}
        style={styles.confirmButton}
      >
        בחר מועד
      </Button>
    </View>
  );
};
