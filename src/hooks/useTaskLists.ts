/**
 * Task Lists Hook
 * 
 * Provides task lists data and operations to components.
 */

import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { 
  taskListsAtom, 
  taskListsLoadingAtom, 
  taskListsErrorAtom,
  toastAtom,
  starredTaskIdsAtom,
} from "../store";
import { scheduleAllTaskNotifications } from "../services/notification.service";
import { useServices } from "./useServices";
import { AppTaskList } from "../types/app";

export function useTaskLists() {
  const { taskLists: service, starred } = useServices();
  const [taskLists, setTaskLists] = useRecoilState(taskListsAtom);
  const [loading, setLoading] = useRecoilState(taskListsLoadingAtom);
  const [error, setError] = useRecoilState(taskListsErrorAtom);
  const setToast = useSetRecoilState(toastAtom);
  const setStarredIds = useSetRecoilState(starredTaskIdsAtom);

  /**
   * Fetch all task lists
   */
  const fetchTaskLists = useCallback(async (forceRefresh = false) => {
    if (!service) return;

    setLoading(true);
    setError(null);

    try {
      const lists = await service.getAll(forceRefresh);
      setTaskLists(lists);

      // Update starred IDs
      const starredIds = await starred.getAll();
      setStarredIds(starredIds);

      // Schedule notifications for all tasks with due dates
      const allTasks = lists.flatMap(list => list.tasks);
      await scheduleAllTaskNotifications(allTasks);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load task lists";
      setError(message);
      setToast({ title: "Error", body: message, type: "error" });
    } finally {
      setLoading(false);
    }
  }, [service, starred, setTaskLists, setLoading, setError, setToast, setStarredIds]);

  /**
   * Create a new task list
   */
  const createTaskList = useCallback(async (title: string): Promise<AppTaskList | null> => {
    if (!service) return null;

    try {
      const newList = await service.create(title);
      setTaskLists(prev => [...prev, newList]);
      setToast({ title: "List created", type: "success" });
      return newList;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create list";
      setToast({ title: "Error", body: message, type: "error" });
      return null;
    }
  }, [service, setTaskLists, setToast]);

  /**
   * Rename a task list
   */
  const renameTaskList = useCallback(async (id: string, newTitle: string): Promise<boolean> => {
    if (!service) return false;

    try {
      const updated = await service.rename(id, newTitle);
      setTaskLists(prev => prev.map(list => list.id === id ? updated : list));
      setToast({ title: "List renamed", type: "success" });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to rename list";
      setToast({ title: "Error", body: message, type: "error" });
      return false;
    }
  }, [service, setTaskLists, setToast]);

  /**
   * Delete a task list
   */
  const deleteTaskList = useCallback(async (id: string): Promise<boolean> => {
    if (!service) return false;

    try {
      await service.delete(id);
      setTaskLists(prev => prev.filter(list => list.id !== id));
      setToast({ title: "List deleted", type: "warning" });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete list";
      setToast({ title: "Error", body: message, type: "error" });
      return false;
    }
  }, [service, setTaskLists, setToast]);

  /**
   * Reorder task lists (local only)
   */
  const reorderTaskLists = useCallback((fromIndex: number, toIndex: number) => {
    if (!service) return;

    const reordered = service.reorderLists(fromIndex, toIndex);
    setTaskLists(reordered);
  }, [service, setTaskLists]);

  /**
   * Toggle list visibility (directly in Recoil state)
   */
  const toggleListVisibility = useCallback((id: string) => {
    setTaskLists(prev => prev.map(list => 
      list.id === id ? { ...list, isVisible: !list.isVisible } : list
    ));
  }, [setTaskLists]);

  return {
    // Data
    taskLists,
    loading,
    error,

    // Actions
    fetchTaskLists,
    createTaskList,
    renameTaskList,
    deleteTaskList,
    reorderTaskLists,
    toggleListVisibility,
  };
}
