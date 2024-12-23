"use client"

import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useParams } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

interface ProductFormProps {
  product?: {
    id: string;
    name: string;
    price: number;
    description: string;
    stock: number;
  };
}

export function ProductForm({ product }: ProductFormProps) {
  const { tenantName } = useAuth();
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price?.toString() || '0');
  const [stock, setStock] = useState(product?.stock?.toString() || '0');
  const [description, setDescription] = useState(product?.description || '');

  const { createProduct, updateProduct } = useProducts(tenantName || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name,
      price: parseFloat(price),
      description,
      stock: parseInt(stock),
    };

    if (product) {
      updateProduct.mutate({ id: product.id, ...productData });
    } else {
      createProduct.mutate(productData);
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>{product ? 'Edit Product' : 'Add Product'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {product ? 'Update Product' : 'Add Product'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
