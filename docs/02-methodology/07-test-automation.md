# Test Automation

Test automation is a cornerstone of The One X Methodology, ensuring code reliability, facilitating refactoring, and serving as living documentation. Our testing approach emphasizes comprehensive coverage, clear test structure, and maintainable test suites.

## Testing Philosophy

### Test-Driven Development (TDD)
We advocate for a test-first approach where possible:
1. **Red**: Write a failing test
2. **Green**: Write minimal code to make it pass
3. **Refactor**: Improve code while keeping tests green

### Testing Pyramid
Our testing strategy follows the testing pyramid:
- **70% Unit Tests**: Fast, isolated, comprehensive
- **20% Integration Tests**: API and component integration
- **10% End-to-End Tests**: Critical user journeys

### Quality Over Quantity
Focus on meaningful tests that provide confidence rather than chasing coverage metrics alone.

## Test Structure Standards

### AAA Pattern (Arrange, Act, Assert)

**✅ Structure every test with clear sections**
```javascript
describe('UserService', () => {
  describe('createUser', () => {
    it('should create a user with valid data', async () => {
      // Arrange
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user'
      };
      const mockDb = {
        user: {
          create: jest.fn().mockResolvedValue({
            id: '123',
            ...userData,
            createdAt: new Date()
          })
        }
      };

      // Act
      const result = await createUser(userData, mockDb);

      // Assert
      expect(result).toEqual({
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        createdAt: expect.any(Date)
      });
      expect(mockDb.user.create).toHaveBeenCalledWith({
        data: userData
      });
    });
  });
});
```

### Test Naming Conventions

**✅ Descriptive test names**
```javascript
// Good - describes behavior, not implementation
describe('User validation', () => {
  it('should reject empty email addresses', () => {});
  it('should accept valid email formats', () => {});
  it('should normalize email to lowercase', () => {});
  
  it('should throw ValidationError when name is missing', () => {});
  it('should throw ValidationError when email is invalid', () => {});
});

// Good - follows "should [expected behavior] when [condition]" pattern
describe('calculateDiscount', () => {
  it('should return 0 when no items in cart', () => {});
  it('should return 10% when cart total exceeds $100', () => {});
  it('should return 15% when user has premium membership', () => {});
});
```

## Testing Framework Standards

### Jest Configuration

**✅ Recommended Jest setup**
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node', // or 'jsdom' for frontend
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.js'],
  testMatch: [
    '**/__tests__/**/*.(test|spec).js',
    '**/*.(test|spec).js'
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/test-utils/**/*'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};

// src/test-setup.js
import '@testing-library/jest-dom';

// Global test utilities
global.mockConsoleError = () => {
  const spy = jest.spyOn(console, 'error');
  spy.mockImplementation(() => {});
  return spy;
};
```

### Vitest for Modern Projects

**✅ Vitest configuration for Vite projects**
```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

## React Component Testing

### Testing Library Approach

**✅ User-centric testing with React Testing Library**
```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  const defaultProps = {
    user: {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user'
    },
    onUpdate: jest.fn()
  };

  it('should display user information', () => {
    render(<UserProfile {...defaultProps} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('user')).toBeInTheDocument();
  });

  it('should call onUpdate when save button is clicked', async () => {
    const user = userEvent.setup();
    const onUpdate = jest.fn();
    
    render(<UserProfile {...defaultProps} onUpdate={onUpdate} />);
    
    // Arrange - find and interact with form elements
    const nameInput = screen.getByLabelText(/name/i);
    const saveButton = screen.getByRole('button', { name: /save/i });
    
    // Act - simulate user interaction
    await user.clear(nameInput);
    await user.type(nameInput, 'Jane Doe');
    await user.click(saveButton);
    
    // Assert - verify the callback was called
    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith({
        ...defaultProps.user,
        name: 'Jane Doe'
      });
    });
  });

  it('should show loading state while saving', async () => {
    const user = userEvent.setup();
    const onUpdate = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(<UserProfile {...defaultProps} onUpdate={onUpdate} />);
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    await user.click(saveButton);
    
    expect(screen.getByText(/saving/i)).toBeInTheDocument();
    expect(saveButton).toBeDisabled();
  });
});
```

### Custom Render Function

**✅ Create test utilities for consistent setup**
```javascript
// src/test-utils/render.js
import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';

const createWrapper = ({ initialEntries = ['/'] } = {}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          {children}
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export const render = (ui, options = {}) => {
  const { wrapper, ...renderOptions } = options;
  const Wrapper = wrapper || createWrapper(options);
  
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { render };
```

## API and Service Testing

### Testing Async Functions

**✅ Proper async/await testing**
```javascript
describe('UserAPI', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should fetch user by id successfully', async () => {
    // Arrange
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com'
    };
    
    fetch.mockResponseOnce(JSON.stringify(mockUser));

    // Act
    const result = await fetchUser('1');

    // Assert
    expect(result).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith('/api/users/1', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });

  it('should handle API errors gracefully', async () => {
    // Arrange
    fetch.mockRejectOnce(new Error('Network error'));

    // Act & Assert
    await expect(fetchUser('1')).rejects.toThrow('Network error');
  });

  it('should handle HTTP error responses', async () => {
    // Arrange
    fetch.mockResponseOnce('User not found', { status: 404 });

    // Act & Assert
    await expect(fetchUser('999')).rejects.toThrow('HTTP 404');
  });
});
```

### Database Testing with Test Containers

**✅ Integration testing with real database**
```javascript
import { GenericContainer } from 'testcontainers';
import { Client } from 'pg';

describe('UserRepository Integration Tests', () => {
  let container;
  let db;

  beforeAll(async () => {
    // Start PostgreSQL container
    container = await new GenericContainer('postgres:15')
      .withEnvironment({
        POSTGRES_USER: 'test',
        POSTGRES_PASSWORD: 'test',
        POSTGRES_DB: 'testdb'
      })
      .withExposedPorts(5432)
      .start();

    // Connect to test database
    const port = container.getMappedPort(5432);
    db = new Client({
      host: 'localhost',
      port,
      user: 'test',
      password: 'test',
      database: 'testdb'
    });
    
    await db.connect();
    await runMigrations(db);
  });

  afterAll(async () => {
    await db.end();
    await container.stop();
  });

  beforeEach(async () => {
    // Clean database between tests
    await db.query('TRUNCATE users CASCADE');
  });

  it('should create and retrieve user', async () => {
    // Arrange
    const userData = {
      name: 'John Doe',
      email: 'john@example.com'
    };

    // Act
    const createdUser = await userRepository.create(userData);
    const retrievedUser = await userRepository.findById(createdUser.id);

    // Assert
    expect(retrievedUser).toEqual({
      id: createdUser.id,
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: expect.any(Date)
    });
  });
});
```

## Mocking Strategies

### Module Mocking

**✅ Mock external dependencies effectively**
```javascript
// Mock entire module
jest.mock('@/lib/database', () => ({
  db: {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
  }
}));

// Partial module mocking
jest.mock('@/lib/email', () => ({
  ...jest.requireActual('@/lib/email'),
  sendWelcomeEmail: jest.fn().mockResolvedValue({ success: true })
}));

// Mock with factory function
jest.mock('@/lib/logger', () => {
  return {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  };
});
```

### Function Mocking Patterns

**✅ Mock functions with different behaviors**
```javascript
describe('UserService with mocked dependencies', () => {
  let mockDb;
  let mockEmailService;

  beforeEach(() => {
    mockDb = {
      user: {
        create: jest.fn(),
        findUnique: jest.fn()
      }
    };
    
    mockEmailService = {
      sendWelcomeEmail: jest.fn()
    };
  });

  it('should handle database errors during user creation', async () => {
    // Arrange - mock database to throw error
    mockDb.user.create.mockRejectedValue(new Error('Database connection failed'));

    // Act & Assert
    await expect(
      createUser({ name: 'John', email: 'john@example.com' }, mockDb)
    ).rejects.toThrow('Database connection failed');
    
    // Verify email was not sent when database fails
    expect(mockEmailService.sendWelcomeEmail).not.toHaveBeenCalled();
  });

  it('should continue when email sending fails', async () => {
    // Arrange
    const userData = { name: 'John', email: 'john@example.com' };
    const createdUser = { id: '1', ...userData, createdAt: new Date() };
    
    mockDb.user.create.mockResolvedValue(createdUser);
    mockEmailService.sendWelcomeEmail.mockRejectedValue(new Error('Email service down'));

    // Act
    const result = await createUser(userData, mockDb, mockEmailService);

    // Assert - user creation should succeed even if email fails
    expect(result).toEqual(createdUser);
    expect(mockDb.user.create).toHaveBeenCalledWith({ data: userData });
  });
});
```

## Test Data Management

### Factory Functions

**✅ Create reusable test data factories**
```javascript
// test-utils/factories.js
export const createUser = (overrides = {}) => ({
  id: Math.random().toString(36),
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
  isActive: true,
  createdAt: new Date(),
  ...overrides
});

export const createProduct = (overrides = {}) => ({
  id: Math.random().toString(36),
  name: 'Sample Product',
  price: 99.99,
  category: 'electronics',
  inStock: true,
  ...overrides
});

// Usage in tests
describe('Order calculations', () => {
  it('should calculate total with tax', () => {
    // Arrange
    const user = createUser({ role: 'premium' });
    const products = [
      createProduct({ price: 100 }),
      createProduct({ price: 50 })
    ];

    // Act
    const total = calculateOrderTotal(user, products);

    // Assert - premium users get 10% discount, plus 8% tax
    expect(total).toBe(162); // (150 * 0.9) * 1.08
  });
});
```

### Builder Pattern for Complex Objects

**✅ Use builders for complex test scenarios**
```javascript
// test-utils/UserBuilder.js
export class UserBuilder {
  constructor() {
    this.user = {
      id: Math.random().toString(36),
      name: 'Default User',
      email: 'user@example.com',
      role: 'user',
      preferences: {
        theme: 'light',
        notifications: true
      },
      createdAt: new Date()
    };
  }

  withName(name) {
    this.user.name = name;
    return this;
  }

  withEmail(email) {
    this.user.email = email;
    return this;
  }

  withRole(role) {
    this.user.role = role;
    return this;
  }

  withPreferences(preferences) {
    this.user.preferences = { ...this.user.preferences, ...preferences };
    return this;
  }

  asAdmin() {
    return this.withRole('admin');
  }

  asPremium() {
    return this.withRole('premium');
  }

  build() {
    return { ...this.user };
  }
}

// Usage in tests
describe('User permissions', () => {
  it('should allow admin users to delete posts', () => {
    // Arrange
    const adminUser = new UserBuilder()
      .withName('Admin User')
      .asAdmin()
      .build();

    // Act
    const canDelete = checkPermission(adminUser, 'post:delete');

    // Assert
    expect(canDelete).toBe(true);
  });
});
```

## Coverage and Quality Metrics

### Coverage Thresholds

**✅ Set meaningful coverage targets**
```javascript
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 85,
      statements: 85
    },
    './src/components/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    },
    './src/utils/': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    }
  }
};
```

### Quality over Coverage

**✅ Focus on meaningful test scenarios**
```javascript
// Good - tests important business logic
describe('PricingCalculator', () => {
  it('should apply bulk discount when quantity exceeds threshold', () => {
    const result = calculatePrice(101, 10.00); // 101 items at $10 each
    expect(result).toBe(909); // 10% bulk discount applied
  });

  it('should not apply bulk discount below threshold', () => {
    const result = calculatePrice(99, 10.00);
    expect(result).toBe(990); // No discount
  });

  it('should handle edge case at exact threshold', () => {
    const result = calculatePrice(100, 10.00);
    expect(result).toBe(900); // Discount starts at exactly 100
  });
});

// Avoid - testing implementation details
describe('PricingCalculator', () => {
  it('should call getBulkDiscount function', () => {
    // Bad - tests implementation, not behavior
    const spy = jest.spyOn(calculator, 'getBulkDiscount');
    calculatePrice(101, 10.00);
    expect(spy).toHaveBeenCalled();
  });
});
```

## Performance Testing

### Testing Async Performance

**✅ Test performance characteristics**
```javascript
describe('DataProcessor performance', () => {
  it('should process large datasets within time limit', async () => {
    // Arrange
    const largeDataset = Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      value: Math.random() * 1000
    }));

    // Act
    const startTime = Date.now();
    const result = await processData(largeDataset);
    const endTime = Date.now();

    // Assert
    expect(result).toHaveLength(10000);
    expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
  });

  it('should handle concurrent processing efficiently', async () => {
    // Arrange
    const datasets = Array.from({ length: 5 }, () => 
      Array.from({ length: 1000 }, (_, i) => ({ id: i, value: i }))
    );

    // Act
    const startTime = Date.now();
    const results = await Promise.all(
      datasets.map(dataset => processData(dataset))
    );
    const endTime = Date.now();

    // Assert
    expect(results).toHaveLength(5);
    results.forEach(result => expect(result).toHaveLength(1000));
    expect(endTime - startTime).toBeLessThan(2000); // Concurrent processing should be faster
  });
});
```

## Debugging Tests

### Test Debugging Strategies

**✅ Debug failing tests effectively**
```javascript
describe('Complex user workflow', () => {
  it('should complete user registration flow', async () => {
    // Use screen.debug() to see current DOM state
    render(<RegistrationForm />);
    
    // Debug point 1 - initial state
    screen.debug(); // Prints current DOM
    
    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.type(emailInput, 'test@example.com');
    
    // Debug point 2 - after email input
    screen.debug(emailInput); // Prints specific element
    
    const submitButton = screen.getByRole('button', { name: /register/i });
    await userEvent.click(submitButton);
    
    // Wait for async operations with detailed error messages
    await waitFor(() => {
      expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
    }, {
      timeout: 5000,
      onTimeout: (error) => {
        console.log('Current DOM state:', screen.debug());
        return error;
      }
    });
  });
});

// Debug with custom queries
const debug = {
  logProps: (component) => {
    console.log('Component props:', component.props);
  },
  logState: (component) => {
    console.log('Component state:', component.state);
  },
  findByTestId: (testId) => {
    const element = screen.queryByTestId(testId);
    console.log(`Element with testId "${testId}":`, element);
    return element;
  }
};
```

---

:::tip Testing Best Practices Summary
- Write tests first when possible (TDD)
- Use descriptive test names that explain behavior
- Follow AAA pattern for clear test structure
- Mock external dependencies, not internal logic
- Focus on testing behavior, not implementation
- Maintain tests as carefully as production code
:::

:::warning Common Testing Pitfalls
- Testing implementation details instead of behavior
- Over-mocking internal functions
- Writing tests that don't fail when they should
- Ignoring async operations in tests
- Not cleaning up between tests
- Chasing 100% coverage instead of meaningful tests
:::