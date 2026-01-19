/**
 * Settings Service
 * 
 * Manages app-wide settings stored in Tauri's local store.
 */

import { Store } from 'tauri-plugin-store-api';

const SETTINGS_STORE = '.settings.dat';
const SETTINGS_KEY = 'appSettings';

export interface AppSettings {
  /** Hour of day to send due date notifications (0-23) */
  notificationHour: number;
}

const DEFAULT_SETTINGS: AppSettings = {
  notificationHour: 9, // 9 AM
};

let store: Store | null = null;
let cachedSettings: AppSettings | null = null;

/**
 * Initialize the settings store
 */
async function getStore(): Promise<Store> {
  if (!store) {
    store = new Store(SETTINGS_STORE);
  }
  return store;
}

/**
 * Load settings from store
 */
export async function loadSettings(): Promise<AppSettings> {
  if (cachedSettings) {
    return cachedSettings;
  }

  try {
    const s = await getStore();
    const saved = await s.get<AppSettings>(SETTINGS_KEY);
    cachedSettings = saved ? { ...DEFAULT_SETTINGS, ...saved } : DEFAULT_SETTINGS;
    return cachedSettings;
  } catch (error) {
    console.error('Failed to load settings:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Save settings to store
 */
export async function saveSettings(settings: Partial<AppSettings>): Promise<AppSettings> {
  try {
    const current = await loadSettings();
    const updated = { ...current, ...settings };
    
    const s = await getStore();
    await s.set(SETTINGS_KEY, updated);
    await s.save();
    
    cachedSettings = updated;
    console.debug('Settings saved:', updated);
    return updated;
  } catch (error) {
    console.error('Failed to save settings:', error);
    throw error;
  }
}

/**
 * Get the notification hour (convenience function)
 */
export async function getNotificationHour(): Promise<number> {
  const settings = await loadSettings();
  return settings.notificationHour;
}

/**
 * Set the notification hour
 */
export async function setNotificationHour(hour: number): Promise<void> {
  if (hour < 0 || hour > 23) {
    throw new Error('Hour must be between 0 and 23');
  }
  await saveSettings({ notificationHour: hour });
}

/**
 * Format hour for display (e.g., 9 -> "9:00 AM", 14 -> "2:00 PM")
 */
export function formatHour(hour: number): string {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:00 ${period}`;
}

/**
 * Get available notification hours for dropdown
 */
export function getNotificationHourOptions(): { value: number; label: string }[] {
  return [
    { value: 6, label: '6:00 AM' },
    { value: 7, label: '7:00 AM' },
    { value: 8, label: '8:00 AM' },
    { value: 9, label: '9:00 AM' },
    { value: 10, label: '10:00 AM' },
    { value: 11, label: '11:00 AM' },
    { value: 12, label: '12:00 PM' },
    { value: 13, label: '1:00 PM' },
    { value: 14, label: '2:00 PM' },
    { value: 15, label: '3:00 PM' },
    { value: 16, label: '4:00 PM' },
    { value: 17, label: '5:00 PM' },
    { value: 18, label: '6:00 PM' },
    { value: 19, label: '7:00 PM' },
    { value: 20, label: '8:00 PM' },
    { value: 21, label: '9:00 PM' },
  ];
}
