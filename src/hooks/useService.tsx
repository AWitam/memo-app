import { useAuth } from './useAuth';

export const useService = <T,>(service: (...args: unknown[]) => Promise<T>) => {
  const { user, isAuthorized } = useAuth();
  let data;

  if (isAuthorized && user) {
    data = service();
  }

  return { data };
};
