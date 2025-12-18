/**
 * Tasks Hook
 * 
 * Provides task data and operations to components.
 */

import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { taskListsAtom, toastAtom, starredTaskIdsAtom } from "../store";
import { useServices } from "./useServices";
import { AppTask, CreateTaskInput } from "../types/app";
import { GoogleTaskStatus } from "../types/google-tasks";

export function useTasks() {
  const { tasks: service } = useServices();
  const [taskLists, setTaskLists] = useRecoilState(taskListsAtom);
  const [starredIds, setStarredIds] = useRecoilState(starredTaskIdsAtom);
  const setToast = useSetRecoilState(toastAtom);

  /**
   * Helper to update a task in the local state
   */
  const updateTaskInState = useCallback((listId: string, taskId: string, updater: (task: AppTask) => AppTask) => {
    setTaskLists(prev => prev.map(list => {
      if (list.id !== listId) return list;
      
      const updatedTasks = list.tasks.map(task => 
        task.id === taskId ? updater(task) : task
      );
      
      return {
        ...list,
        tasks: updatedTasks,
        incompleteCount: updatedTasks.filter(t => t.status === "needsAction").length,
      };
    }));
  }, [setTaskLists]);

  /**
   * Create a new task
   */
  const createTask = useCallback(async (input: CreateTaskInput): Promise<AppTask | null> => {
    if (!service) return null;

    try {
      const newTask = await service.createTask(input);
      
      // Add to local state
      setTaskLists(prev => prev.map(list => {
        if (list.id !== input.listId) return list;
        return {
          ...list,
          tasks: [newTask, ...list.tasks],
          incompleteCount: list.incompleteCount + 1,
        };
      }));

      return newTask;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create task";
      setToast({ title: "Error", body: message, type: "error" });
      return null;
    }
  }, [service, setTaskLists, setToast]);

  /**
   * Toggle task completion
   */
  const toggleTaskComplete = useCallback(async (listId: string, taskId: string): Promise<boolean> => {
    if (!service) return false;

    // Optimistic update
    const currentTask = taskLists.find(l => l.id === listId)?.tasks.find(t => t.id === taskId);
    if (!currentTask) return false;

    const newStatus: GoogleTaskStatus = currentTask.status === "completed" ? "needsAction" : "completed";
    updateTaskInState(listId, taskId, task => ({ ...task, status: newStatus }));

    try {
      await service.toggleComplete(listId, taskId);
      setToast({ 
        title: newStatus === "completed" ? "Task completed" : "Task unchecked", 
        type: newStatus === "completed" ? "success" : "info" 
      });
      return true;
    } catch (err) {
      // Revert optimistic update
      updateTaskInState(listId, taskId, task => ({ ...task, status: currentTask.status }));
      const message = err instanceof Error ? err.message : "Failed to update task";
      setToast({ title: "Error", body: message, type: "error" });
      return false;
    }
  }, [service, taskLists, updateTaskInState, setToast]);

  /**
   * Toggle task starred status
   */
  const toggleTaskStar = useCallback(async (listId: string, taskId: string): Promise<boolean> => {
    if (!service) return false;

    // Optimistic update
    const wasStarred = starredIds.has(taskId);
    const newStarredIds = new Set(starredIds);
    if (wasStarred) {
      newStarredIds.delete(taskId);
    } else {
      newStarredIds.add(taskId);
    }
    setStarredIds(newStarredIds);
    updateTaskInState(listId, taskId, task => ({ ...task, isStarred: !wasStarred }));

    try {
      await service.toggleStar(listId, taskId);
      return true;
    } catch (err) {
      // Revert optimistic update
      setStarredIds(starredIds);
      updateTaskInState(listId, taskId, task => ({ ...task, isStarred: wasStarred }));
      const message = err instanceof Error ? err.message : "Failed to star task";
      setToast({ title: "Error", body: message, type: "error" });
      return false;
    }
  }, [service, starredIds, setStarredIds, updateTaskInState, setToast]);

  /**
   * Delete a task
   */
  const deleteTask = useCallback(async (listId: string, taskId: string): Promise<boolean> => {
    if (!service) return false;

    try {
      await service.deleteTask(listId, taskId);
      
      // Remove from local state
      setTaskLists(prev => prev.map(list => {
        if (list.id !== listId) return list;
        const updatedTasks = list.tasks.filter(t => t.id !== taskId);
        return {
          ...list,
          tasks: updatedTasks,
          incompleteCount: updatedTasks.filter(t => t.status === "needsAction").length,
        };
      }));

      // Remove from starred
      setStarredIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });

      setToast({ title: "Task deleted", type: "warning" });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete task";
      setToast({ title: "Error", body: message, type: "error" });
      return false;
    }
  }, [service, setTaskLists, setStarredIds, setToast]);

  /**
   * Move task to another list
   */
  const moveTaskToList = useCallback(async (
    fromListId: string, 
    taskId: string, 
    toListId: string
  ): Promise<boolean> => {
    if (!service) return false;

    try {
      const movedTask = await service.moveToList(fromListId, taskId, toListId);
      
      // Update local state
      setTaskLists(prev => {
        return prev.map(list => {
          if (list.id === fromListId) {
            // Remove from source list
            const updatedTasks = list.tasks.filter(t => t.id !== taskId);
            return {
              ...list,
              tasks: updatedTasks,
              incompleteCount: updatedTasks.filter(t => t.status === "needsAction").length,
            };
          }
          if (list.id === toListId) {
            // Add to destination list
            return {
              ...list,
              tasks: [movedTask, ...list.tasks],
              incompleteCount: list.incompleteCount + (movedTask.status === "needsAction" ? 1 : 0),
            };
          }
          return list;
        });
      });

      setToast({ title: "Task moved", type: "success" });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to move task";
      setToast({ title: "Error", body: message, type: "error" });
      return false;
    }
  }, [service, setTaskLists, setToast]);

  /**
   * Clear completed tasks in a list
   */
  const clearCompletedTasks = useCallback(async (listId: string): Promise<boolean> => {
    if (!service) return false;

    try {
      await service.clearCompleted(listId);
      
      // Remove completed tasks from local state
      setTaskLists(prev => prev.map(list => {
        if (list.id !== listId) return list;
        return {
          ...list,
          tasks: list.tasks.filter(t => t.status === "needsAction"),
        };
      }));

      setToast({ title: "Completed tasks cleared", type: "success" });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to clear tasks";
      setToast({ title: "Error", body: message, type: "error" });
      return false;
    }
  }, [service, setTaskLists, setToast]);

  /**
   * Get all starred tasks across all lists
   */
  const getStarredTasks = useCallback((): AppTask[] => {
    return taskLists.flatMap(list => 
      list.tasks.filter(task => starredIds.has(task.id))
    );
  }, [taskLists, starredIds]);

  return {
    // Data helpers
    getStarredTasks,

    // Actions
    createTask,
    toggleTaskComplete,
    toggleTaskStar,
    deleteTask,
    moveTaskToList,
    clearCompletedTasks,
  };
}
