import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Ensure `performance.clearMarks` exists in older/limited environments.
// Some browsers or WebViews don't implement the full Performance API
// and minified vendor code may call `performance.clearMarks(...)`.
// Provide a no-op fallback to avoid "...ClearMarks is not a function" errors.
if (typeof performance !== 'undefined' && typeof (performance as any).clearMarks !== 'function') {
  (performance as any).clearMarks = function () { /* no-op */ };
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
