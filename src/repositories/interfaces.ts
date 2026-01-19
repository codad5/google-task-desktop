/**
 * Repository Interfaces
 * 
 * These define the contract for data access.
 * Implementations can be swapped for online/offline support.
 */

import {
  GoogleTaskList,
  GoogleTask,
  ListTasksParams,
  InsertTaskParams,
  MoveTaskParams,
  TaskRequestBody,
  TaskListRequestBody,
} from "../types/google-tasks";

// =============================================================================
// Task List Repository Interface
// =============================================================================

export interface ITaskListRepository {
  /**
   * Get all task lists
   */
  getAll(): Promise<GoogleTaskList[]>;

  /**
   * Get a specific task list by ID
   */
  getById(id: string): Promise<GoogleTaskList>;

  /**
   * Create a new task list
   */
  create(data: TaskListRequestBody): Promise<GoogleTaskList>;

  /**
   * Update a task list
   */
  update(id: string, data: TaskListRequestBody): Promise<GoogleTaskList>;

  /**
   * Delete a task list
   */
  delete(id: string): Promise<void>;
}

// =============================================================================
// Task Repository Interface
// =============================================================================

export interface ITaskRepository {
  /**
   * Get all tasks in a task list
   */
  getAll(listId: string, params?: ListTasksParams): Promise<GoogleTask[]>;

  /**
   * Get a specific task
   */
  getById(listId: string, taskId: string): Promise<GoogleTask>;

  /**
   * Create a new task
   */
  create(
    listId: string,
    data: TaskRequestBody,
    params?: InsertTaskParams
  ): Promise<GoogleTask>;

  /**
   * Update a task
   */
  update(
    listId: string,
    taskId: string,
    data: Partial<TaskRequestBody>
  ): Promise<GoogleTask>;

  /**
   * Delete a task
   */
  delete(listId: string, taskId: string): Promise<void>;

  /**
   * Move a task to a new position or list
   */
  move(listId: string, taskId: string, params: MoveTaskParams): Promise<GoogleTask>;

  /**
   * Clear all completed tasks in a list
   */
  clearCompleted(listId: string): Promise<void>;
}

// =============================================================================
// Starred Tasks Repository Interface (Local Storage)
// =============================================================================

export interface IStarredRepository {
  /**
   * Get all starred task IDs
   */
  getAll(): Promise<Set<string>>;

  /**
   * Check if a task is starred
   */
  isStarred(taskId: string): Promise<boolean>;

  /**
   * Star a task
   */
  star(taskId: string): Promise<void>;

  /**
   * Unstar a task
   */
  unstar(taskId: string): Promise<void>;

  /**
   * Toggle star status
   */
  toggle(taskId: string): Promise<boolean>;
}

// =============================================================================
// Combined Repository for convenience
// =============================================================================

export interface ITasksRepository {
  taskLists: ITaskListRepository;
  tasks: ITaskRepository;
  starred: IStarredRepository;
}
