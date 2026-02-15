export function getUserAgent(): string {
  if (typeof navigator === "undefined") return "";
  return navigator.userAgent || "";
}

export function isKakaoTalkInAppBrowser(ua: string = getUserAgent()): boolean {
  return /KAKAOTALK/i.test(ua);
}

export function isAndroid(ua: string = getUserAgent()): boolean {
  return /Android/i.test(ua);
}

export function isIOS(ua: string = getUserAgent()): boolean {
  return /iPhone|iPad|iPod/i.test(ua);
}

export function openInExternalBrowser(url: string): void {
  if (typeof window === "undefined") return;

  const ua = getUserAgent();

  // Android KakaoTalk in-app browser: Chrome intent is the most reliable way to escape the webview.
  if (isAndroid(ua)) {
    try {
      const u = new URL(url);
      const hostAndPathAndQuery = `${u.host}${u.pathname}${u.search}`;
      const scheme = u.protocol.replace(":", "");
      const intentUrl = `intent://${hostAndPathAndQuery}#Intent;scheme=${scheme};package=com.android.chrome;end`;

      window.location.href = intentUrl;

      // Fallback if intent is blocked; still navigates within the in-app browser.
      window.setTimeout(() => {
        window.location.href = url;
      }, 700);
      return;
    } catch {
      window.location.href = url;
      return;
    }
  }

  // iOS/others: best-effort new tab. Many in-app browsers block this, so fallback to same-tab navigation.
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (!opened) window.location.href = url;
}

export async function copyText(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // ignore
  }

  try {
    // Works in many constrained webviews; lets user copy manually.
    window.prompt("Copy this link:", text);
    return true;
  } catch {
    return false;
  }
}

