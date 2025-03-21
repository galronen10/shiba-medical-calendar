import { IStoreUser } from '@/models/user';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

interface UserState {
  userData: IStoreUser;
}

const initialState: UserState = {
  userData: { email: '', fullName: '', uid: '' },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<IStoreUser>>) => {
      return {
        ...state,
        userData: { ...state.userData, ...action.payload },
      };
    },
    logout: () => ({ ...initialState }),
  },
});

export const { updateUser, logout } = userSlice.actions;

export const selectUser = (state: RootState): IStoreUser => state.user.userData;

export const selectUserId = createSelector(
  selectUser,
  (user: IStoreUser): string => user.uid,
);

export default userSlice.reducer;
