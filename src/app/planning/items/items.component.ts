import {Component, OnInit} from '@angular/core';
import {PlanningService} from '../services/planning.service';
import {Category, EntityBaseUrl, Item} from '../models/planning.models';
import {ActivatedRoute} from '@angular/router';
import {ItemCreateDialogComponent} from './dialogs/item.create.dialog';
import {MatDialog} from '@angular/material/dialog';

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

  showCreateOrUpdateDialog(item?: Item): void {
    const dialogRef = this.dialog.open(ItemCreateDialogComponent, {
      width: '400px',
      data: item || new Item({ categoryId: this.category.id }),
    });

    dialogRef.afterClosed().subscribe(async result => {
      await this.loadItems();
    });
  }

  dispatchItemEvent($event: { action: string; data: Item }) {
    if ($event.action === 'edit') { return this.showCreateOrUpdateDialog($event.data); }
    if ($event.action === 'delete') { return this.deleteItem($event.data); }
  }

  async deleteItem(data: Item) {
    try {
      await this.planningService.deleteEntity(data, EntityBaseUrl.Item);
      await this.loadItems();
    } catch (err) {
      alert(JSON.stringify(err));
    }
  }
}
