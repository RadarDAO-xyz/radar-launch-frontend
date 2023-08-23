import { AuthContext } from '@/components/Providers/AuthProvider';
import { useContext } from 'react';

export function useAuth() {
  return useContext(AuthContext);
}
