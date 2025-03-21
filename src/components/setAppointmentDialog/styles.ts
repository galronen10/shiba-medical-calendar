import Colors from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bodyText: {
    textAlign: 'right',
  },
  button: {
    borderRadius: 10,
    elevation: 2,
    padding: 5,
  },
  cancelButton: {
    backgroundColor: Colors.info,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: Colors.danger,
  },
  textStyle: {
    color: Colors.background,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
