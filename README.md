# Company Management Admin Interface

A comprehensive admin interface for managing companies, users, inspection journeys, cost matrices, sorting rules, and chase-up rules.

## Architecture

This application follows a clean, layered architecture:

### 🏗️ Architecture Layers

```
Components (UI Layer)
    ↓
Services (Business Logic)
    ↓
Repositories (Data Access)
    ↓
API Client / Mock Data
```

### 📁 Project Structure

```
src/
├── api/                    # API client configuration
├── auth/                   # Authentication logic
├── components/             # Reusable UI components
├── config/                 # Environment and app configuration
├── hooks/                  # Custom React hooks
├── i18n/                   # Internationalization
├── locales/                # Translation files
├── mocks/                  # Mock data for development
├── pages/                  # Page components
├── repositories/           # Data access layer
├── services/               # Business logic layer
├── types/                  # TypeScript type definitions
└── utils/                  # Utility functions
```

## 🚀 Getting Started

### Development Mode (Mock Data)

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will run with mock data by default.

### Production Mode (Real API)

1. Update `src/config/environment.ts`:
```typescript
const environment: EnvironmentConfig = {
  USE_MOCK_DATA: false, // Switch to real API
  API_BASE_URL: 'https://your-api-domain.com/api',
  // ... other config
};
```

2. Implement your backend API endpoints (see Backend API Guide below)

## 🔧 Configuration

### Environment Configuration

Edit `src/config/environment.ts` to configure:
- `USE_MOCK_DATA`: Toggle between mock and real data
- `API_BASE_URL`: Your backend API URL
- `API_TIMEOUT`: Request timeout in milliseconds
- `ENABLE_LOGGING`: Enable/disable API logging

### Mock/Production Switching

The application automatically switches between mock data and real API calls based on the `USE_MOCK_DATA` flag. No code changes needed in components or services.

## 📊 Services

Each domain has its own service with consistent CRUD operations:

- **CompanyService**: Manage companies and their configurations
- **UserService**: Handle user accounts and permissions
- **JourneyService**: Manage inspection journey workflows
- **SortingRuleService**: Configure automated sorting rules
- **CostMatrixService**: Handle repair cost matrices
- **ChaseupRuleService**: Manage automated chase-up rules

### Service Pattern

```typescript
class ExampleService {
  async getAll(params?: SearchParams): Promise<ApiResponse<Entity[]>>
  async getById(id: string): Promise<ApiResponse<Entity>>
  async create(data: CreateRequest): Promise<ApiResponse<Entity>>
  async update(data: UpdateRequest): Promise<ApiResponse<Entity>>
  async delete(id: string): Promise<ApiResponse<null>>
  // ... domain-specific methods
}
```

## 🔌 Backend API Integration

### Required Endpoints

Your backend should implement these REST endpoints:

#### Companies
- `GET /api/companies` - List companies with filtering
- `GET /api/companies/:id` - Get specific company
- `POST /api/companies` - Create company
- `PUT /api/companies/:id` - Update company
- `DELETE /api/companies/:id` - Delete company
- `POST /api/companies/:id/archive` - Archive company
- `POST /api/companies/:id/duplicate` - Duplicate company

#### Users
- `GET /api/users` - List users with filtering
- `GET /api/users/:id` - Get specific user
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `POST /api/users/:id/password-reset` - Send password reset

#### Journeys
- `GET /api/journeys` - List journeys with filtering
- `GET /api/journeys/:id` - Get specific journey
- `POST /api/journeys` - Create journey
- `PUT /api/journeys/:id` - Update journey
- `DELETE /api/journeys/:id` - Delete journey
- `POST /api/journeys/:id/duplicate` - Duplicate journey

#### Sorting Rules
- `GET /api/sorting-rules` - List sorting rules
- `GET /api/sorting-rules/:id` - Get specific rule
- `POST /api/sorting-rules` - Create rule
- `PUT /api/sorting-rules/:id` - Update rule
- `DELETE /api/sorting-rules/:id` - Delete rule

#### Cost Matrices
- `GET /api/cost-matrices` - List cost matrices
- `GET /api/cost-matrices/:id` - Get specific matrix
- `POST /api/cost-matrices` - Create matrix
- `PUT /api/cost-matrices/:id` - Update matrix
- `DELETE /api/cost-matrices/:id` - Delete matrix
- `POST /api/cost-matrices/:id/duplicate` - Duplicate matrix

#### Chase-up Rules
- `GET /api/chaseup-rules` - List chase-up rules
- `GET /api/chaseup-rules/:id` - Get specific rule
- `POST /api/chaseup-rules` - Create rule
- `PUT /api/chaseup-rules/:id` - Update rule
- `DELETE /api/chaseup-rules/:id` - Delete rule
- `POST /api/chaseup-rules/:id/duplicate` - Duplicate rule

### API Response Format

All endpoints should return responses in this format:

```typescript
{
  data: T | T[] | null,
  success: boolean,
  message?: string,
  errors?: Record<string, string[]>
}
```

## 🎨 Features

- **Multi-language Support**: English, French, German, Italian, Spanish, Dutch, Swedish, Norwegian
- **Role-based Access Control**: Super Admin, Admin, User roles with granular permissions
- **Advanced Filtering**: Search and filter across all entities
- **Data Export/Import**: CSV export for cost matrices
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Validation**: Form validation with helpful error messages
- **Toast Notifications**: User-friendly success/error messages

## 🔐 Authentication

### Demo Credentials

- **Super Admin**: admin@example.com / password123
- **Company Admin**: company@example.com / password123
- **User**: user@example.com / password123
- **Child Company User**: userChildCompany@example.com / password123

### Permissions System

The application uses a granular permissions system defined in `src/types/auth.ts`. Each route and action is protected based on user permissions.

## 🛠️ Development

### Adding New Entities

1. Define types in `src/types/entities.ts`
2. Create repository in `src/repositories/`
3. Create service in `src/services/`
4. Create custom hook in `src/hooks/`
5. Add mock data in `src/mocks/data.ts`
6. Create UI components and pages

### Code Quality

- **TypeScript**: Strict typing throughout the application
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Validation**: Client-side validation with server-side validation support
- **Testing Ready**: Clean architecture makes unit testing straightforward

## 📝 License

This project is licensed under the MIT License.
