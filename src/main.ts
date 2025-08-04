import { initializeBugsnag } from './bugsnag';

initializeBugsnag(import.meta.env.VITE_BUGSNAG_KEY as string | undefined);

import './ui/app-root.js';
