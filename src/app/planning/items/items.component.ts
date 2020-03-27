import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {PlanningService} from '../services/planning.service';
import {Category, Item} from '../models/planning.models';
import {ActivatedRoute, Router} from '@angular/router';

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

  async loadItems(categoryId: number) {
    this.items = await this.planningService.getItems(categoryId);
  }

  viewItem(id: number) {
    this.router.navigate(['planning/item', id]);
  }
}
