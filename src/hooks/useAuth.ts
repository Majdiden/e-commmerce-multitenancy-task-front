import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import api from '../utils/api';
import { useState, useEffect } from 'react';

interface AuthData {
  name: string,
  email: string;
  password: string;
}

export function useAuth() {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  });
  const [tenantName, setTenantName] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const storedTenantName = localStorage.getItem('tenantName');
    const urlTenantName = params.tenantName as string;

    console.log("urlTenantName", urlTenantName);

    if (urlTenantName) {
      setTenantName(urlTenantName);
    } else {
      setTenantName(storedTenantName);
    }
  }, [params.tenantName]);

  const register = useMutation({
    mutationFn: (data: AuthData) => api.post('/auth/register', data),
    onSuccess: (response) => {
      const newTenantName = response.data.responseObject.tenantName;
      setTenantName(newTenantName);
      localStorage.setItem('tenantName', newTenantName);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      router.push(`/${newTenantName}`);
    },
  });

  const login = useMutation({
    mutationFn: (data: AuthData) => api.post('/auth/login', data),
    onSuccess: (response) => {
      const newToken = response.data.responseObject.accessToken;
      const newTenantName = response.data.responseObject.tenantId;
      setToken(newToken);
      setTenantName(newTenantName);
      localStorage.setItem('token', newToken);
      localStorage.setItem('tenantName', newTenantName);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      router.push(`/${newTenantName}`);
    },
  });

  const logout = () => {
    setToken(null);
    setTenantName(null);
    localStorage.removeItem('token');
    localStorage.removeItem('tenantName');
    queryClient.clear();
    router.push('/');
  };

  return { token, tenantName, setTenantName, register, login, logout };
}
