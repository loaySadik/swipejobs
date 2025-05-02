# SwipeJobs

A React Native application for job searching and management using Expo and React Navigation.

## Project Setup

1. Install dependencies:
   ```sh
   pnpm install
   ```

2. Setup environment:
   - Create a `.env` file in the project root similar to `.env.example` and fill in the required variables.

3. Start the development server:
   ```sh
   pnpm start
   ```

4. Run on specific platforms:
   ```sh
   pnpm run ios     # For iOS
   pnpm run android # For Android
   pnpm run web     # For Web
   ```

## Git Workflow Rules

This project uses Husky to enforce the following Git rules:

1. **Pre-commit Checks**:
   - Linting with ESLint
   - TypeScript type checking
   - Unit tests execution
   - Branch name validation

2. **Commit Message Format**:
   - Uses Conventional Commits standard
   - Format: `type: description` (e.g., `feat: add user profile`)
   - Allowed types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`
   - Enforced through commitlint

3. **Branch Naming Conventions**:
   - Protected branches: `main`, `develop`, `master`
   - Feature branches: `feature/ABC-123-feature-name`
   - Bug fixes: `bugfix/ABC-123-issue-description`
   - Hot fixes: `hotfix/ABC-123-urgent-fix`
   - Release branches: `release/v1.2.3`
   - Chores: `chore/description`

## Project Structure

```
src/
├── api/            # API clients and data fetching logic
├── components/     # Reusable UI components
├── navigation/     # Navigation configuration
├── screens/        # Application screens
├── test/           # Test utilities and mocks
├── types/          # TypeScript type definitions
└── App.tsx         # Main application component
```

## Development Guidelines

### Code Organization
- The app uses TypeScript for type safety
- API calls are handled with React Query
- UI components are built with Tamagui
- Navigation uses React Navigation v7
- Testing is set up with Jest and React Testing Library

### Import Conventions
- Always use named exports/imports where possible
- Group imports in the following order:
  1. External libraries
  2. Types
  3. API/services
  4. Components
  5. Utilities

### API Structure
- All API calls are centralized in the `src/api` directory
- Follow the pattern of using React Query hooks:
  - Queries: `use[Resource]Query`
  - Mutations: `use[Action][Resource]Mutation`
- API endpoints are organized by domain (job, user, etc.)
- Use the common API client for all requests

### Hooks Guidelines
- Custom hooks should be prefixed with `use`
- Place domain-specific hooks in their relevant API folders
- UI-related hooks should go in the component's directory

### UI Design Rules
- Use Tamagui components for consistent UI elements
- Follow the component structure:
  - Container components in `screens/`
  - Reusable UI components in `components/`
- Styling guidelines:
  - Use Tamagui's theme tokens for colors, spacing, and typography

### Testing
- Use the TestWrapper component to provide context for component tests
- Mock API responses using `src/test/mockData.json`

## Available Scripts

- `pnpm start`: Start the development server
- `pnpm run lint`: Run ESLint
- `pnpm run type-check`: Type check with TypeScript
- `pnpm run test`: Run tests
- `pnpm run check-all`: Run all checks (lint, type-check, test)

## Notes

This project uses an Expo development build and cannot be run with Expo Go. For development, use the commands above that will build the necessary native code.
