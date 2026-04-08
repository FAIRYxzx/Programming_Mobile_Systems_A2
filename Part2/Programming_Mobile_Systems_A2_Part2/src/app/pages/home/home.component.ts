//Import components, modules, templates, and services
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  features = [
    { title: 'Inventory Management', desc: 'Adding new products, editing information, deleting items, sorting, and filtering popular products' },
    { title: 'Search & Filter', desc: 'Advanced search by name, category, inventory, price range, and popularity status' },
    { title: 'Stock Management', desc: 'Unified management of inventory quantity, price and status' },
    { title: 'User Friendly', desc: 'Pop-up notification, one-click location setting, attractive interface' }
  ];

  tech = {
    framework: 'Angular 17+',
  };
}