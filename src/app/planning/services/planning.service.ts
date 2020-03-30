import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Category, Item } from '../models/planning.models';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  baseUrl = `${environment.apiUrl}/planning`;

  constructor(private http: HttpClient) { }

  private url(resource, id?) {
    const route = `${this.baseUrl}/${resource}`;

    if (id) { return route + `/${id}`; }
    return route;
  }

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

  async getCategory(categoryId: number): Promise<Category> {
    return this.http.get<Category>(this.url('category', categoryId)).toPromise();
  }

  createItem(itemAttrs: Partial<Item>): Promise<Item> {
    const { name, description, tags, type, categoryId } = itemAttrs;
    return this.http.post<Item>(this.url('item'), {
      name, description, tags, type, categoryId,
    }).toPromise();
  }
}
