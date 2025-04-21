import { ApplicationConfig, provideExperimentalCheckNoChangesForDebug, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  // /provideRouter(routes)
  providers: [provideExperimentalZonelessChangeDetection(), provideRouter(routes, withComponentInputBinding(), withViewTransitions())]
};
