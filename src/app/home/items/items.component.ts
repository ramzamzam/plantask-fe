import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Category, Item} from '../../models/cotegory';
import {first} from 'rxjs/operators';
import {PlanningService} from '../../services/planning.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnChanges {
  loading = false;

  @Input() category: Category;
  items: Item[] = [];

  constructor(private planningService: PlanningService) { }

  ngOnChanges(changes): void {
    this.loading = true;
    this.loadItems(this.category?.id).then(() => this.loading = false);
  }

  async loadItems(categoryId: number) {
    this.items = await this.planningService.getItems(categoryId);
  }
}
