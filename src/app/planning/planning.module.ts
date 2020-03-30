import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningComponent } from './planning.component';
import { CategoriesComponent, DialogOverviewExampleDialog } from './categories/categories.component';
import { ItemsComponent } from './items/items.component';
import { FormsModule } from '@angular/forms';
import { PlanningRoutingModule } from './planning.routing';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../material/material.module';
import { ItemCardComponent } from './items/card/item-card.component';
import { ItemCreateDialogComponent } from './items/dialogs/item.create.dialog';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    PlanningComponent,
    CategoriesComponent,
    ItemsComponent,
    DialogOverviewExampleDialog,
    ItemCardComponent,
    ItemCreateDialogComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    PlanningRoutingModule,
    RouterModule,
    FontAwesomeModule,
    MaterialModule,
    MatCardModule,
  ],
  bootstrap: [PlanningComponent]
})
export class PlanningModule { }
