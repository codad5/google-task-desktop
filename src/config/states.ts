import { atom, selector } from "recoil";
import { UserProfile } from "../types/googleapis";
import { Task } from "../helpers/task";
import { task, taskCategory } from "../types/taskapi";
import { SettingsStore } from "../helpers/DBStores";
import settings from "./settings";
import { get_access_token } from "../helpers/invoker";

const attemptLoginState = atom({
  key: "attemptLoginState",
  default: false,
});

const attemptLogoutState = atom({
  key: "attemptLogoutState",
  default: false,
});

const userProfileState = atom<UserProfile | null>({
  key: "userProfileState",
  default: null,
});

const accessTokenState = atom<string | null>({
  key: "accessTokenState",
  default: get_access_token()
    .then((value) => value?.access_token ?? null)
    .catch((err) => {
      console.error("accessTokenState error", err);
      return null;
    }),
});

const activeTaskCategoryState = atom<number>({
  key: "activeTaskCategoryState",
  default: SettingsStore.get<number>(
    settings.storage.constants.last_active_category
  )
    .then((value) => value ?? -1)
    .catch((err) => {
      console.error("activeTaskCategoryState error", err);
      return -1;
    }),
});

const activeCategoryTasksState = atom<task[]>({
  key: "activeCategoryTasksState",
  default: [],
});

const taskCategoriesListState = atom<taskCategory[]>({
  key: "taskCategoriesListState",
  default: [],
});

const messageState = atom<{
  title: string;
  body?: string;
  type: "info" | "warning" | "success" | "error" | "loading";
} | null>({
  key: "messageState",
  default: null,
});

const authLoadingState = atom<boolean>({
  key: "authLoading",
  default: false,
});

const isOnlineState = atom<boolean>({
  key: "isOnlineState",
  default: navigator.onLine,
});

// Selectors
const isOnlineSelector = selector({
  key: "isOnlineSelector",
  get: ({ get }) => get(isOnlineState),
  set: ({ set }) => set(isOnlineState, navigator.onLine),
});

const authLoadingSelector = selector({
  key: "authLoadingSelector",
  get: ({ get }) => {
    const loading = get(authLoadingState);
    return loading;
  },
});

const loggedInSelector = selector({
  key: "loggedInSelector",
  get: ({ get }) => {
    const loggedIn = get(userProfileState);
    const accessToken = get(accessTokenState);
    return (
      loggedIn && loggedIn.email != null && loggedIn.email != "" && accessToken
    );
  },
});

const attemptLoginSelector = selector({
  key: "attemptLoginSelector",
  get: ({ get }) => {
    const attemptLogin = get(attemptLoginState);
    return attemptLogin;
  },
});

const attemptLogoutSelector = selector({
  key: "attemptLogoutSelector",
  get: ({ get }) => {
    const attemptLogout = get(attemptLogoutState);
    return attemptLogout;
  },
});

const userProfileSelector = selector({
  key: "userProfileSelector",
  get: ({ get }) => {
    const loggedIn = get(loggedInSelector);
    const user = get(userProfileState);
    return loggedIn && user;
  },
});

const accessTokenSelector = selector({
  key: "accessTokenSelector",
  get: ({ get }) => {
    return get(accessTokenState);
  },
});

// Main task object selector - automatically updates when access token changes
const taskObjectSelector = selector({
  key: "taskObjectSelector",
  get: ({ get }) => {
    const accessToken = get(accessTokenState);
    console.log("taskObjectSelector: accessToken changed", accessToken);

    if (!accessToken) {
      console.log("taskObjectSelector: no token, returning empty Task");
      return new Task();
    }

    console.log("taskObjectSelector: creating new Task with token");
    const task = new Task(accessToken);

    // Set error handler for the task
    task.setErrorHandler((err) => {
      console.error("Task error:", err);
    });

    return task;
  },
});

const activeTaskCategorySelector = selector({
  key: "activeTaskCategorySelector",
  get: ({ get }) => {
    return get(activeTaskCategoryState);
  },
});

const activeCategoryTasksSelector = selector({
  key: "activeCategoryTasksSelector",
  get: ({ get }) => {
    return get(activeCategoryTasksState);
  },
});

const taskCategoriesListSelector = selector({
  key: "taskCategoriesListSelector",
  get: ({ get }) => {
    return get(taskCategoriesListState);
  },
});

const messageSelector = selector({
  key: "messageSelector",
  get: ({ get }) => {
    return get(messageState);
  },
});

export {
  // States
  userProfileState,
  accessTokenState,
  activeTaskCategoryState,
  activeCategoryTasksState,
  taskCategoriesListState,
  attemptLoginState,
  attemptLogoutState,
  messageState,
  authLoadingState,
  isOnlineState,

  // Selectors
  loggedInSelector,
  userProfileSelector,
  accessTokenSelector,
  taskObjectSelector,
  activeTaskCategorySelector,
  activeCategoryTasksSelector,
  taskCategoriesListSelector,
  attemptLoginSelector,
  attemptLogoutSelector,
  messageSelector,
  authLoadingSelector,
  isOnlineSelector,
};
