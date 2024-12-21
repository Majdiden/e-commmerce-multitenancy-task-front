import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { ProductList } from './components/ProductList';
import { ProductForm } from './components/ProductForm';
import { Button } from "@/components/ui/button"

export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
}

function AppContent() {
  const { token, tenantName, logout } = useAuth();
  const [showAddProduct, setShowAddProduct] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {tenantName ? `${tenantName}'s Store` : 'E-commerce Multitenancy App'}
          </h1>
          {token && (
            <Button onClick={logout}>Logout</Button>
          )}
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={
            !token ? (
              <div className="flex justify-center space-x-4">
                <Register />
                <Login />
              </div>
            ) : (
              <Navigate to={`/${tenantName}`} replace />
            )
          } />
          <Route path="/:tenantName" element={
            token ? (
              <div>
                <div className="mb-4 flex justify-between items-center">
                  <Button onClick={() => setShowAddProduct(!showAddProduct)}>
                    {showAddProduct ? 'Hide Add Product' : 'Add Product'}
                  </Button>
                </div>
                {showAddProduct && <ProductForm />}
                <ProductList />
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          } />
        </Routes>
      </main>
    </div>
  );
}
