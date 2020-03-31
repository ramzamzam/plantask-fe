import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PlanningComponent } from './planning.component';
import { ItemsComponent } from './items/items.component';
import { CardFullComponent } from './items/card-full/card-full.component';


const routes = [
  {
    path: '',
    component: PlanningComponent,
    children: [
      {path: '', component: ItemsComponent },
      {path: 'category/:categoryId', component: ItemsComponent},
      {path: 'item/:itemId', component: CardFullComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningRoutingModule { }
