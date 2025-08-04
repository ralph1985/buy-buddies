import Bugsnag from '@bugsnag/js';

const bugsnagKey = import.meta.env.VITE_BUGSNAG_KEY as string | undefined;
if (bugsnagKey) {
  Bugsnag.start({ apiKey: bugsnagKey });
}

import './ui/app-root.js';
