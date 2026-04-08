/**Student Name: Zexu Xin
*Student Number: 24832928
*Programming Mobile Systems A2 Part2
*/
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
