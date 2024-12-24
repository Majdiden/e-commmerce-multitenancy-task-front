# E-commerce Multi-tenancy Prototype

Preview the app here: [https://e-commerce-multitenancy-front.vercel.app/](https://e-commerce-multitenancy-front.vercel.app/)

## Architecture Overview

The application implements a multi-tenant system where each store (tenant) operates in isolation with its own:
- User authentication and authorization
- Product management system
- Dedicated URL routing (`/{tenantName}`)

## Core Features

### Multi-tenant Authentication

The authentication system (`useAuth.ts`) manages tenant-specific user sessions:

- Store registration with unique tenant names
- Tenant-specific login system
- JWT token management with localStorage persistence
- Automatic routing to tenant-specific pages
- Token-based API request authorization

### Product Management

Each tenant can manage their product inventory through:

- Product creation with name, price, description, and stock information
- Product listing with tenant-specific views
- Product updates and modifications
- Automatic validation and error handling

### Routing System

The application implements a dynamic routing system:

- Root route (`/`) for store registration
- Tenant-specific routes (`/{tenantName}`) for store operations
- Protected routes with authentication checks
- Automatic redirects based on authentication state

## Component Structure

### Core Components

1. **AppContent**: Main application shell with:
   - Header with tenant name display
   - Authentication state management
   - Product management interface

2. **Authentication Components**:
   - `Register`: Store creation interface
   - `Login`: Tenant-specific login form
   - Both using shadcn/ui components for consistent styling

3. **Product Components**:
   - `ProductList`: Displays tenant-specific products in a table
   - `ProductForm`: Handles product creation and updates

### Custom Hooks

1. **useAuth**:
   - Manages authentication state
   - Handles tenant identification
   - Provides login/logout functionality
   - Manages JWT tokens

2. **useProducts**:
   - Manages product-related operations
   - Implements React Query for data fetching
   - Handles error states and loading states

## State Management

The application uses React Query for server state management:

- Automatic cache invalidation
- Optimistic updates
- Error handling
- Loading states
- Data synchronization


## API Integration

The API integration is handled through:

- Axios instance with base URL configuration
- Automatic token injection for authenticated requests
- Tenant-specific endpoint handling
- Error handling and response transformation

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```env
   NEXT_PUBLIC_API_URL=your-api-url
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
