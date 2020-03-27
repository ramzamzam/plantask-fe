import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {PlanningService} from './services/planning.service';
import {Category} from './models/planning.models';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
  activeCategory: Category;
  constructor(private router: Router,
  ) { }

  ngOnInit() {
  }

  activateCategory(category: Category) {
    this.activeCategory = category;
    this.router.navigate(['planning/category', `${category?.id || ''}`]);
  }
}
