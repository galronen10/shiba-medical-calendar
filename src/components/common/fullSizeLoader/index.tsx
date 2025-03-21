import { View, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { ActivityIndicator } from 'react-native-paper';
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export const FullSizeLoader: FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={100} />
    </View>
  );
};
