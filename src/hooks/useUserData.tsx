import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import type { AppDispatch } from '../app/store';
import { fetchUserStudySets } from '../state/studySet/studySetsSlice';
import { getUserStreakData } from '../state/user/userSlice';

import { useAuth } from './useAuth';

export const useUserData = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { studySets, isLoading: isLoadingCollections } = useAppSelector((state) => state.collections);
  const dispatch = useDispatch<AppDispatch>();
  const isLoadingData = isAuthLoading || isLoadingCollections;

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

  useEffect(() => {
    (async () => {
      if (user && !isAuthLoading) {
        if (studySets.length < 1) {
          await dispatch(fetchUserStudySets(user.uid));
        }
      }
    })();
  }, [studySets]);

  return { isLoadingData, user, studySets };
};
