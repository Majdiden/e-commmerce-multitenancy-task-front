"use client"

import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { AppContent } from '../../components/AppContent';
import { useEffect, useState } from 'react';

export default function TenantPage() {
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

    return <AppContent />;
}