import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../app/store';
import { logOut } from '../state/user/userSlice';

export const LogOutPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(logOut());
  }, []);

  return <div>Log out</div>;
};
