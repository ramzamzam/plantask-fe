import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Category, Item, List, ListItem} from '../models/planning.models';
import {ProgressBarMode} from '@angular/material/progress-bar';

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

  async getItem(itemId: number): Promise<Item> {
    return this.http.get<Item>(this.url('item', itemId)).toPromise();
  }

  async getLists(itemId: number): Promise<List[]> {
    const params = { itemId: itemId.toString(10) };
    return this.http.get<List[]>(this.url('list'), { params }).toPromise();
  }

  async createList(data: Partial<List>) {
    const { itemId, name, tags, relationsType } = data;
    return this.http.post<List>(this.url('list'), { itemId, name, tags, relationsType }).toPromise();
  }

  async updateListItems(list: List): Promise<ListItem[]> {
    return this.http.put<ListItem[]>(
      this.url('list', list.id) + '/items',
      {
        items: list.listItems.map(item => {
          return {
            label: item.label,
            tags: item.tags,
            isCompleted: item.isCompleted
          };
        }),
      }
    ).toPromise();
  }
}