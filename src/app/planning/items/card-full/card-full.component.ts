import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item, List } from '../../models/planning.models';
import { PlanningService } from '../../services/planning.service';

@Component({
  selector: 'app-card-full',
  templateUrl: './card-full.component.html',
  styleUrls: ['./card-full.component.css']
})
export class CardFullComponent implements OnInit {
  loading = false;
  item: Item;
  lists: List[];

  constructor(
    private route: ActivatedRoute,
    private planningService: PlanningService,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(async params => {
      const itemId = params.itemId;
      if (itemId != null) {
        this.item = await this.planningService.getItem(itemId);
        this.lists = await this.planningService.getLists(itemId);
      }
    });
  }
}
