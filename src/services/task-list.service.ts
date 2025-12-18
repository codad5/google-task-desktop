/**
 * Task List Service
 * 
 * Business logic for task list operations.
 * Orchestrates repository calls and handles caching.
 */

import { GoogleTaskList, TaskListRequestBody } from "../types/google-tasks";
import { AppTaskList } from "../types/app";
import { ITaskListRepository, ITaskRepository, IStarredRepository } from "../repositories/interfaces";

export class TaskListService {
  private cache: Map<string, AppTaskList> = new Map();
  private listOrder: string[] = [];
  private lastFetch: Date | null = null;
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  constructor(
    private taskListRepo: ITaskListRepository,
    private taskRepo: ITaskRepository,
    private starredRepo: IStarredRepository
  ) {}

  /**
   * Check if cache is stale
   */
  private isCacheStale(): boolean {
    if (!this.lastFetch) return true;
    return Date.now() - this.lastFetch.getTime() > this.cacheTimeout;
  }

  /**
   * Get all task lists with their tasks
   */
  async getAll(forceRefresh = false): Promise<AppTaskList[]> {
    if (!forceRefresh && !this.isCacheStale() && this.cache.size > 0) {
      return this.listOrder.map(id => this.cache.get(id)!);
    }

    // Fetch task lists
    const lists = await this.taskListRepo.getAll();
    const starredIds = await this.starredRepo.getAll();

    // Fetch tasks for each list in parallel
    const listsWithTasks = await Promise.all(
      lists.map(async (list) => {
        const tasks = await this.taskRepo.getAll(list.id);
        
        // Transform to AppTaskList
        const appList: AppTaskList = {
          ...list,
          tasks: tasks.map(task => ({
            ...task,
            isStarred: starredIds.has(task.id),
            listId: list.id,
          })),
          isVisible: true,
          incompleteCount: tasks.filter(t => t.status === "needsAction").length,
        };

        return appList;
      })
    );

    // Update cache
    this.cache.clear();
    this.listOrder = [];
    for (const list of listsWithTasks) {
      this.cache.set(list.id, list);
      this.listOrder.push(list.id);
    }
    this.lastFetch = new Date();

    return listsWithTasks;
  }

  /**
   * Get a single task list by ID
   */
  async getById(id: string): Promise<AppTaskList | undefined> {
    // Check cache first
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }

    // Fetch from API
    const list = await this.taskListRepo.getById(id);
    const tasks = await this.taskRepo.getAll(id);
    const starredIds = await this.starredRepo.getAll();

    const appList: AppTaskList = {
      ...list,
      tasks: tasks.map(task => ({
        ...task,
        isStarred: starredIds.has(task.id),
        listId: list.id,
      })),
      isVisible: true,
      incompleteCount: tasks.filter(t => t.status === "needsAction").length,
    };

    this.cache.set(id, appList);
    return appList;
  }

  /**
   * Create a new task list
   */
  async create(title: string): Promise<AppTaskList> {
    const data: TaskListRequestBody = { title };
    const newList = await this.taskListRepo.create(data);

    const appList: AppTaskList = {
      ...newList,
      tasks: [],
      isVisible: true,
      incompleteCount: 0,
    };

    this.cache.set(newList.id, appList);
    this.listOrder.push(newList.id);

    return appList;
  }

  /**
   * Rename a task list
   */
  async rename(id: string, newTitle: string): Promise<AppTaskList> {
    const data: TaskListRequestBody = { title: newTitle };
    const updated = await this.taskListRepo.update(id, data);

    // Update cache
    const cached = this.cache.get(id);
    if (cached) {
      const updatedList: AppTaskList = {
        ...cached,
        ...updated,
      };
      this.cache.set(id, updatedList);
      return updatedList;
    }

    return this.getById(id) as Promise<AppTaskList>;
  }

  /**
   * Delete a task list
   */
  async delete(id: string): Promise<void> {
    await this.taskListRepo.delete(id);

    // Update cache
    this.cache.delete(id);
    this.listOrder = this.listOrder.filter(listId => listId !== id);
  }

  /**
   * Reorder task lists (local only - Google API doesn't support this)
   */
  reorderLists(fromIndex: number, toIndex: number): AppTaskList[] {
    const [removed] = this.listOrder.splice(fromIndex, 1);
    this.listOrder.splice(toIndex, 0, removed);
    return this.listOrder.map(id => this.cache.get(id)!);
  }

  /**
   * Toggle list visibility in main view
   */
  toggleVisibility(id: string): boolean {
    const list = this.cache.get(id);
    if (list) {
      list.isVisible = !list.isVisible;
      return list.isVisible;
    }
    return true;
  }

  /**
   * Get visibility status
   */
  isVisible(id: string): boolean {
    return this.cache.get(id)?.isVisible ?? true;
  }

  /**
   * Clear cache (for logout or manual refresh)
   */
  clearCache(): void {
    this.cache.clear();
    this.listOrder = [];
    this.lastFetch = null;
  }

  /**
   * Invalidate cache for a specific list
   */
  invalidateList(id: string): void {
    this.cache.delete(id);
  }

  /**
   * Update a task in the cached list
   */
  updateTaskInCache(listId: string, taskId: string, updates: Partial<{ isStarred: boolean; status: string }>): void {
    const list = this.cache.get(listId);
    if (!list) return;

    const taskIndex = list.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    list.tasks[taskIndex] = { ...list.tasks[taskIndex], ...updates };
    
    // Recompute incomplete count if status changed
    if (updates.status !== undefined) {
      list.incompleteCount = list.tasks.filter(t => t.status === "needsAction").length;
    }
  }
}
