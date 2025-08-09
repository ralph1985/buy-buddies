import { initializeBugsnag } from './bugsnag.js';

initializeBugsnag(import.meta.env.VITE_BUGSNAG_KEY as string | undefined);

import './ui/app-root.js';
