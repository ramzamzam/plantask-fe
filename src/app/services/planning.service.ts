import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Category, Item} from '../models/cotegory';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  baseUrl = `${environment.apiUrl}/planning`;

  constructor(private http: HttpClient) { }

  private url(resource) { return `${this.baseUrl}/${resource}`; }

  getCategories(): Promise<Category[]> {
    return this.http.get<Category[]>(this.url('category')).toPromise();
  }


  getItems(categoryId: number): Promise<Item[]> {
    let params = {};
    if (categoryId) {
      params = {
        categoryId: categoryId.toString(10),
      };
    }
    return this.http.get<Item[]>(this.url('item'), { params })
      .toPromise();
  }

  async createCategory(name: string): Promise<Category> {
    return this.http.post<Category>(this.url('category'), {
      name
    }).toPromise();
  }
}
