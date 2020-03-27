import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlanningService} from '../services/planning.service';
import {first} from 'rxjs/operators';
import {NgForm} from '@angular/forms';
import {Category} from '../models/planning.models';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  icons = {
    faPlus,
  };
  loading = false;
  categories: Category[];
  filter: string;
  displayedCategories: Category[];
  activeCategory: Category;
  @Input() activeCategoryId: number;
  @Output() activeCategoryChange = new EventEmitter<Category>();

  constructor(private planningService: PlanningService) {}

  ngOnInit() {
    this.loading = true;
    this.loadCategories().then(() => this.loading = false);
  }

  async loadCategories() {
    this.categories = await this.planningService.getCategories();
    this.filterDisplayedCategories();
  }

  activateCategory(category: Category) {
    this.activeCategoryId = category.id;
    this.activeCategory = category;
    this.activeCategoryChange.emit(category);
  }

  clearCategory() {
    this.activeCategory = this.activeCategoryId = null;
    this.activeCategoryChange.emit(null);
  }

  filterDisplayedCategories() {
    this.displayedCategories =
      this.filter
        ? this.categories.filter(cat => cat.name.toLowerCase().indexOf(this.filter) !== -1)
        : this.categories;
  }

  async createCategory(name: string) {
    const category = await this.planningService.createCategory(name);
    await this.loadCategories();
    this.activateCategory(this.categories.find(c => c.id === category.id));
    this.filter = '';
    this.filterDisplayedCategories();
  }
}
