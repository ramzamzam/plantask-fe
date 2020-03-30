import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item, ItemType } from '../../models/planning.models';
import { PlanningService } from '../../services/planning.service';

@Component({
  selector: 'app-item-create-dialog',
  templateUrl: 'item.create.dialog.html',
  styleUrls: ['item.create.dialog.css']
})
export class ItemCreateDialogComponent {
  tag: string;
  itemTypes = [
    { title: 'Action', value: ItemType.ACTION },
    { title: 'Event', value: ItemType.EVENT },
    { title: 'Task', value: ItemType.TASK },
  ];

  constructor(
    public dialogRef: MatDialogRef<ItemCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item,
    private planningService: PlanningService,
  ) {
    if (!this.data.tags) { this.data.tags = []; }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async save() {
    try {
      const item = await this.planningService.createItem(this.data);
      this.dialogRef.close(item);
    } catch (e) {
      alert(JSON.stringify(e.error.validations));
    }
  }

  addTag() {
    if (this.tag) { this.data.tags.push(this.tag); }
    this.tag = null;
  }

  removeTag(tag: string) {
    this.data.tags.splice(this.data.tags.indexOf(tag), 1);
  }
}
