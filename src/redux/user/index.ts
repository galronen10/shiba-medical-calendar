import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { IUser } from '@/models/user.model';

interface UserState {
  userData: IUser;
}

const initialState: UserState = {
  userData: { id: 1, name: '', phone: '' },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<IUser>>) => {
      return {
        ...state,
        userData: { ...state.userData, ...action.payload },
      };
    },
    logout: () => ({ ...initialState }),
  },
});

export const { updateUser, logout } = userSlice.actions;

export const selectUser = (state: RootState): IUser => state.user.userData;

export const selectUserId = createSelector(
  selectUser,
  (user: IUser): number => user.id,
);

export default userSlice.reducer;
