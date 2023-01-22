import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import type { AppDispatch } from '../app/store';
import { fetchUserStudySets } from '../state/studySet/studySetsSlice';

import { useAuth } from './useAuth';

export const useStudySetsData = () => {
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const { studySets, isLoading, isError, status } = useAppSelector((state) => state.collections);

  useEffect(() => {
    (async () => {
      if (user?.uid) {
        if (studySets.length < 1) {
          await dispatch(fetchUserStudySets(user.uid));
        }
      }
    })();
  }, [studySets]);
  return { studySets, isLoading, isError, status };
};
