/**
 * API Endpoints for Google Tasks
 */

export const GOOGLE_TASKS_API = {
  BASE_URL: "https://tasks.googleapis.com/tasks/v1",
  
  // Task Lists endpoints
  TASK_LISTS: {
    /** GET - List all task lists */
    list: () => "/users/@me/lists",
    /** GET - Get a specific task list */
    get: (tasklistId: string) => `/users/@me/lists/${tasklistId}`,
    /** POST - Create a new task list */
    insert: () => "/users/@me/lists",
    /** PUT - Update a task list */
    update: (tasklistId: string) => `/users/@me/lists/${tasklistId}`,
    /** PATCH - Partial update a task list */
    patch: (tasklistId: string) => `/users/@me/lists/${tasklistId}`,
    /** DELETE - Delete a task list */
    delete: (tasklistId: string) => `/users/@me/lists/${tasklistId}`,
  },
  
  // Tasks endpoints
  TASKS: {
    /** GET - List all tasks in a list */
    list: (tasklistId: string) => `/lists/${tasklistId}/tasks`,
    /** GET - Get a specific task */
    get: (tasklistId: string, taskId: string) => 
      `/lists/${tasklistId}/tasks/${taskId}`,
    /** POST - Create a new task */
    insert: (tasklistId: string) => `/lists/${tasklistId}/tasks`,
    /** PUT - Update a task */
    update: (tasklistId: string, taskId: string) => 
      `/lists/${tasklistId}/tasks/${taskId}`,
    /** PATCH - Partial update a task */
    patch: (tasklistId: string, taskId: string) => 
      `/lists/${tasklistId}/tasks/${taskId}`,
    /** DELETE - Delete a task */
    delete: (tasklistId: string, taskId: string) => 
      `/lists/${tasklistId}/tasks/${taskId}`,
    /** POST - Move a task */
    move: (tasklistId: string, taskId: string) => 
      `/lists/${tasklistId}/tasks/${taskId}/move`,
    /** POST - Clear completed tasks */
    clear: (tasklistId: string) => `/lists/${tasklistId}/clear`,
  },
} as const;
