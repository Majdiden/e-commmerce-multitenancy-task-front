"use client"

import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/useAuth';
import { Login } from '../../../components/Login';
import { useEffect, useState } from 'react';

export default function LoginPage() {
    const { token } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        setIsLoading(false);
    }, [router]);

    if (isLoading) {
        return null;
    }

    return (

        <div className="min-h-screen bg-gray-100">
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="flex justify-center space-x-4">
                    <Login />
                </div>
            </main>
        </div>
    )
}