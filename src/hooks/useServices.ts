/**
 * Service Provider Hook
 * 
 * Creates and provides singleton service instances.
 * Services are recreated when access token changes.
 */

import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "../store";
import { createApiClient, GoogleTasksClient } from "../api";
import { TaskListRepository, TaskRepository, StarredRepository } from "../repositories";
import { TaskListService, TaskService } from "../services";

interface Services {
  client: GoogleTasksClient | null;
  taskLists: TaskListService | null;
  tasks: TaskService | null;
  starred: StarredRepository;
}

// Singleton starred repository (doesn't need token)
const starredRepo = new StarredRepository();

/**
 * Hook to get all services
 * Services are recreated when access token changes.
 */
export function useServices(): Services {
  const accessToken = useRecoilValue(accessTokenAtom);

  const services = useMemo(() => {
    if (!accessToken) {
      return {
        client: null,
        taskLists: null,
        tasks: null,
        starred: starredRepo,
      };
    }

    // Create API client
    const client = createApiClient({
      accessToken,
      onTokenExpired: () => {
        console.warn("Token expired - need to refresh");
        // TODO: Trigger token refresh
      },
      onError: (error) => {
        console.error("API error:", error);
      },
    });

    // Create repositories
    const taskListRepo = new TaskListRepository(client);
    const taskRepo = new TaskRepository(client);

    // Create services
    const taskListService = new TaskListService(taskListRepo, taskRepo, starredRepo);
    const taskService = new TaskService(taskRepo, starredRepo);

    return {
      client,
      taskLists: taskListService,
      tasks: taskService,
      starred: starredRepo,
    };
  }, [accessToken]);

  return services;
}

/**
 * Hook to check if services are ready
 */
export function useServicesReady(): boolean {
  const { client }= useServices();
  return client !== null;
}
