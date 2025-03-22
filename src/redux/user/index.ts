import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { IUser } from '@/models/user.model';

interface UserState {
  userData: IUser;
}

const initialState: UserState = {
  userData: {
    id: 's5JdLuSGt6gMh4XC5JBPJyMtvlY2',
    name: 'גל',
    phone: '+972522287603',
  },
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
  (user: IUser): string => user.id,
);

export default userSlice.reducer;
