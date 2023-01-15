import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '../app/store';
// import { fetchUserStudySets } from '../state/studySet/studySetsSlice';
import { getUserStreakData } from '../state/user/userSlice';

import { useAuth } from './useAuth';

export const useUserStreakData = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const isLoadingData = isAuthLoading || !user || !user.streakData;

  useEffect(() => {
    (async () => {
      if (user && !isAuthLoading) {
        const { streakData } = user;
        if (!streakData) {
          await dispatch(getUserStreakData(user.uid));
        }
      }
    })();
  }, [user]);

  return { isLoadingData, user };
};
