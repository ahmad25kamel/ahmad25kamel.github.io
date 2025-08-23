# Testing Guide

This project uses **Vitest + Vue Test Utils** for unit testing with TypeScript support.

## Test Structure

Tests are organized under `tests/unit/` following the `src/` directory structure:

```
tests/unit/
├── components/     # Component tests
│   ├── AppFooter.spec.ts
│   ├── AppHeader.spec.ts
│   ├── SupportButton.spec.ts
│   └── ToolCard.spec.ts
├── views/         # View component tests
│   ├── Home.spec.ts
│   └── QRTools.spec.ts
└── utils/         # Utility function tests
    └── helpers.spec.ts
```

## Coverage Requirements

The project enforces the following coverage thresholds:
- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

## Available Scripts

```bash
# Run tests once
npm run test:run

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Test Requirements

**Every change, feature, or bugfix must include or update test cases.**

Before committing changes, ensure tests pass and coverage thresholds are met:

```bash
npm run test:coverage
```

## Writing Tests

### Component Test Example

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '@/components/Button.vue'

describe('Button.vue', () => {
  it('renders slot text', () => {
    const wrapper = mount(Button, { 
      slots: { default: 'Click me' } 
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('emits click event', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
```

### Utility Function Test Example

```typescript
import { describe, it, expect } from 'vitest'
import { add } from '@/utils/math'

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(2, 3)).toBe(5)
  })
})
```

## Configuration

- **Vitest Config**: `vitest.config.ts`
- **TypeScript Config**: `tsconfig.json`
- **Test Environment**: jsdom (for DOM testing)
- **Coverage Provider**: v8

## Best Practices

1. **Test file naming**: Use `.spec.ts` suffix
2. **Mock external dependencies**: Use Vitest's `vi.mock()`
3. **Test user interactions**: Use `await wrapper.trigger()` for events
4. **Stub child components**: Use `stubs` for complex child components
5. **Focus on behavior**: Test what the component does, not how it does it

## Troubleshooting

### Component Dependencies

If a component has complex dependencies, stub them:

```typescript
const wrapper = mount(MyComponent, {
  global: {
    stubs: {
      ChildComponent: { template: '<div>Child</div>' }
    }
  }
})
```

### Router Dependencies

For components using Vue Router:

```typescript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div>Home</div>' } }]
})

const wrapper = mount(Component, {
  global: { plugins: [router] }
})
```

## Current Test Coverage

Run `npm run test:coverage` to see current coverage levels and identify areas needing more tests.