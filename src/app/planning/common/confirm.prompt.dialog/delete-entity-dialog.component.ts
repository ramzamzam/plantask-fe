import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlanningService } from '../../services/planning.service';
import { BaseEntityModel, EntityBaseUrl } from '../../models/planning.models';

interface DeleteDialogData {
  entity: BaseEntityModel;
  baseUrl: EntityBaseUrl;
  question: string;
}

@Component({
  selector: 'app-confirm.prompt.dialog',
  templateUrl: './delete-entity-dialog.component.html',
  styleUrls: ['./delete-entity-dialog.component.css']
})
export class DeleteEntityDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteEntityDialogComponent>,
    private planningService: PlanningService,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  async delete() {
    try {
      await this.planningService.deleteEntity(this.data.entity, this.data.baseUrl);
      this.dialogRef.close(true);
    } catch (e) {
      alert(JSON.stringify(e));
    }
  }
}
