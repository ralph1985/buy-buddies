import Bugsnag from '@bugsnag/js';

export function initializeBugsnag(apiKey?: string) {
  if (!apiKey) {
    return;
  }

  Bugsnag.start({ apiKey });

  const onError = (event: ErrorEvent) => {
    Bugsnag.notify(event.error ?? new Error(event.message));
  };

  const onUnhandledRejection = (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    Bugsnag.notify(reason instanceof Error ? reason : new Error(String(reason)));
  };

  window.addEventListener('error', onError);
  window.addEventListener('unhandledrejection', onUnhandledRejection);

  return () => {
    window.removeEventListener('error', onError);
    window.removeEventListener('unhandledrejection', onUnhandledRejection);
  };
}
