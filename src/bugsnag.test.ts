import { describe, it, expect, vi, beforeEach } from 'vitest';
import Bugsnag from '@bugsnag/js';
import { initializeBugsnag } from './bugsnag';

vi.mock('@bugsnag/js', () => {
  return {
    default: {
      start: vi.fn(),
      notify: vi.fn(),
    },
  };
});

describe('initializeBugsnag', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sends window errors to Bugsnag', () => {
    const cleanup = initializeBugsnag('dummy');
    const err = new Error('boom');
    window.dispatchEvent(new ErrorEvent('error', { error: err }));
    expect((Bugsnag as any).notify).toHaveBeenCalledWith(err);
    cleanup?.();
  });

  it('sends unhandled rejections to Bugsnag', () => {
    const cleanup = initializeBugsnag('dummy');
    const err = new Error('reject');
    const event = new Event('unhandledrejection') as PromiseRejectionEvent;
    (event as any).reason = err;
    window.dispatchEvent(event);
    expect((Bugsnag as any).notify).toHaveBeenCalledWith(err);
    cleanup?.();
  });

  it('does nothing when apiKey is missing', () => {
    initializeBugsnag(undefined);
    expect((Bugsnag as any).start).not.toHaveBeenCalled();
  });
});
