"use client"

import { useProducts } from '../hooks/useProducts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function ProductList() {
  const router = useRouter();
  interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    stock: number;
  }
  const { tenantName, setTenantName } = useAuth();
  const { getProducts } = useProducts(tenantName || '');
  const { data: products, isLoading, error } = getProducts;

  if (isLoading) return <div>Loading...</div>;
  // if (tenantName === null) {
  //   router.push('/');
  // }
  if (products.length === 0) return <div>No products found</div>;

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products && products.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
