import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EntityBaseUrl, Item, List, ListRelationsType} from '../../models/planning.models';
import {PlanningService} from '../../services/planning.service';
import {MatDialog} from '@angular/material/dialog';
import {ListCreateDialogComponent} from '../list/list-create-dialog/list-create-dialog.component';

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
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(async params => {
      const itemId = params.itemId;
      if (itemId != null) {
        this.item = await this.planningService.getItem(itemId);
        await this.loadLists();
      }
    });
  }

  async loadLists() {
    this.lists = await this.planningService.getLists(this.item.id);
  }

  showListEditCreateDialog(list?: List) {
    const dialogRef = this.dialog.open(ListCreateDialogComponent, {
      width: '400px',
      data: list || new List({ itemId: this.item.id, relationsType: ListRelationsType.UNORDERED }),
    });

    dialogRef.afterClosed().subscribe(async result => {
      await this.loadLists();
    });
  }

  async deleteList(list: List) {
    try {
      await this.planningService.deleteEntity(list, EntityBaseUrl.List);
      await this.loadLists();
    } catch (e) {
      alert(JSON.stringify(e));
    }
  }

  dispatchListAction($event: { action: string; data: List }) {
    if ($event.action === 'edit') { return this.showListEditCreateDialog($event.data); }
    if ($event.action === 'delete') { return this.deleteList($event.data); }
  }
}
