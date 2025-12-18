/**
 * Toast Hook
 * 
 * Simple hook for showing toast notifications.
 */

import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { toastAtom } from "../store";
import { ToastMessage } from "../types/app";

export function useToast() {
  const setToast = useSetRecoilState(toastAtom);

  const showToast = useCallback((message: ToastMessage) => {
    setToast(message);
    
    // Auto-hide after duration
    if (message.duration !== 0) {
      setTimeout(() => {
        setToast(null);
      }, message.duration ?? 3000);
    }
  }, [setToast]);

  const hideToast = useCallback(() => {
    setToast(null);
  }, [setToast]);

  const success = useCallback((title: string, body?: string) => {
    showToast({ title, body, type: "success" });
  }, [showToast]);

  const error = useCallback((title: string, body?: string) => {
    showToast({ title, body, type: "error" });
  }, [showToast]);

  const warning = useCallback((title: string, body?: string) => {
    showToast({ title, body, type: "warning" });
  }, [showToast]);

  const info = useCallback((title: string, body?: string) => {
    showToast({ title, body, type: "info" });
  }, [showToast]);

  return {
    showToast,
    hideToast,
    success,
    error,
    warning,
    info,
  };
}
