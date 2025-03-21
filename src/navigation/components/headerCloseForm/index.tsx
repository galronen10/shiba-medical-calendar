import { EAppRoutes } from '@/models/routes';
import React, { FC } from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { resetForm } from '@/redux/schedulerForm';

interface IProps {
  navigate: any;
}

export const styles = StyleSheet.create({
  container: { alignItems: 'center', flexDirection: 'row' },
});

export const HeaderCloseForm: FC<IProps> = ({ navigate }) => {
  const dispatch = useDispatch();

  const closeFrom = () => {
    dispatch(resetForm());
    navigate(EAppRoutes.home);
  };

  return (
    <View style={styles.container}>
      <IconButton icon="close-thick" size={20} onPress={closeFrom} />
    </View>
  );
};
