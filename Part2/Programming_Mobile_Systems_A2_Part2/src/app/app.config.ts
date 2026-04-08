/**Student Name: Zexu Xin
*Student Number: 24832928
*Programming Mobile Systems A2 Part2
*/
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
