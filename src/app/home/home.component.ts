import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {PlanningService} from '../services/planning.service';
import {Category} from '../models/cotegory';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  activeCategory: Category;
  constructor(private planningService: PlanningService) { }

  ngOnInit() {
  }

  activateCategory(category: Category) {
    this.activeCategory = category;
  }
}
