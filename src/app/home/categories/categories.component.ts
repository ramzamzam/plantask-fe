import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../models/cotegory';
import {PlanningService} from '../../services/planning.service';
import {first} from 'rxjs/operators';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  loading = false;
  categories: Category[];
  activeCategory: Category;
  @Input() activeCategoryId: number;
  @Output() activeCategoryChange = new EventEmitter<Category>();

  constructor(private planningService: PlanningService) {

  }

  ngOnInit() {
    this.loading = true;
    this.loadCategories().then(() => this.loading = false);
  }

  async loadCategories() {
    this.categories = await this.planningService.getCategories();
  }

  activateCategory(category: Category) {
    this.activeCategoryId = category.id;
    this.activeCategoryChange.emit(category);
  }

  clearCategory() {
    this.activeCategory = this.activeCategoryId = null;
    this.activeCategoryChange.emit(null);
  }

  async onSubmit(f: NgForm) {
    const category = await this.createCategory(f.value.name);
    await this.loadCategories();
    this.activateCategory(this.categories.find(c => c.id === category.id));
    f.reset();
  }

  async createCategory(name: string) {
    return await this.planningService.createCategory(name);
  }
}
