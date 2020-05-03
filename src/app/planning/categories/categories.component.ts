import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { PlanningService } from '../services/planning.service';
import { Category, EntityBaseUrl } from '../models/planning.models';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  icons = {
    faPen,
    faTrash,
  };
  loading = false;
  categories: Category[];
  filter: string;
  displayedCategories: Category[];
  activeCategory: Category;
  activeCategoryId: number;
  @Output() activeCategoryChange = new EventEmitter<Category>();

  constructor(
    private planningService: PlanningService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  openCreateDialog(category?: Category): void {

    const editCat = category || new Category();
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: editCat,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.createdCategory(result);
    });
  }

  ngOnInit() {
    this.loading = true;
    this.loadCategories().then(() => this.loading = false);
    this.activeCategoryId = Number(this.route.snapshot.firstChild.params.categoryId);
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.activeCategoryId = Number(this.route.snapshot.firstChild.params.categoryId);
        }
      });
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

  async createdCategory(category: Category) {
    await this.loadCategories();
    this.activateCategory(this.categories.find(c => c.id === category.id));
    this.filter = '';
    this.filterDisplayedCategories();
  }

  editCategory(cat: Category) {
    this.openCreateDialog(cat);
  }

  async deleteCategory(cat: Category) {
    try {
      await this.planningService.deleteEntity(cat, EntityBaseUrl.Category);
      await this.loadCategories();
      await this.router.navigate(['/planning']);
    } catch (e) {
      // TODO: Fix this
      alert(e);
    }
  }
}


@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'category-create-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private planningService: PlanningService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async save() {
    try {
      const cat = await(this.planningService.createOrUpdateCategory(this.data));
      this.dialogRef.close(cat);
    } catch (e) {
      alert(JSON.stringify(e.error.validations));
    }
  }
}
