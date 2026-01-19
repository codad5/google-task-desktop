/**
 * Task List Repository Implementation
 * 
 * Handles all API calls related to task lists.
 */

import { GoogleTasksClient, GOOGLE_TASKS_API } from "../api";
import { GoogleTaskList, GoogleTaskListsResponse, TaskListRequestBody } from "../types/google-tasks";
import { ITaskListRepository } from "./interfaces";

export class TaskListRepository implements ITaskListRepository {
  constructor(private client: GoogleTasksClient) {}

  /**
   * Get all task lists
   */
  async getAll(): Promise<GoogleTaskList[]> {
    const response = await this.client.get<GoogleTaskListsResponse>(
      GOOGLE_TASKS_API.TASK_LISTS.list()
    );
    return response.items || [];
  }

  /**
   * Get a specific task list by ID
   */
  async getById(id: string): Promise<GoogleTaskList> {
    return this.client.get<GoogleTaskList>(
      GOOGLE_TASKS_API.TASK_LISTS.get(id)
    );
  }

  /**
   * Create a new task list
   */
  async create(data: TaskListRequestBody): Promise<GoogleTaskList> {
    return this.client.post<GoogleTaskList>(
      GOOGLE_TASKS_API.TASK_LISTS.insert(),
      data
    );
  }

  /**
   * Update a task list
   * Note: Google Tasks API requires id in the request body for PUT
   */
  async update(id: string, data: TaskListRequestBody): Promise<GoogleTaskList> {
    return this.client.put<GoogleTaskList>(
      GOOGLE_TASKS_API.TASK_LISTS.update(id),
      { ...data, id }  // Include id in body
    );
  }

  /**
   * Delete a task list
   */
  async delete(id: string): Promise<void> {
    await this.client.delete(GOOGLE_TASKS_API.TASK_LISTS.delete(id));
  }
}
