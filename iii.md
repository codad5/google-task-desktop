Major Refactoring Plan: Google Tasks Desktop v2.0
Executive Summary
This document outlines a comprehensive refactoring of the Google Tasks Desktop application to:

Fix existing bugs (drag-drop, task loading)
Add missing features (starring, task options, move between lists)
Redesign architecture for scalability and future offline support
Improve code organization and type safety
Current Architecture Analysis
What We Have
src/
├── components/           # React components (mixed concerns)
├── config/states.ts      # Recoil atoms/selectors (bloated, tightly coupled)
├── helpers/
│   ├── task.ts          # Task class with caching + API calls (God object)
│   ├── googleapihelper.ts # Generic API wrapper
│   └── ...
└── types/taskapi.ts     # Basic types (incomplete, don't match Google API)
Problems with Current Design
Issue	Impact	Solution
Task
 class is a "God Object"	Hard to test, maintain, extend	Split into Service + Repository layers
Types don't match Google API	API responses need manual mapping	Create proper TypeScript interfaces from API docs
Recoil state is tightly coupled	Components can't be reused	Create service layer abstraction
No separation of concerns	Business logic in components	Move to dedicated services
No optimistic updates	UI feels sluggish	Implement optimistic UI pattern
Cache invalidation is manual	Data gets stale	Implement proper cache strategy
Proposed Architecture
Why This Architecture?
Service Layer Pattern is used because:

Testability: Services can be unit tested without React
Reusability: Same service works for online/offline
Separation of Concerns: UI doesn't care about data source
Offline-Ready: Just swap the repository implementation later
┌─────────────────────────────────────────────────────────┐
│                     React Components                     │
│  (UI only - no business logic, no API calls)            │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    React Hooks Layer                     │
│  useTaskLists(), useTasks(), useStarredTasks()          │
│  (Connects services to React, manages loading states)   │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                     Service Layer                        │
│  TaskListService, TaskService, StarredService           │
│  (Business logic, validation, orchestration)            │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    Repository Layer                      │
│  GoogleTasksRepository (implements ITaskRepository)      │
│  (API calls, data mapping, caching)                     │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                      API Client                          │
│  GoogleApiClient (Axios wrapper with auth)              │
└─────────────────────────────────────────────────────────┘
Future Offline Support (Architecture Preparation)
┌─────────────────────────────────────────────────────────┐
│                    Repository Layer                      │
├─────────────────────────────────────────────────────────┤
│  ┌───────────────┐    ┌───────────────────────────┐     │
│  │ GoogleTasks   │    │ LocalStorage              │     │
│  │ Repository    │    │ Repository                │     │
│  │ (Online)      │    │ (Offline - Future)        │     │
│  └───────┬───────┘    └───────────┬───────────────┘     │
│          │                        │                      │
│          └────────┬───────────────┘                      │
│                   ▼                                      │
│          SyncManager (Future)                           │
│          - Queue offline operations                     │
│          - Sync when online                             │
│          - Conflict resolution                          │
└─────────────────────────────────────────────────────────┘
New File Structure
src/
├── api/
│   ├── client.ts                 # API client with auth
│   └── endpoints.ts              # API endpoint constants
│
├── types/
│   ├── google-tasks.ts           # Types matching Google API exactly
│   ├── app.ts                    # App-specific types
│   └── index.ts
│
├── repositories/
│   ├── interfaces.ts             # Repository interfaces
│   ├── task-list.repository.ts   # TaskList API calls
│   └── task.repository.ts        # Task API calls
│
├── services/
│   ├── task-list.service.ts      # TaskList business logic
│   ├── task.service.ts           # Task business logic
│   └── starred.service.ts        # Starred tasks logic
│
├── hooks/
│   ├── useTaskLists.ts           # Hook for task lists
│   ├── useTasks.ts               # Hook for tasks
│   ├── useStarredTasks.ts        # Hook for starred view
│   └── useAuth.ts                # Auth hook
│
├── store/
│   ├── atoms.ts                  # Simplified Recoil atoms
│   └── selectors.ts              # Derived state
│
├── components/
│   ├── layout/                   # Layout components
│   ├── tasks/                    # Task-related components
│   └── ui/                       # Generic UI components
│
└── App.tsx
Type Definitions (Matching Google Tasks API)
// src/types/google-tasks.ts
// Google Task List (from API)
export interface GoogleTaskList {
  kind: "tasks#taskList";
  id: string;
  etag: string;
  title: string;
  updated: string;  // RFC 3339 timestamp
  selfLink: string;
}
// Google Task (from API)
export interface GoogleTask {
  kind: "tasks#task";
  id: string;
  etag: string;
  title: string;
  updated: string;
  selfLink: string;
  parent?: string;          // Parent task ID (for subtasks)
  position: string;         // Position in list
  notes?: string;           // Description
  status: "needsAction" | "completed";
  due?: string;             // RFC 3339 date
  completed?: string;       // RFC 3339 timestamp
  deleted?: boolean;
  hidden?: boolean;
  links?: Array<{
    type: string;
    description: string;
    link: string;
  }>;
}
// App-specific extensions
export interface AppTask extends GoogleTask {
  isStarred: boolean;       // Local-only property (stored separately)
  listId: string;           // Reference to parent list
}
export interface AppTaskList extends GoogleTaskList {
  tasks?: AppTask[];        // Eagerly loaded tasks
  isVisible: boolean;       // UI toggle for sidebar
}
Implementation Phases
Phase 1: Fix Critical Bugs (Immediate)
 Fix drag-and-drop not working (cursor change, actual reordering)
 Fix tasks not loading on initial render
 Add proper loading states
Phase 2: Create New Architecture Foundation
 Create new type definitions
 Create repository interfaces
 Create GoogleTasksRepository
 Create services
 Create React hooks
Phase 3: UI Enhancements
 Task item: Add star icon (hover to show, filled if starred)
 Task item: Add options menu (Move to list, Delete)
 Sidebar: Starred view (shows all starred tasks)
 Sidebar: Task list visibility toggles
 Add splash screen instead of spinner
Phase 4: Full Functionality
 Implement all task operations (CRUD, move, star)
 Implement task list operations (CRUD, reorder)
 Implement subtasks support
 Implement sorting options
Detailed Implementation: Key Components
1. Task Item Options Menu
Based on the user's reference image, each task should show:

Star icon (right side): Toggle starred status
Options menu (three dots):
Move to list → Submenu with all available lists
Delete
// TaskListItem with options
<ListItem>
  <Checkbox /> 
  <TaskContent />
  <Box className="task-actions">
    <StarIcon />      {/* Visible if starred, else on hover */}
    <OptionsMenu />   {/* Visible on hover */}
  </Box>
</ListItem>
2. Starred View
When "Starred" is clicked in sidebar:

Show a single card titled "Starred"
Display all starred tasks from ALL lists
Each task shows which list it belongs to
3. Sidebar Task List Visibility
Each task list in sidebar has:

Checkbox (toggle visibility in main view)
List name
Task count (incomplete tasks)
Why These Decisions?
1. Why Service Layer instead of just Recoil?
Recoil Problem:

// Current: Business logic in selectors = hard to test
const taskObjectSelector = selector({
  get: ({ get }) => {
    const accessToken = get(accessTokenState);
    return new Task(accessToken); // Creates object in selector!
  },
});
Service Layer Solution:

// Services are pure TypeScript classes
class TaskService {
  constructor(private repository: ITaskRepository) {}
  
  async moveTask(taskId: string, fromListId: string, toListId: string) {
    // Business logic here - easy to test!
  }
}
2. Why Repository Pattern?
Current Problem:

API calls mixed with caching and business logic in 
Task
 class
Can't switch to offline storage without rewriting everything
Repository Solution:

interface ITaskRepository {
  getTasks(listId: string): Promise<AppTask[]>;
  createTask(listId: string, task: Partial<AppTask>): Promise<AppTask>;
  // ...
}
// Online implementation
class GoogleTasksRepository implements ITaskRepository { }
// Future offline implementation
class LocalStorageRepository implements ITaskRepository { }
3. Why New Types Matching Google API?
Current Problem:

// Current types don't match API
type task = {
  id: number,  // Wrong! Google uses string
  name: string,  // Wrong! Google uses "title"
  // Missing: status, position, parent, links, etc.
}
Solution: Types that exactly match Google's API response, with app-specific extensions.

User Review Required
IMPORTANT

Please review the following before I proceed:

Does this architecture make sense for your use case?
Should I proceed with the full refactoring or incremental changes?
Any specific features to prioritize?
WARNING

Breaking Changes This refactoring will change the internal structure significantly. The UI will remain the same, but:

State management patterns will change
Helper files will be reorganized
Type definitions will be updated
Proposed Order of Work
Create types and interfaces (foundation)
Create repository and services (backend layer)
Create hooks (connect to React)
Fix drag-drop (critical bug)
Add starring functionality (new feature)
Add task options menu (new feature)
Add starred view (new feature)
Add sidebar toggles (new feature)
Add splash screen (polish)
Add subtasks support (advanced feature)
Each phase will be committed separately for easy tracking and rollback if needed.