# Code Standards

Code standards and consistency are fundamental to maintainable, scalable software. The One X Methodology emphasizes functional programming principles, explicit code patterns, and modern JavaScript/TypeScript practices that enhance readability and reduce bugs.

## Core Philosophy

### Functional Over Imperative
We prioritize functional programming patterns that emphasize immutability, pure functions, and declarative code over imperative, mutative approaches.

### Explicit Over Implicit
Code should be self-documenting and explicit in its intent. We favor clarity over cleverness, making code easy to understand for both current and future developers.

### Consistency Across Teams
Standardized patterns ensure that any developer can work effectively across different projects and codebases within our ecosystem.

## JavaScript/TypeScript Standards

### Variable Declarations

**❌ Avoid `let` - Use `const` by default**
```javascript
// Bad
let userName = 'john';
let users = [];
let config = { api: 'https://api.example.com' };

// Good  
const userName = 'john';
const users = [];
const config = { api: 'https://api.example.com' };
```

**✅ Use `let` only when reassignment is necessary**
```javascript
// Acceptable use of let
let currentIndex = 0;
for (const item of items) {
  if (item.id === targetId) {
    break;
  }
  currentIndex++;
}
```

### Array Operations - No Mutative Code

**❌ Avoid mutative array methods**
```javascript
// Bad - mutates original array
const numbers = [1, 2, 3, 4, 5];
numbers.push(6);
numbers.splice(0, 1);
numbers.sort();

// Bad - traditional for loops
const doubled = [];
for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}
```

**✅ Use functional array methods**
```javascript
// Good - immutable operations
const numbers = [1, 2, 3, 4, 5];
const withSix = [...numbers, 6];
const withoutFirst = numbers.slice(1);
const sorted = [...numbers].sort();

// Good - functional transformations
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);
```

### Object Operations - Immutable Updates

**❌ Avoid object mutation**
```javascript
// Bad - mutates original object
const user = { name: 'John', age: 30 };
user.age = 31;
user.email = 'john@example.com';
delete user.name;
```

**✅ Use spread operator for updates**
```javascript
// Good - creates new objects
const user = { name: 'John', age: 30 };
const updatedUser = { ...user, age: 31 };
const userWithEmail = { ...user, email: 'john@example.com' };
const { name, ...userWithoutName } = user;
```

### Function Patterns

**✅ Prefer pure functions**
```javascript
// Good - pure function
const calculateTax = (amount, taxRate) => {
  return amount * taxRate;
};

// Good - no side effects
const formatUser = (user) => ({
  ...user,
  fullName: `${user.firstName} ${user.lastName}`,
  displayName: user.firstName
});
```

**❌ Avoid functions with side effects**
```javascript
// Bad - modifies external state
let totalAmount = 0;
const addToTotal = (amount) => {
  totalAmount += amount; // Side effect
  return totalAmount;
};

// Good - return new state
const addToTotal = (currentTotal, amount) => {
  return currentTotal + amount;
};
```

## Modern JavaScript Patterns

### Destructuring

**✅ Use destructuring for object and array access**
```javascript
// Good - object destructuring
const { name, email, preferences: { theme } } = user;

// Good - array destructuring  
const [first, second, ...rest] = items;

// Good - function parameters
const createUser = ({ name, email, role = 'user' }) => ({
  id: generateId(),
  name,
  email,
  role,
  createdAt: new Date()
});
```

### Template Literals

**✅ Use template literals for string interpolation**
```javascript
// Good
const message = `Welcome ${user.name}, you have ${notifications.length} new messages`;

// Good - multiline strings
const html = `
  <div class="user-card">
    <h2>${user.name}</h2>
    <p>${user.email}</p>
  </div>
`;
```

### Arrow Functions

**✅ Use arrow functions appropriately**
```javascript
// Good - short functions
const double = x => x * 2;
const isEven = n => n % 2 === 0;

// Good - array methods
const activeUsers = users.filter(user => user.isActive);
const userNames = users.map(user => user.name);

// Good - explicit return for objects
const createPoint = (x, y) => ({ x, y });
```

## Module Patterns

### Named Exports Over Default Exports

**✅ Prefer named exports**
```javascript
// Good - named exports
export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const formatDate = (date) => {
  return date.toLocaleDateString();
};

export const userService = {
  create: createUser,
  update: updateUser,
  delete: deleteUser
};

// Good - importing
import { validateEmail, formatDate, userService } from './utils';
```

**❌ Avoid default exports**
```javascript
// Bad - default export
export default {
  validateEmail,
  formatDate,
  userService
};

// Bad - importing (unclear what's being imported)
import utils from './utils';
```

## Framework-Specific Guidelines

### Next.js Standards

**✅ Server Actions over API Routes**
```javascript
// Good - Server Action
'use server'

export async function createUser(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  const user = await db.user.create({
    data: { name, email }
  });
  
  redirect('/users');
}

// Usage in component
export default function CreateUserForm() {
  return (
    <form action={createUser}>
      <input name="name" required />
      <input name="email" type="email" required />
      <button type="submit">Create User</button>
    </form>
  );
}
```

**✅ Always await params and searchParams**
```javascript
// Good - Next.js 15+ with async params
export default async function UserPage({ params, searchParams }) {
  const { id } = await params;
  const { tab = 'profile' } = await searchParams;
  
  const user = await getUser(id);
  
  return (
    <div>
      <h1>{user.name}</h1>
      <UserTabs activeTab={tab} />
    </div>
  );
}
```

### React Component Standards

**✅ Component structure and patterns**
```javascript
// Good - functional component with hooks
export const UserProfile = ({ userId, onUpdate }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUser(userId);
        setUser(userData);
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, [userId]);
  
  const handleSave = async (updatedData) => {
    const savedUser = await updateUser(userId, updatedData);
    setUser(savedUser);
    onUpdate?.(savedUser);
  };
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <ErrorMessage message="User not found" />;
  
  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <UserForm user={user} onSave={handleSave} />
    </div>
  );
};
```

## Component Organization

### File Structure Standards

**✅ Organized component placement**
```
src/
├── components/           # Custom application components
│   ├── UserProfile/
│   │   ├── index.ts     # Re-export
│   │   ├── UserProfile.tsx
│   │   └── UserProfile.module.css
│   └── Dashboard/
├── components/ui/        # Reserved for shadcn/ui components
│   ├── Button/
│   ├── Input/
│   └── Modal/
└── lib/
    └── utils.ts
```

**✅ Component index files**
```javascript
// components/UserProfile/index.ts
export { UserProfile } from './UserProfile';
export type { UserProfileProps } from './UserProfile';
```

## Package Management

### Yarn Over npm

**✅ Always use yarn**
```bash
# Good - use yarn
yarn install
yarn add lodash
yarn add -D typescript
yarn remove unused-package

# Bad - don't use npm
npm install
npm i lodash
```

**✅ Yarn workspace configuration**
```json
// package.json
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "packageManager": "yarn@4.0.0"
}
```

## Error Handling Patterns

### Explicit Error Handling

**✅ Handle errors explicitly**
```javascript
// Good - explicit error handling
const fetchUserData = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw new UserFetchError(`Could not load user ${userId}`, error);
  }
};

// Good - using the function
const loadUser = async (id) => {
  try {
    const user = await fetchUserData(id);
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

### Custom Error Classes

**✅ Define specific error types**
```javascript
// Good - custom error classes
export class ValidationError extends Error {
  constructor(field, value, message) {
    super(`Validation failed for ${field}: ${message}`);
    this.name = 'ValidationError';
    this.field = field;
    this.value = value;
  }
}

export class UserFetchError extends Error {
  constructor(message, originalError) {
    super(message);
    this.name = 'UserFetchError';
    this.originalError = originalError;
  }
}

// Usage
const validateEmail = (email) => {
  if (!email) {
    throw new ValidationError('email', email, 'Email is required');
  }
  
  if (!email.includes('@')) {
    throw new ValidationError('email', email, 'Invalid email format');
  }
  
  return true;
};
```

## Type Safety with TypeScript

### Explicit Type Definitions

**✅ Define clear interfaces and types**
```typescript
// Good - explicit interfaces
export interface User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly createdAt: Date;
  readonly preferences: UserPreferences;
}

export interface UserPreferences {
  readonly theme: 'light' | 'dark';
  readonly notifications: boolean;
  readonly language: string;
}

// Good - function types
export type UserValidator = (user: Partial<User>) => ValidationResult;
export type UserFormatter = (user: User) => FormattedUser;

// Good - utility types
export type CreateUserData = Omit<User, 'id' | 'createdAt'>;
export type UpdateUserData = Partial<Pick<User, 'name' | 'preferences'>>;
```

### Avoid `any` - Use Specific Types

**❌ Avoid any**
```typescript
// Bad
const processData = (data: any) => {
  return data.map((item: any) => item.value);
};
```

**✅ Use specific types**
```typescript
// Good - generic constraints
interface DataItem<T = unknown> {
  readonly value: T;
  readonly id: string;
}

const processData = <T>(data: DataItem<T>[]) => {
  return data.map(item => item.value);
};

// Good - union types when appropriate
type Status = 'loading' | 'success' | 'error';
type ApiResponse<T> = 
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };
```

## Code Organization Principles

### Single Responsibility Principle

**✅ Functions should do one thing well**
```javascript
// Good - focused functions
const validateUserEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const formatUserName = (firstName, lastName) => {
  return `${firstName} ${lastName}`.trim();
};

const createUserProfile = (userData) => ({
  ...userData,
  id: generateId(),
  createdAt: new Date(),
  isActive: true
});

// Good - compose functions
const processNewUser = (userData) => {
  const isValidEmail = validateUserEmail(userData.email);
  if (!isValidEmail) {
    throw new ValidationError('email', userData.email, 'Invalid email format');
  }
  
  const profile = createUserProfile({
    ...userData,
    name: formatUserName(userData.firstName, userData.lastName)
  });
  
  return profile;
};
```

### Consistent Naming Conventions

**✅ Clear, descriptive naming**
```javascript
// Good - descriptive names
const fetchActiveUsers = async () => { /* ... */ };
const calculateMonthlyRevenue = (orders) => { /* ... */ };
const isUserEmailVerified = (user) => user.emailVerified;

// Good - consistent patterns
const userService = {
  create: createUser,
  read: getUserById,
  update: updateUser,
  delete: deleteUser
};

// Good - boolean naming
const hasPermission = checkUserPermission(user, 'admin');
const isLoading = !data && !error;
const canEdit = user.role === 'admin' || user.id === resource.ownerId;
```

## Performance Considerations

### Efficient Data Operations

**✅ Optimize common patterns**
```javascript
// Good - early returns
const findUserByEmail = (users, email) => {
  return users.find(user => user.email === email) ?? null;
};

// Good - memoization for expensive calculations
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

const expensiveCalculation = memoize((data) => {
  return data.reduce((acc, item) => acc + item.value ** 2, 0);
});

// Good - batch operations
const updateMultipleUsers = async (userUpdates) => {
  const updates = userUpdates.map(({ id, data }) => 
    db.user.update({
      where: { id },
      data
    })
  );
  
  return Promise.all(updates);
};
```

---

:::tip Code Quality Tools
Use ESLint, Prettier, and TypeScript compiler settings to enforce these standards automatically across your codebase.
:::

:::warning Common Pitfalls
- Mutating arrays/objects in place
- Using `let` when `const` would work
- Default exports making imports unclear
- Functions with side effects
- Implicit type coercion
:::