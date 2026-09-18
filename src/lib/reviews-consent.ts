"use client";

import { useSyncExternalStore } from "react";

const key = "richardus-reviews-consent-v1";
const eventName = "richardus-consent-change";
const duration = 180 * 24 * 60 * 60 * 1000;
let memoryChoice: boolean | null = null;

function readChoice() {
  if (memoryChoice !== null) return memoryChoice;
  try {
    const stored = window.localStorage.getItem(key);
    if (!stored) return false;
    const choice = JSON.parse(stored);
    return choice.allowed === true && choice.expiresAt > Date.now();
  } catch {
    return false;
  }
}

function subscribe(callback: () => void) {
  function changed(event: StorageEvent) {
    if (event.key === key || event.key === null) {
      memoryChoice = null;
      // Unmounting alone cannot stop a third-party script that is already running.
      if (
        !readChoice() &&
        document.querySelector(
          'script[src="https://elfsightcdn.com/platform.js"]',
        )
      ) {
        window.location.reload();
      }
      callback();
    }
  }
  window.addEventListener(eventName, callback);
  window.addEventListener("storage", changed);
  return () => {
    window.removeEventListener(eventName, callback);
    window.removeEventListener("storage", changed);
  };
}

export function useReviewsConsent() {
  return useSyncExternalStore(subscribe, readChoice, () => false);
}

export function setReviewsConsent(allowed: boolean) {
  memoryChoice = allowed;
  try {
    window.localStorage.setItem(
      key,
      JSON.stringify({ allowed, expiresAt: Date.now() + duration }),
    );
  } catch {
    // A blocked storage API must not prevent an explicit choice for this page.
  }
  window.dispatchEvent(new Event(eventName));
  if (
    !allowed &&
    document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')
  ) {
    window.location.reload();
  }
}
