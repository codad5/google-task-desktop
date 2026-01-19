/**
 * Task Repository Implementation
 * 
 * Handles all API calls related to tasks.
 */

import { GoogleTasksClient, GOOGLE_TASKS_API } from "../api";
import {
  GoogleTask,
  GoogleTasksResponse,
  ListTasksParams,
  InsertTaskParams,
  MoveTaskParams,
  TaskRequestBody,
} from "../types/google-tasks";
import { ITaskRepository } from "./interfaces";

export class TaskRepository implements ITaskRepository {
  constructor(private client: GoogleTasksClient) {}

  /**
   * Get all tasks in a task list
   */
  async getAll(listId: string, params?: ListTasksParams): Promise<GoogleTask[]> {
    // Default to showing completed tasks but not hidden ones
    const queryParams = {
      showCompleted: true,
      showHidden: false,
      maxResults: 100,
      ...params,
    };

    const response = await this.client.get<GoogleTasksResponse>(
      GOOGLE_TASKS_API.TASKS.list(listId),
      queryParams as Record<string, unknown>
    );
    
    return response.items || [];
  }

  /**
   * Get a specific task
   */
  async getById(listId: string, taskId: string): Promise<GoogleTask> {
    return this.client.get<GoogleTask>(
      GOOGLE_TASKS_API.TASKS.get(listId, taskId)
    );
  }

  /**
   * Create a new task
   */
  async create(
    listId: string,
    data: TaskRequestBody,
    params?: InsertTaskParams
  ): Promise<GoogleTask> {
    return this.client.post<GoogleTask>(
      GOOGLE_TASKS_API.TASKS.insert(listId),
      data,
      params as Record<string, unknown>
    );
  }

  /**
   * Update a task
   */
  async update(
    listId: string,
    taskId: string,
    data: Partial<TaskRequestBody>
  ): Promise<GoogleTask> {
    return this.client.patch<GoogleTask>(
      GOOGLE_TASKS_API.TASKS.patch(listId, taskId),
      data
    );
  }

  /**
   * Delete a task
   */
  async delete(listId: string, taskId: string): Promise<void> {
    await this.client.delete(GOOGLE_TASKS_API.TASKS.delete(listId, taskId));
  }

  /**
   * Move a task to a new position or list
   */
  async move(
    listId: string,
    taskId: string,
    params: MoveTaskParams
  ): Promise<GoogleTask> {
    return this.client.post<GoogleTask>(
      GOOGLE_TASKS_API.TASKS.move(listId, taskId),
      undefined,
      params as Record<string, unknown>
    );
  }

  /**
   * Clear all completed tasks in a list
   */
  async clearCompleted(listId: string): Promise<void> {
    await this.client.post(GOOGLE_TASKS_API.TASKS.clear(listId));
  }
}
