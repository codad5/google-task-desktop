/**
 * Task Service
 * 
 * Business logic for task operations.
 */

import { GoogleTask, TaskRequestBody, MoveTaskParams } from "../types/google-tasks";
import { AppTask, CreateTaskInput, UpdateTaskInput } from "../types/app";
import { ITaskRepository, IStarredRepository } from "../repositories/interfaces";

export class TaskService {
  constructor(
    private taskRepo: ITaskRepository,
    private starredRepo: IStarredRepository
  ) {}

  /**
   * Get all tasks for a list
   */
  async getTasksForList(listId: string): Promise<AppTask[]> {
    const tasks = await this.taskRepo.getAll(listId);
    const starredIds = await this.starredRepo.getAll();

    return tasks.map(task => ({
      ...task,
      isStarred: starredIds.has(task.id),
      listId,
    }));
  }

  /**
   * Get a single task
   */
  async getTask(listId: string, taskId: string): Promise<AppTask> {
    const task = await this.taskRepo.getById(listId, taskId);
    const isStarred = await this.starredRepo.isStarred(taskId);

    return {
      ...task,
      isStarred,
      listId,
    };
  }

  /**
   * Create a new task
   */
  async createTask(input: CreateTaskInput): Promise<AppTask> {
    const data: TaskRequestBody = {
      title: input.title,
      notes: input.notes,
      due: input.due ? input.due.toISOString() : undefined,
    };

    const params = input.parentId ? { parent: input.parentId } : undefined;
    const task = await this.taskRepo.create(input.listId, data, params);

    return {
      ...task,
      isStarred: false,
      listId: input.listId,
    };
  }

  /**
   * Update a task
   */
  async updateTask(input: UpdateTaskInput): Promise<AppTask> {
    const data: Partial<TaskRequestBody> = {};
    
    if (input.title !== undefined) data.title = input.title;
    if (input.notes !== undefined) data.notes = input.notes;
    if (input.due !== undefined) data.due = input.due.toISOString();
    if (input.status !== undefined) data.status = input.status;

    const task = await this.taskRepo.update(input.listId, input.id, data);
    const isStarred = await this.starredRepo.isStarred(task.id);

    return {
      ...task,
      isStarred,
      listId: input.listId,
    };
  }

  /**
   * Toggle task completion
   */
  async toggleComplete(listId: string, taskId: string): Promise<AppTask> {
    const task = await this.taskRepo.getById(listId, taskId);
    const newStatus = task.status === "completed" ? "needsAction" : "completed";

    const data: Partial<TaskRequestBody> = {
      status: newStatus,
      completed: newStatus === "completed" ? new Date().toISOString() : undefined,
    };

    const updated = await this.taskRepo.update(listId, taskId, data);
    const isStarred = await this.starredRepo.isStarred(taskId);

    return {
      ...updated,
      isStarred,
      listId,
    };
  }

  /**
   * Toggle task starred status
   */
  async toggleStar(listId: string, taskId: string): Promise<boolean> {
    return this.starredRepo.toggle(taskId);
  }

  /**
   * Star a task
   */
  async starTask(taskId: string): Promise<void> {
    await this.starredRepo.star(taskId);
  }

  /**
   * Unstar a task
   */
  async unstarTask(taskId: string): Promise<void> {
    await this.starredRepo.unstar(taskId);
  }

  /**
   * Delete a task
   */
  async deleteTask(listId: string, taskId: string): Promise<void> {
    await this.taskRepo.delete(listId, taskId);
    // Also remove from starred
    await this.starredRepo.unstar(taskId);
  }

  /**
   * Move task to another list
   */
  async moveToList(
    fromListId: string,
    taskId: string,
    toListId: string
  ): Promise<AppTask> {
    const params: MoveTaskParams = {
      destinationTasklist: toListId,
    };

    const task = await this.taskRepo.move(fromListId, taskId, params);
    const isStarred = await this.starredRepo.isStarred(taskId);

    return {
      ...task,
      isStarred,
      listId: toListId,
    };
  }

  /**
   * Move task within the same list (reorder)
   */
  async reorderTask(
    listId: string,
    taskId: string,
    previousTaskId?: string,
    parentTaskId?: string
  ): Promise<AppTask> {
    const params: MoveTaskParams = {
      previous: previousTaskId,
      parent: parentTaskId,
    };

    const task = await this.taskRepo.move(listId, taskId, params);
    const isStarred = await this.starredRepo.isStarred(taskId);

    return {
      ...task,
      isStarred,
      listId,
    };
  }

  /**
   * Clear all completed tasks in a list
   */
  async clearCompleted(listId: string): Promise<void> {
    await this.taskRepo.clearCompleted(listId);
  }

  /**
   * Get all starred tasks across all lists
   */
  async getStarredTasks(allTasks: AppTask[]): Promise<AppTask[]> {
    const starredIds = await this.starredRepo.getAll();
    return allTasks.filter(task => starredIds.has(task.id));
  }
}
