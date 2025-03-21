import { StyleSheet } from 'react-native';
import Colors from '@/constants/colors'; // Import the Colors file

export const styles = StyleSheet.create({
  card: {
    alignContent: 'center',
    paddingBottom: 20,
  },
  container: {
    margin: 10,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  profileImage: {
    borderRadius: 25,
    marginRight: 10,
  },
  reportData: {
    marginBottom: 10,
    textAlign: 'right',
  },
  reportImage: {
    alignSelf: 'center',
    borderRadius: 10,
    height: 200,
    resizeMode: 'cover',
    width: '80%',
  },
  reportTime: {
    color: Colors.listItemTime,
    textAlign: 'right',
  },
  username: {
    alignSelf: 'flex-end',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
