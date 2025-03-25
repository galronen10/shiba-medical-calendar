import { FC, memo, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { ActivityIndicator } from 'react-native-paper';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 3.5;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 5,
  },
  noSlotsText: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 1,
  },
  selectedTimeText: {
    color: 'blue',
    fontSize: 32,
    fontWeight: 'bold',
    opacity: 1,
  },
  timeItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: ITEM_WIDTH,
  },
  timeList: {
    alignItems: 'center',
    paddingHorizontal: ITEM_WIDTH,
  },
  timeText: {
    color: 'gray',
    fontSize: 20,
    fontWeight: '600',
    opacity: 0.5,
  },
});

interface IProps {
  timeSlots: string[];
  selectedTime?: string;
  onTimeUpdate: (time: string) => void;
  isLoading: boolean;
}

export const TimePicker: FC<IProps> = memo(
  ({ onTimeUpdate, timeSlots, selectedTime, isLoading }) => {
    const listRef = useRef<FlatList>(null);

    const scrollToIndex = useCallback((item: string) => {
      listRef.current?.scrollToItem({ item, animated: true });
      onTimeUpdate(item);
    }, []);

    useEffect(() => {
      if (timeSlots.length) {
        scrollToIndex(timeSlots[0]);
      }
    }, [timeSlots]);

    useEffect(() => {
      if (selectedTime) {
        scrollToIndex(selectedTime);
      }
    }, []);

    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size={42.5} />
        </View>
      );
    } else
      return (
        <View style={styles.container}>
          {timeSlots.length ? (
            <FlatList
              ref={listRef}
              data={timeSlots}
              inverted={true}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToAlignment="center"
              snapToInterval={ITEM_WIDTH}
              decelerationRate="fast"
              onMomentumScrollEnd={(event) => {
                const index = Math.round(
                  event.nativeEvent.contentOffset.x / ITEM_WIDTH,
                );
                onTimeUpdate(timeSlots[index]);
              }}
              contentContainerStyle={styles.timeList}
              getItemLayout={(_, index) => ({
                length: ITEM_WIDTH,
                offset: ITEM_WIDTH * index,
                index,
              })}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => scrollToIndex(item)}
                  style={styles.timeItem}
                >
                  <Text
                    style={
                      item === selectedTime
                        ? styles.selectedTimeText
                        : styles.timeText
                    }
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={styles.noSlotsText}>לא קיימים זמנים אפשריים</Text>
          )}
        </View>
      );
  },
);
