"use client";

import { Download } from "lucide-react";
import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

function detectIosLike() {
  // iPadOS 13+ reports as Mac; touch points help distinguish.
  const ua = navigator.userAgent;
  const iOS = /iPad|iPhone|iPod/i.test(ua);
  const iPadOsDesktopMode =
    /Macintosh/i.test(ua) && (navigator.maxTouchPoints ?? 0) > 1;
  return iOS || iPadOsDesktopMode;
}

export function InstallShortcutButton({ className = "" }: { className?: string }) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [platform, setPlatform] = useState<"unknown" | "ios" | "other">("unknown");
  const [showIosTip, setShowIosTip] = useState(false);
  const [showOtherTip, setShowOtherTip] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const canInstall = !!deferredPrompt;

  useEffect(() => {
    setPlatform(detectIosLike() ? "ios" : "other");
  }, []);

  useEffect(() => {
    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    };
  }, []);

  useEffect(() => {
    const onInstalled = () => setDeferredPrompt(null);
    window.addEventListener("appinstalled", onInstalled);
    return () => window.removeEventListener("appinstalled", onInstalled);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(id);
  }, [toast]);

  const showInstall = canInstall;

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={async () => {
          if (deferredPrompt) {
            await deferredPrompt.prompt();
            try {
              const res = await deferredPrompt.userChoice;
              if (res.outcome === "accepted") {
                setToast("Shortcut created on your device.");
              }
            } finally {
              setDeferredPrompt(null);
            }
            return;
          }

          if (platform === "ios") setShowIosTip(true);
          else setShowOtherTip(true);
        }}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-orange-200 px-4 py-2 text-sm font-semibold text-neutral-900 shadow-[0_4px_14px_rgba(251,146,60,0.18)] transition hover:bg-orange-300 hover:shadow-[0_6px_20px_rgba(251,146,60,0.26)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
        aria-label="Install"
        aria-expanded={platform === "ios" ? showIosTip : showOtherTip}
      >
        <Download className="size-4" aria-hidden />
        <span className="hidden sm:inline">Install</span>
      </button>

      {platform === "ios" && showIosTip && (
        <div
          role="dialog"
          aria-label="Add to Home Screen instructions"
          className="fixed left-1/2 top-[calc(4.5rem+env(safe-area-inset-top))] z-[200] w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-black/[0.08] bg-white p-4 text-sm text-neutral-700 shadow-lg"
        >
          <p className="font-medium text-neutral-900">On iPhone/iPad:</p>
          <p className="mt-1 leading-relaxed">
            Open Safari → tap <span className="font-semibold">Share</span> →
            <span className="font-semibold"> Add to Home Screen</span>.
          </p>
          <button
            type="button"
            className="mt-3 inline-flex min-h-[36px] items-center justify-center rounded-full bg-neutral-900 px-4 text-xs font-semibold text-white hover:bg-neutral-800"
            onClick={() => setShowIosTip(false)}
          >
            OK
          </button>
        </div>
      )}

      {platform !== "ios" && showOtherTip && (
        <div
          role="dialog"
          aria-label="Install instructions"
          className="fixed left-1/2 top-[calc(4.5rem+env(safe-area-inset-top))] z-[200] w-[min(24rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-black/[0.08] bg-white p-4 text-sm text-neutral-700 shadow-lg"
        >
          <p className="font-medium text-neutral-900">In Chrome / Edge:</p>
          <p className="mt-1 leading-relaxed">
            Look for the <span className="font-semibold">Install</span> icon near the address bar,
            or open the <span className="font-semibold">⋮</span> menu and tap{" "}
            <span className="font-semibold">Install app</span> /{" "}
            <span className="font-semibold">Add to Home screen</span>.
          </p>
          <p className="mt-2 leading-relaxed">If you still don’t see it, refresh the page.</p>
          <button
            type="button"
            className="mt-3 inline-flex min-h-[36px] items-center justify-center rounded-full bg-neutral-900 px-4 text-xs font-semibold text-white hover:bg-neutral-800"
            onClick={() => setShowOtherTip(false)}
          >
            OK
          </button>
        </div>
      )}

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed left-1/2 top-[calc(4.5rem+env(safe-area-inset-top))] z-[200] w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-black/[0.08] bg-white px-4 py-3 text-sm font-medium text-neutral-900 shadow-lg"
        >
          {toast}
        </div>
      )}
    </div>
  );
}

