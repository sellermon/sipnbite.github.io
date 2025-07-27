# Sip & Bite Landing Page

## Overview

This is a coming soon landing page for "Sip & Bite," a Costa Rican beverage company launching in 2025. The application is built as a full-stack TypeScript project using React for the frontend and Express for the backend, with a PostgreSQL database for storing email subscriptions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend concerns:

- **Frontend**: React-based SPA with TypeScript, using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Deployment**: Production-ready build system with esbuild

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion for smooth animations

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API**: RESTful endpoints for email subscription management
- **Validation**: Zod schemas for request/response validation
- **Storage**: PostgreSQL database with Drizzle ORM (switched from in-memory storage)

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Provider**: Neon Database serverless PostgreSQL
- **Migrations**: Drizzle Kit for database migrations
- **Schema**: Shared TypeScript schema definitions

## Data Flow

1. **User Interaction**: User fills out email subscription form on landing page
2. **Form Validation**: Client-side validation using React Hook Form and Zod
3. **API Request**: Form submission triggers POST request to `/api/subscribe`
4. **Server Validation**: Server validates request data using shared Zod schemas
5. **Database Operation**: Email subscription stored in PostgreSQL database
6. **Response**: Success/error response sent back to client
7. **UI Update**: Toast notification displayed to user

### Key Data Entities
- **Email Subscriptions**: Stores email addresses and subscription timestamps
- **Users**: Basic user structure (prepared for future authentication)

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animation library
- **react-hook-form**: Form handling and validation
- **wouter**: Lightweight routing library

### UI Dependencies
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Fast build tool and development server
- **typescript**: Type safety and development experience
- **drizzle-kit**: Database migration and schema management

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with hot module replacement
- **Backend**: tsx for running TypeScript files directly
- **Database**: Neon serverless PostgreSQL for development

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Static Assets**: Express serves built frontend files in production

### Environment Configuration
- **Database**: Configured via `DATABASE_URL` environment variable
- **Development Tools**: Replit-specific plugins for enhanced development experience
- **Error Handling**: Custom error boundaries and server error middleware

### Key Features
- **Responsive Design**: Mobile-first design with Tailwind breakpoints
- **Internationalization**: Spanish language content for Costa Rican market
- **Brand Identity**: Custom color scheme inspired by logo colors with translucent background
- **Premium Animations**: Sophisticated logo animations with 3D rotation, floating fruit animations, and smooth transitions
- **Social Integration**: Instagram QR code and social media links
- **Enhanced Visuals**: Glass morphism effects, improved contrast, and elegant logo presentation

The application is designed to be easily extensible for future features like user authentication, product catalog, and e-commerce functionality when the business launches in 2025.