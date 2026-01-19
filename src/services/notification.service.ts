/**
 * Notification Service
 * 
 * Schedules OS notifications for tasks with due dates.
 * Uses Tauri commands to communicate with Rust backend.
 */

import { invoke } from '@tauri-apps/api/tauri';
import { AppTask } from '../types/app';

/**
 * How many minutes before due time to notify
 */
const NOTIFY_BEFORE_MINUTES = 15;

/**
 * Track scheduled task IDs to prevent duplicates
 */
const scheduledTaskIds = new Set<string>();

/**
 * Schedule a notification for a task
 * Automatically handles updates by canceling existing notification first
 */
export async function scheduleTaskNotification(task: AppTask): Promise<boolean> {
  // Skip if no due date or already completed
  if (!task.due || task.status === 'completed') {
    return false;
  }

  // Cancel existing first (handles updates)
  if (scheduledTaskIds.has(task.id)) {
    await cancelTaskNotification(task.id);
  }

  const dueDate = new Date(task.due);
  const notifyAt = new Date(dueDate.getTime() - NOTIFY_BEFORE_MINUTES * 60 * 1000);

  // Don't schedule if already past notification time
  if (notifyAt <= new Date()) {
    console.debug(`Skipping notification for ${task.id}: already past due`);
    return false;
  }

  try {
    await invoke('schedule_notification', {
      taskId: task.id,
      title: `⏰ ${task.title}`,
      body: task.notes || `Due at ${dueDate.toLocaleTimeString()}`,
      notifyAtIso: notifyAt.toISOString(),
    });
    
    scheduledTaskIds.add(task.id);
    console.debug(`Scheduled notification for "${task.title}" at ${notifyAt.toLocaleTimeString()}`);
    return true;
  } catch (error) {
    console.error('Failed to schedule notification:', error);
    return false;
  }
}

/**
 * Cancel a scheduled notification for a task
 */
export async function cancelTaskNotification(taskId: string): Promise<void> {
  if (!scheduledTaskIds.has(taskId)) {
    return; // Not scheduled, nothing to cancel
  }

  try {
    await invoke('cancel_notification', { taskId });
    scheduledTaskIds.delete(taskId);
    console.debug(`Cancelled notification for task ${taskId}`);
  } catch (error) {
    console.error('Failed to cancel notification:', error);
  }
}

/**
 * Cancel ALL scheduled notifications (called on logout)
 */
export async function cancelAllNotifications(): Promise<void> {
  console.debug(`Cancelling ${scheduledTaskIds.size} notifications`);
  
  for (const taskId of scheduledTaskIds) {
    try {
      await invoke('cancel_notification', { taskId });
    } catch (error) {
      console.error(`Failed to cancel notification for ${taskId}:`, error);
    }
  }
  
  scheduledTaskIds.clear();
}

/**
 * Schedule notifications for all tasks with due dates
 * Called on initial load / data refresh
 */
export async function scheduleAllTaskNotifications(tasks: AppTask[]): Promise<number> {
  const eligibleTasks = tasks.filter(t => 
    t.due && 
    t.status !== 'completed' &&
    new Date(t.due) > new Date()
  );

  let scheduled = 0;
  for (const task of eligibleTasks) {
    const success = await scheduleTaskNotification(task);
    if (success) scheduled++;
  }

  console.debug(`Scheduled ${scheduled}/${eligibleTasks.length} task notifications`);
  return scheduled;
}

/**
 * Get count of currently scheduled notifications (for debugging)
 */
export function getScheduledCount(): number {
  return scheduledTaskIds.size;
}
