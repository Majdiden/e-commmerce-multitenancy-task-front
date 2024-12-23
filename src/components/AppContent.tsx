"use client"

import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Register } from './Register';
import { Login } from './Login';
import { ProductList } from './ProductList';
import { ProductForm } from './ProductForm';
import { Button } from "./ui/button"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function AppContent() {
    const { token, tenantName, logout } = useAuth();
    const [showAddProduct, setShowAddProduct] = useState(false);
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {tenantName ? `${tenantName}` : 'E-commerce Multitenancy App'}
                    </h1>
                    {token ? (
                        <Button onClick={logout}>Logout</Button>
                    ) : (
                        tenantName && <Button onClick={() => router.push('/')}>Login</Button>
                    )}
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {!tenantName ? (
                    <div className="flex justify-center space-x-4">
                        <Register />
                        <Login />
                    </div>
                ) : (
                    <div>
                        {token && <div className="mb-4 flex justify-between items-center">
                            <Button onClick={() => setShowAddProduct(!showAddProduct)}>
                                {showAddProduct ? 'Hide Add Product' : 'Add Product'}
                            </Button>
                        </div>}
                        {showAddProduct && <ProductForm />}
                        <ProductList />
                    </div>
                )}
            </main>
        </div>
    );
} 