/**
 * Starred Tasks Repository Implementation
 * 
 * Stores starred task IDs locally using Tauri's filesystem.
 * This is separate from Google's API since it doesn't support starring.
 */

import { readTextFile, writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import { IStarredRepository } from "./interfaces";

const STARRED_FILE = "starred-tasks.json";

export class StarredRepository implements IStarredRepository {
  private cache: Set<string> | null = null;

  /**
   * Load starred tasks from file
   */
  private async load(): Promise<Set<string>> {
    if (this.cache) {
      return this.cache;
    }

    try {
      const content = await readTextFile(STARRED_FILE, {
        dir: BaseDirectory.AppData,
      });
      const data = JSON.parse(content) as string[];
      this.cache = new Set(data);
      return this.cache;
    } catch {
      // File doesn't exist or is invalid
      this.cache = new Set();
      return this.cache;
    }
  }

  /**
   * Save starred tasks to file
   */
  private async save(): Promise<void> {
    if (!this.cache) return;

    const data = Array.from(this.cache);
    await writeTextFile(STARRED_FILE, JSON.stringify(data), {
      dir: BaseDirectory.AppData,
    });
  }

  /**
   * Get all starred task IDs
   */
  async getAll(): Promise<Set<string>> {
    return this.load();
  }

  /**
   * Check if a task is starred
   */
  async isStarred(taskId: string): Promise<boolean> {
    const starred = await this.load();
    return starred.has(taskId);
  }

  /**
   * Star a task
   */
  async star(taskId: string): Promise<void> {
    const starred = await this.load();
    starred.add(taskId);
    await this.save();
  }

  /**
   * Unstar a task
   */
  async unstar(taskId: string): Promise<void> {
    const starred = await this.load();
    starred.delete(taskId);
    await this.save();
  }

  /**
   * Toggle star status
   * @returns New starred status
   */
  async toggle(taskId: string): Promise<boolean> {
    const starred = await this.load();
    
    if (starred.has(taskId)) {
      starred.delete(taskId);
      await this.save();
      return false;
    } else {
      starred.add(taskId);
      await this.save();
      return true;
    }
  }

  /**
   * Clear cache (for logout)
   */
  clearCache(): void {
    this.cache = null;
  }
}
