import { Component, OnInit } from '@angular/core';
import { PlanningService } from '../services/planning.service';
import { Category, Item } from '../models/planning.models';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemCreateDialogComponent } from './dialogs/item.create.dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  loading = false;
  category: Category;
  items: Item[] = [];

  constructor(
    private planningService: PlanningService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(async params => {
      const categoryId = params.categoryId;
      if (categoryId != null) {
        this.category = await this.planningService.getCategory(categoryId);
        this.loadItems(this.category?.id).then(() => this.loading = false);
      }
    });
  }

  async loadItems(categoryId?: number) {
    if (!categoryId) { categoryId = this.category.id; }
    this.items = await this.planningService.getItems(categoryId);
  }

  viewItem(id: number) {
    this.router.navigate(['planning/item', id]);
  }

  openCreateDialog(): void {

    const newCat = new Item();
    newCat.categoryId = this.category.id;
    const dialogRef = this.dialog.open(ItemCreateDialogComponent, {
      width: '400px',
      data: newCat,
    });

    dialogRef.afterClosed().subscribe(async result => {
      await this.loadItems();
    });
  }
}
