import { useAppSelector } from '../app/hooks';

export const useAuth = () => {
  const { isLoading, errorMessage, isAuthorized } = useAppSelector((state) => state.auth.authState);
  const user = useAppSelector((state) => state.auth.user);

  return { user, isLoading, errorMessage, isAuthorized };
};
