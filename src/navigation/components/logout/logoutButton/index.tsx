import React, { FC, useState } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { LogoutDialog } from '../logoutDialog';

export const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 30,
    justifyContent: 'center',
    margin: 4,
    width: 60,
  },
  label: { marginHorizontal: 5, marginVertical: 2 },
});

export const LogoutButton: FC = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const closeLogoutDialog = (): void => {
    setShowLogoutDialog(false);
  };

  const openLogoutDialog = (): void => {
    setShowLogoutDialog(true);
  };

  return (
    <>
      <Button
        mode="contained"
        buttonColor="red"
        style={styles.button}
        compact
        onPress={openLogoutDialog}
        labelStyle={styles.label}
      >
        התנתק
      </Button>
      <LogoutDialog
        isVisible={showLogoutDialog}
        handleClose={closeLogoutDialog}
      />
    </>
  );
};
