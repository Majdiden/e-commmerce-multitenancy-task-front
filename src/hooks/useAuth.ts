import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useState, useEffect } from 'react';

interface AuthData {
  name: string,
  email: string;
  password: string;
  storeName?: string;
}

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [tenantName, setTenantName] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedTenantName = localStorage.getItem('tenantName');
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedTenantName) {
      setTenantName(storedTenantName);
    }
  }, []);

  const register = useMutation({
    mutationFn: (data: AuthData) => api.post('/auth/register', data),
    onSuccess: (response) => {
      const newToken = response.data.token;
      const newTenantName = response.data.tenantId;
      setToken(newToken);
      setTenantName(newTenantName);
      localStorage.setItem('token', newToken);
      localStorage.setItem('tenantName', newTenantName);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate(`/${newTenantName}`);
    },
  });

  const login = useMutation({
    mutationFn: (data: AuthData) => api.post('/auth/login', data),
    onSuccess: (response) => {
      console.log("response:", response);
      const newToken = response.data.responseObject.accessToken;
      const newTenantName = response.data.responseObject.tenantId;
      setToken(newToken);
      setTenantName(newTenantName);
      localStorage.setItem('token', newToken);
      localStorage.setItem('tenantName', newTenantName);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate(`/${newTenantName}`);
    },
  });

  const logout = () => {
    setToken(null);
    setTenantName(null);
    localStorage.removeItem('token');
    localStorage.removeItem('tenantName');
    queryClient.clear();
    navigate('/');
  };

  return { token, tenantName, register, login, logout };
}

