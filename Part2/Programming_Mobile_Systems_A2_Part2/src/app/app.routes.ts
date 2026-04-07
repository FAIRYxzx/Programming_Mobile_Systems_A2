import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InventoryManagementComponent } from './pages/inventory-management/inventory-management.component';
import { SearchComponent } from './pages/search/search.component';
import { PrivacySecurityComponent } from './pages/privacy-security/privacy-security.component';
import { HelpComponent } from './pages/help/help.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // 默认打开 = Home
  { path: 'inventory', component: InventoryManagementComponent },
  { path: 'search', component: SearchComponent },
  { path: 'privacy', component: PrivacySecurityComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', redirectTo: '' }
];