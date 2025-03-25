import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { IUser } from '@/models/user.model';

interface UserState {
  userData?: IUser;
}

const initialState: UserState = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (_state, action: PayloadAction<IUser>) => ({
      userData: { ...action.payload },
    }),
    logout: () => ({ ...initialState }),
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState): IUser | undefined =>
  state.user.userData;

export const selectUserId = createSelector(
  selectUser,
  (user?: IUser): number | undefined => user?.id,
);

export default userSlice.reducer;
