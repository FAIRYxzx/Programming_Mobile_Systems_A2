//Import components, modules, services, and models
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
  //Filter condition object - Stores all the filtering parameters input by users
  filters = {
    name: '',
    category: '',
    stockStatus: '',
    popular: '',
    minPrice: '',
    maxPrice: ''
  };
  
  //Search result array - Stores the list of goods that meet the conditions
  results: InventoryManagement[] = [];
  noResult = false;

  //Static data list - Dropdown box options
  categories = ['Electronics','Furniture','Clothing','Tools','Miscellaneous'];
  stockList = ['In Stock','Low Stock','Out of Stock'];
  popularList = ['Yes','No'];

  //Constructor - Dependency Injection: Inventory Service, Routing Service
  constructor(
    private service: InventoryService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Execute search logic
   * Call the advanced search method of the service and pass in the filtering conditions
   * Determine whether there are search results and control the display of the no-result prompt
   * The no-result prompt will automatically disappear after 3 seconds
   */
  doSearch(): void {
    //Invoke the search method of the inventory service to obtain the list of goods that meet the conditions
    this.results = this.service.advancedSearchWithPrice(this.filters);
    //Determine if there is no result and update the "noResult" flag
    this.noResult = this.results.length === 0;
    
    //If there is no result, the prompt box will automatically disappear after 3 seconds.
    if (this.noResult) {
      setTimeout(() => this.noResult = false, 3000);
    }
  }

  /**
   * Reset filtering conditions
   * Clear all filtering conditions
   * Clear search results
   * Hide the no-result prompt
   */
  reset(): void {
    this.filters = {
      name: '', category: '', stockStatus: '',
      popular: '', minPrice: '', maxPrice: ''
    };
    this.results = [];
    this.noResult = false;
  }

 /**
  * Click on the product row to navigate to the Inventory Management page and locate the specific product
  * @param item The product object that was clicked
  */
  goToItem(item: InventoryManagement): void {
    localStorage.setItem('scrollToItem', JSON.stringify(item));
    this.router.navigate(['/inventory']);
  }
}