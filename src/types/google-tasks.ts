/**
 * Google Tasks API Type Definitions
 * 
 * These types exactly match the Google Tasks API responses.
 * Reference: https://developers.google.com/tasks/reference/rest
 */

// =============================================================================
// Task Lists
// =============================================================================

/**
 * A task list resource from Google Tasks API
 * @see https://developers.google.com/tasks/reference/rest/v1/tasklists#resource:-tasklist
 */
export interface GoogleTaskList {
  /** Type of the resource. Always "tasks#taskList" */
  kind: "tasks#taskList";
  /** Task list identifier */
  id: string;
  /** ETag of the resource */
  etag: string;
  /** Title of the task list. Maximum length: 1024 characters */
  title: string;
  /** Last modification time (RFC 3339 timestamp) */
  updated: string;
  /** URL pointing to this task list */
  selfLink: string;
}

/**
 * Response from listing task lists
 */
export interface GoogleTaskListsResponse {
  kind: "tasks#taskLists";
  etag: string;
  nextPageToken?: string;
  items: GoogleTaskList[];
}

// =============================================================================
// Tasks
// =============================================================================

/**
 * Task status in Google Tasks API
 */
export type GoogleTaskStatus = "needsAction" | "completed";

/**
 * A link attached to a task
 */
export interface GoogleTaskLink {
  /** Type of the link (e.g., "email") */
  type: string;
  /** Description of the link */
  description: string;
  /** The URL */
  link: string;
}

/**
 * Assignment info for tasks created from Docs/Chat
 */
export interface GoogleTaskAssignmentInfo {
  /** Link to the assignment surface (Docs, Chat) */
  linkToTask: string;
  /** Type of surface: DOC, SPACE */
  surfaceType: "DOC" | "SPACE" | string;
  /** ID of the Drive file */
  driveResourceId?: string;
  /** ID of the Chat space message */
  spaceMessageId?: string;
}

/**
 * A task resource from Google Tasks API
 * @see https://developers.google.com/tasks/reference/rest/v1/tasks#resource:-task
 */
export interface GoogleTask {
  /** Type of the resource. Always "tasks#task" */
  kind: "tasks#task";
  /** Task identifier */
  id: string;
  /** ETag of the resource */
  etag: string;
  /** Title of the task. Maximum length: 1024 characters */
  title: string;
  /** Last modification time (RFC 3339 timestamp) */
  updated: string;
  /** URL pointing to this task */
  selfLink: string;
  /** Parent task identifier (for subtasks) */
  parent?: string;
  /** 
   * Position of the task among siblings. 
   * String encoding a signed 64-bit integer. 
   * Lower values = higher position.
   */
  position: string;
  /** Notes describing the task (max 8192 characters) */
  notes?: string;
  /** Status of the task */
  status: GoogleTaskStatus;
  /** Due date (RFC 3339 date, time portion is always 00:00:00 UTC) */
  due?: string;
  /** Completion date (RFC 3339 timestamp) */
  completed?: string;
  /** Flag indicating whether the task has been deleted */
  deleted?: boolean;
  /** Flag indicating whether the task is hidden */
  hidden?: boolean;
  /** Links attached to this task */
  links?: GoogleTaskLink[];
  /** Web link to this task in Google Tasks UI */
  webViewLink?: string;
  /** Assignment info if created from Docs/Chat */
  assignmentInfo?: GoogleTaskAssignmentInfo;
}

/**
 * Response from listing tasks
 */
export interface GoogleTasksResponse {
  kind: "tasks#tasks";
  etag: string;
  nextPageToken?: string;
  items?: GoogleTask[];
}

// =============================================================================
// API Request Types
// =============================================================================

/**
 * Parameters for listing tasks
 */
export interface ListTasksParams {
  /** Upper bound for completion date (RFC 3339) */
  completedMax?: string;
  /** Lower bound for completion date (RFC 3339) */
  completedMin?: string;
  /** Upper bound for due date (RFC 3339) */
  dueMax?: string;
  /** Lower bound for due date (RFC 3339) */
  dueMin?: string;
  /** Maximum number of tasks (default: 20, max: 100) */
  maxResults?: number;
  /** Page token for pagination */
  pageToken?: string;
  /** Whether to show completed tasks (default: true) */
  showCompleted?: boolean;
  /** Whether to show deleted tasks (default: false) */
  showDeleted?: boolean;
  /** Whether to show hidden tasks (default: false) */
  showHidden?: boolean;
  /** Lower bound for last modification time (RFC 3339) */
  updatedMin?: string;
  /** Whether to show assigned tasks (default: false) */
  showAssigned?: boolean;
}

/**
 * Parameters for inserting a task
 */
export interface InsertTaskParams {
  /** Parent task ID (omit for top-level) */
  parent?: string;
  /** Previous sibling task ID (omit for first position) */
  previous?: string;
}

/**
 * Parameters for moving a task
 */
export interface MoveTaskParams {
  /** New parent task ID */
  parent?: string;
  /** New previous sibling task ID */
  previous?: string;
  /** Destination task list ID (for moving between lists) */
  destinationTasklist?: string;
}

/**
 * Request body for creating/updating a task
 */
export interface TaskRequestBody {
  title?: string;
  notes?: string;
  status?: GoogleTaskStatus;
  due?: string;
  completed?: string;
}

/**
 * Request body for creating/updating a task list
 */
export interface TaskListRequestBody {
  title: string;
}
