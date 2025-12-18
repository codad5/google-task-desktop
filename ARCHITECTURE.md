# Architecture Documentation

## Why This Architecture?

This document explains the design decisions behind the new architecture.

---

## The Problem with the Old Code

### 1. God Object Anti-Pattern

The old `Task` class did everything:
- API calls
- Caching
- State management
- Business logic

```typescript
// OLD: Everything in one class
class Task {
  // Config
  accessToken?: string;
  baseUrl: string;
  
  // Cache
  private tasksCategoryList: TaskCategoryCacheManager;
  
  // API calls
  async getTaskCategories() { ... }
  async getTasksFromApi() { ... }
  
  // Business logic
  async markTask() { ... }
  async addToTask() { ... }
  
  // File operations
  async saveTasksToFile() { ... }
  async getTasksFromFile() { ... }
}
```

**Problems:**
- Can't test parts independently
- Can't swap implementations (e.g., offline storage)
- Hard to understand what depends on what
- Changes ripple through entire class

### 2. Wrong Types

```typescript
// OLD: Doesn't match Google API
type task = {
  id: number,      // Google uses string!
  name: string,    // Google uses "title"!
  description: string,
  dueDate: Date,
  completed: boolean,
}
```

**Problems:**
- Need manual mapping everywhere
- Miss API features (subtasks, position, links)
- Bugs from type mismatches

### 3. Business Logic in Recoil

```typescript
// OLD: Creating objects in selectors
const taskObjectSelector = selector({
  get: ({ get }) => {
    const accessToken = get(accessTokenState);
    return new Task(accessToken); // Side effect in selector!
  },
});
```

**Problems:**
- Hard to test
- Can't use outside React
- Tight coupling to Recoil

---

## The New Architecture

### Layer Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    React Components                      │
│            (UI only - knows nothing about APIs)          │
└────────────────────────┬────────────────────────────────┘
                         │ uses
                         ▼
┌─────────────────────────────────────────────────────────┐
│                      React Hooks                         │
│             (useTaskLists, useTasks, etc.)              │
│         Connect services to React, manage loading        │
└────────────────────────┬────────────────────────────────┘
                         │ uses
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    Service Layer                         │
│            (TaskListService, TaskService)               │
│     Business logic, validation, caching, orchestration   │
└────────────────────────┬────────────────────────────────┘
                         │ uses
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  Repository Layer                        │
│    (TaskListRepository, TaskRepository, StarredRepo)    │
│              Data access - API calls only                │
└────────────────────────┬────────────────────────────────┘
                         │ uses
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    API Client                            │
│              (GoogleTasksClient)                         │
│         HTTP requests, auth, error handling              │
└─────────────────────────────────────────────────────────┘
```

### Why Layers?

**1. Separation of Concerns**
- Each layer has ONE responsibility
- Changes in one layer don't affect others
- Easier to understand and debug

**2. Testability**
- Can test services without React
- Can mock repositories for unit tests
- Can test components with mock hooks

**3. Flexibility**
- Swap API client (e.g., add offline support)
- Swap repository (local storage vs API)
- Swap state management (Recoil → Zustand)

---

## Key Patterns Explained

### Repository Pattern

**What:** Abstract data access behind an interface.

```typescript
// Interface defines the contract
interface ITaskRepository {
  getAll(listId: string): Promise<GoogleTask[]>;
  create(listId: string, data: TaskRequestBody): Promise<GoogleTask>;
  delete(listId: string, taskId: string): Promise<void>;
}

// Implementation handles the details
class TaskRepository implements ITaskRepository {
  constructor(private client: GoogleTasksClient) {}
  
  async getAll(listId: string) {
    return this.client.get(`/lists/${listId}/tasks`);
  }
}
```

**Why:**
- Components don't know WHERE data comes from
- Can swap implementations (API → local storage)
- Easy to mock for testing

### Service Layer Pattern

**What:** Business logic in pure TypeScript classes.

```typescript
class TaskService {
  constructor(
    private taskRepo: ITaskRepository,
    private starredRepo: IStarredRepository
  ) {}
  
  async moveToList(fromListId: string, taskId: string, toListId: string) {
    // Validation
    if (fromListId === toListId) return;
    
    // Business logic
    const task = await this.taskRepo.move(fromListId, taskId, { 
      destinationTasklist: toListId 
    });
    
    return task;
  }
}
```

**Why:**
- Logic is reusable (not tied to React)
- Easy to test (just functions)
- Single place for business rules

### Optimistic Updates

**What:** Update UI immediately, sync with server in background.

```typescript
// In useTasks hook
const toggleTaskStar = async (taskId: string) => {
  // 1. Update UI immediately
  const wasStarred = starredIds.has(taskId);
  updateTaskInState(taskId, { isStarred: !wasStarred });
  
  try {
    // 2. Sync with server
    await service.toggleStar(taskId);
  } catch {
    // 3. Revert if failed
    updateTaskInState(taskId, { isStarred: wasStarred });
    showError("Failed to star task");
  }
};
```

**Why:**
- UI feels instant
- No waiting for network
- Better user experience

---

## Offline Support (Future)

The architecture is ready for offline support:

```typescript
// Current: Online only
class TaskRepository implements ITaskRepository {
  async getAll() {
    return this.client.get('/tasks');
  }
}

// Future: Offline first
class OfflineTaskRepository implements ITaskRepository {
  async getAll() {
    // 1. Return cached data immediately
    const cached = await this.localStorage.get('tasks');
    
    // 2. Sync in background
    this.syncManager.queue('getTasks');
    
    return cached;
  }
}
```

Because we use interfaces, swapping is easy:

```typescript
// Just change which implementation is used
const taskRepo = isOnline 
  ? new TaskRepository(client)
  : new OfflineTaskRepository(storage);
```

---

## File Structure

```
src/
├── api/
│   ├── client.ts         # HTTP client with auth
│   └── endpoints.ts      # API URL definitions
│
├── types/
│   ├── google-tasks.ts   # Types matching Google API
│   └── app.ts            # App-specific extensions
│
├── repositories/
│   ├── interfaces.ts     # Contracts (for swapping)
│   ├── task-list.repository.ts
│   ├── task.repository.ts
│   └── starred.repository.ts
│
├── services/
│   ├── task-list.service.ts  # Business logic
│   └── task.service.ts
│
├── hooks/
│   ├── useServices.ts    # Service provider
│   ├── useTaskLists.ts   # Task lists state
│   └── useTasks.ts       # Tasks state
│
├── store/
│   └── atoms.ts          # Minimal Recoil state
│
└── components/           # React UI
```

---

## Summary

| Old Problem | New Solution | Benefit |
|-------------|--------------|---------|
| God Object | Layered architecture | Single responsibility |
| Wrong types | Google API types | Accurate, complete |
| Logic in selectors | Service layer | Testable, reusable |
| Tight coupling | Interfaces | Swappable implementations |
| No offline | Repository pattern | Ready for offline |

The key insight: **Separate WHAT from HOW**.

- **WHAT** = Interfaces define what operations exist
- **HOW** = Implementations handle the details

This makes the code:
- Easier to understand
- Easier to test  
- Easier to change
- Ready for future features
