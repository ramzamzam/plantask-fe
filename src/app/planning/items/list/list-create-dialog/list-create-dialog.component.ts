import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlanningService } from '../../../services/planning.service';
import { List } from '../../../models/planning.models';

@Component({
  selector: 'app-list-create-dialog',
  templateUrl: './list-create-dialog.component.html',
  styleUrls: ['./list-create-dialog.component.css']
})
export class ListCreateDialogComponent implements OnInit {
  tag: string;

  constructor(
    public dialogRef: MatDialogRef<ListCreateDialogComponent>,
    private planningService: PlanningService,
    @Inject(MAT_DIALOG_DATA) public data: List
  ) {
    if (!this.data.tags) { this.data.tags = []; }
  }

  ngOnInit(): void {}

  async save() {
    try {
      const list = await this.planningService.createList(this.data);
      this.dialogRef.close(list);
    } catch (e) {
      alert(JSON.stringify(e.error.validations));
    }
  }
  // TODO: extract tags logic to separate components
  addTag() {
    if (this.tag) { this.data.tags.push(this.tag); }
    this.tag = null;
  }

  removeTag(tag: string) {
    this.data.tags.splice(this.data.tags.indexOf(tag), 1);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

