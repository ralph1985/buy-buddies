import Bugsnag from '@bugsnag/js';

const bugsnag = Bugsnag as any;

export function initializeBugsnag(apiKey?: string) {
  if (!apiKey) {
    return;
  }

  bugsnag.start({ apiKey });

  const onError = (event: ErrorEvent) => {
    bugsnag.notify(event.error ?? new Error(event.message));
  };

  const onUnhandledRejection = (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    bugsnag.notify(reason instanceof Error ? reason : new Error(String(reason)));
  };

  window.addEventListener('error', onError);
  window.addEventListener('unhandledrejection', onUnhandledRejection);

  return () => {
    window.removeEventListener('error', onError);
    window.removeEventListener('unhandledrejection', onUnhandledRejection);
  };
}
