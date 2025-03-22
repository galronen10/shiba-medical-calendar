import { View } from 'react-native';
import React, { FC } from 'react';
import { Icon } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  genderIcon: {
    backgroundColor: 'transparent',
    marginBottom: 4,
    marginRight: 10,
  },
});

interface IProps {
  isFemale: boolean;
}

export const GenderIcon: FC<IProps> = ({ isFemale }) => {
  return (
    <View style={styles.genderIcon}>
      <Icon
        source={isFemale ? 'gender-female' : 'gender-male'}
        color={isFemale ? 'pink' : 'blue'}
        size={35}
      />
    </View>
  );
};
