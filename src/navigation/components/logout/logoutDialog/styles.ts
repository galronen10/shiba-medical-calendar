import Colors from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    elevation: 2,
    padding: 5,
  },
  cancelButton: {
    backgroundColor: Colors.info,
    marginLeft: 10,
  },
  container: {
    alignSelf: 'center',
    width: 230,
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
    textAlign: 'center',
  },
});
