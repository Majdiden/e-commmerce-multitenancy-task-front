import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export function useProducts(tenantName: string) {
  const queryClient = useQueryClient();

  const getProducts = useQuery({
    queryKey: ['products', tenantName],
    queryFn: () => api.get(`/${tenantName}/products`).then((res) => res.data),
  });

  const getProduct = (id: string) => useQuery({
    queryKey: ['products', tenantName, id],
    queryFn: () => api.get(`/${tenantName}/products/${id}`).then((res) => res.data),
  });

  const createProduct = useMutation({
    mutationFn: (newProduct: Omit<Product, 'id'>) => api.post(`/${tenantName}/products`, newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', tenantName] });
    },
  });

  const updateProduct = useMutation({
    mutationFn: (updatedProduct: Product) => api.patch(`/${tenantName}/products/${updatedProduct.id}`, updatedProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', tenantName] });
    },
  });

  return { getProducts, getProduct, createProduct, updateProduct };
}

