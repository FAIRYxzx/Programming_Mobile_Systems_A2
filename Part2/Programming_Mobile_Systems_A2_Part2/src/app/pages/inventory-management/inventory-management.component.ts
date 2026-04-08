/**Student Name: Zexu Xin
*Student Number: 24832928
*Programming Mobile Systems A2 Part2
*/
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { InventoryManagement } from '../../models/Inventory-Management';

@Component({
  selector: 'app-inventory-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.css']
})
export class InventoryManagementComponent implements OnInit {
  // Product list data source
  items: InventoryManagement[] = [];
  modalVisible = false;
  modalTitle = 'Add New Item';
  currentItem: InventoryManagement = {} as InventoryManagement;

  // Global prompt box configuration
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  toastVisible = false;

  // Sorting configuration
  sortKey: keyof InventoryManagement | null = null;
  sortOrder: 'asc' | 'desc' | null = null;

  // Delete pop-up configuration
  deleteModalVisible = false;
  deleteTargetItem: InventoryManagement | null = null;
  isBulkDelete = false;

  // Page configuration
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  paginatedItems: InventoryManagement[] = [];

  //Hot product selection
  showOnlyPopular = false;
  originalItems: InventoryManagement[] = [];

  //Inventory injection service
  constructor(private service: InventoryService) {}

  /**
   * Load product data and initialize pagination
   */
  ngOnInit(): void {
    this.items = this.service.getItems();  //Obtain the list of goods from the service
    this.originalItems = [...this.items];
    this.totalItems = this.items.length;
    this.updatePagination();
    //Search page redirection positioning
    const target = localStorage.getItem('scrollToItem');
    if (target) {
      const item = JSON.parse(target);
      localStorage.removeItem('scrollToItem');
    
      setTimeout(() => {
        const el = document.getElementById(`item-${item.id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.style.backgroundColor = '#fff2cc';
          setTimeout(() => el.style.backgroundColor = '', 2000);
        }
      }, 300);
    }
  }

  /**
   * Update the pagination data
   * Extract the list of products based on the current page number and page size
   */
  updatePagination(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedItems = this.items.slice(start, end);
  }

  /**
   * Jump to the specified page number
   * @param page The target page number
   */
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;  //Page boundary verification
    this.currentPage = page;
    this.updatePagination();
  }

  /**
   * Calculate the total number of pages
   * @returns The total number of pages (rounded up) 
   */
  totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  /**
   * Handle the Enter event of the page number input box
   * @param event Keyboard event 
   */
  goToPageInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  const page = parseInt(input.value, 10);
  if (!isNaN(page) && page >= 1 && page <= this.totalPages()) {
    this.goToPage(page);
    }
    input.value = '';
  }

  /**
   * Column sorting processing
   * @param key Sorting field
   */
  sortColumn(key: keyof InventoryManagement): void {
    // If the clicked item is the current sorting field: Switch sorting direction / Cancel sorting
    if (this.sortKey === key) {
      if (this.sortOrder === 'asc') this.sortOrder = 'desc';
      else { this.sortKey = null; this.sortOrder = null; }
    } else {
      // New sorting field: Default ascending order
      this.sortKey = key;
      this.sortOrder = 'asc';
    }
    this.sortItems(); // Execute sorting logic
  }

  /**
   * Core logic for sorting the product list
   * Supports sorting of numeric/string type fields. After sorting, the pagination is reset.
   */
  sortItems(): void {
    // Without sorting criteria: Restore original data
    if (!this.sortKey || !this.sortOrder) {
      this.items = this.service.getItems();
    } else {
      // With sorting conditions: Copy the array and sort it (to prevent modifying the original data)
      this.items = [...this.service.getItems()].sort((a, b) => {
        const valA = a[this.sortKey!];
        const valB = b[this.sortKey!];
        // Sorting of numeric type fields
        if (typeof valA === 'number' && typeof valB === 'number') {
          return this.sortOrder === 'asc' ? valA - valB : valB - valA;
        }
        // Sorting of string type fields (converting to lowercase and ignoring case)
        const strA = String(valA).toLowerCase();
        const strB = String(valB).toLowerCase();
        if (strA < strB) return this.sortOrder === 'asc' ? -1 : 1;
        if (strA > strB) return this.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
    // Sort and then reset the pagination
    this.totalItems = this.items.length;
    this.currentPage = 1;
    this.updatePagination();
  }

/**
 * Obtain sorting icon
 * @param key Sorting field
 * @returns Ascending ↑ / Descending ↓ / Unsorted - 
 */
  getSortIcon(key: keyof InventoryManagement): string {
    if (this.sortKey !== key) return '-';
    return this.sortOrder === 'asc' ? '↑' : '↓';
  }

/**
 * Determine whether the specified field is the current sorting field
 * @param key Sorting field
 * @returns Whether sorting is activated 
 */
  isSortActive(key: keyof InventoryManagement): boolean {
  return this.sortKey === key;
  }
/**
 * Open the "New/Edit" pop-up window
 * @param item The item to be edited (optional; if not provided, it will be a new item) 
 */
  openModal(item?: InventoryManagement): void {
    this.modalVisible = true;
    this.currentItem = item ? { ...item } : {} as InventoryManagement;
    this.modalTitle = item ? 'Edit Item' : 'Add New Item';
  }

  closeModal(): void {
    this.modalVisible = false;
  }
  /**
   * Save the product (add/edit)
   * Verify mandatory fields, call the service interface, and display the operation result
   */
  saveItem(): void {
    // Required field validation (ID and name)
    if (!this.currentItem.name || !this.currentItem.id) {
      this.showToast('Name and ID are required!', 'error');
      return;
    }
    let success = false;
    // Add New Product
    if (this.modalTitle === 'Add New Item') {
      success = this.service.addItem(this.currentItem);
    } else {
      // Edit Product
      success = this.service.updateItem(
        { name: this.currentItem.name, id: this.currentItem.id },
        this.currentItem
      );
    }
    // Handling of Operation Results
    if (success) {
      this.showToast(this.modalTitle === 'Add New Item' ? 'Added successfully!' : 'Updated successfully!', 'success');
      this.items = this.service.getItems();
      this.sortItems();
      this.closeModal();
    } else {
      this.showToast('Operation failed! Duplicate name/ID', 'error');
    }
  }

  /**
   * Open the confirmation pop-up window for deleting a single item
   * @param item The item to be deleted
   */
  openDeleteModal(item: InventoryManagement): void {
    this.deleteModalVisible = true;
    this.deleteTargetItem = item;
    this.isBulkDelete = false;
  }

  /**
   * Open the confirmation window for batch deletion
   * First, check if any items have been selected. If not, display an error message
   */
  openBulkDeleteModal(): void {
    const selected = this.items.filter(i => i.selected);
    if (selected.length === 0) {
      this.showToast('No items selected!', 'error');
      return;
    }
    this.deleteModalVisible = true;
    this.isBulkDelete = true;
  }

  closeDeleteModal(): void {
    this.deleteModalVisible = false;
    this.deleteTargetItem = null;
  }

  /**
   * Confirm deletion (single item / batch)
   * Call the service interface, display the deletion result, and refresh the list 
   */
  confirmDelete(): void {
    if (this.isBulkDelete) {
      const selected = this.items.filter(i => i.selected);
      const count = this.service.bulkDelete(selected);
      this.showToast(`Deleted ${count} items!`, 'success');
    } else if (this.deleteTargetItem) {
      this.service.deleteItem(this.deleteTargetItem.name, this.deleteTargetItem.id);
      this.showToast('Deleted successfully!', 'success');
    }
    this.items = this.service.getItems();
    this.sortItems();
    this.closeDeleteModal();
  }

  /**
   * Display the global prompt box
   * @param msg The prompt text
   * @param type The prompt type (success/error)
   */
  showToast(msg: string, type: 'success' | 'error'): void {
    this.toastMessage = msg;
    this.toastType = type;
    this.toastVisible = true;
    setTimeout(() => this.toastVisible = false, 2500);
  }

  // Switch to viewing only the popular products
togglePopular(): void {
  this.showOnlyPopular = !this.showOnlyPopular;
  if (this.showOnlyPopular) {
    // Show only the popular ones
    this.items = this.originalItems.filter(i => i.popular === 'Yes');
  } else {
    // Restore completely
    this.items = [...this.originalItems];
  }
  this.totalItems = this.items.length;
  this.currentPage = 1;
  this.updatePagination();
}
}