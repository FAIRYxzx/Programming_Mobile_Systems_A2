import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { InventoryManagement } from '../../models/Inventory-Management';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  filters = {
    name: '',
    category: '',
    stockStatus: '',
    popular: '',
    minPrice: '',
    maxPrice: ''
  };
  
  results: InventoryManagement[] = [];
  noResult = false;

  categories = ['Electronics','Furniture','Clothing','Tools','Miscellaneous'];
  stockList = ['In Stock','Low Stock','Out of Stock'];
  popularList = ['Yes','No'];

  constructor(
    private service: InventoryService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  doSearch(): void {
    this.results = this.service.advancedSearchWithPrice(this.filters);
    this.noResult = this.results.length === 0;
    
    if (this.noResult) {
      setTimeout(() => this.noResult = false, 3000);
    }
  }

  reset(): void {
    this.filters = {
      name: '', category: '', stockStatus: '',
      popular: '', minPrice: '', maxPrice: ''
    };
    this.results = [];
    this.noResult = false;
  }

  // 点击商品跳转到 Inventory 页并定位
  goToItem(item: InventoryManagement): void {
    localStorage.setItem('scrollToItem', JSON.stringify(item));
    this.router.navigate(['/inventory']);
  }
}