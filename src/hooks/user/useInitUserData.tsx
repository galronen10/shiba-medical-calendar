import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store';
import { selectUserId } from '@/redux/user';

export const useGetUserData = (): void => {
  const dispatch = useDispatch();
  const storeUserId = useAppSelector(selectUserId);

  const addUserToStore = useCallback(
    async (userId: string) => {
      // const { email, fullname, imageUrl } = await api.user.getById(userId);
      // const userToAdd: Partial<StoreUser> = {
      //   email,
      //   fullname,
      //   imageUrl,
      // };
      // if (!storeUserId) userToAdd.userId = userId;
      // dispatch(updateUser(userToAdd));
    },
    [dispatch, storeUserId],
  );

  const handleFetchUserDetails = async () => {};

  useEffect(() => {
    if (storeUserId) addUserToStore(storeUserId);
  }, [addUserToStore, storeUserId]);

  useEffect(() => {
    handleFetchUserDetails();
  }, []);
};
