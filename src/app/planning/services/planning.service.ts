import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {BaseEntityModel, Category, EntityBaseUrl, Item, List, ListItem} from '../models/planning.models';

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
    return this.http.get<Category[]>(this.url(EntityBaseUrl.Category)).toPromise();
  }


  getItems(categoryId: number): Promise<Item[]> {
    let params = {};
    if (categoryId) {
      params = {
        categoryId: categoryId.toString(10),
      };
    }
    return this.http.get<Item[]>(this.url(EntityBaseUrl.Item), { params })
      .toPromise();
  }

  async createCategory(data: Partial<Category>): Promise<Category> {
    return this.http.post<Category>(this.url(EntityBaseUrl.Category), data).toPromise();
  }

  async updateCategory(data: Category): Promise<Category> {
    return this.http.patch<Category>(this.url(EntityBaseUrl.Category, data.id), data).toPromise();
  }

  async getCategory(categoryId: number): Promise<Category> {
    return this.http.get<Category>(this.url(EntityBaseUrl.Category, categoryId)).toPromise();
  }

  async createItem(itemAttrs: Partial<Item>): Promise<Item> {
    const { name, description, tags, type, categoryId } = itemAttrs;
    return this.http.post<Item>(this.url(EntityBaseUrl.Item), {
      name, description, tags, type, categoryId,
    }).toPromise();
  }

  private updateItem(data: Item): Promise<Item> {
    return this.http.patch<Item>(this.url(EntityBaseUrl.Item, data.id), data).toPromise();
  }

  async getItem(itemId: number): Promise<Item> {
    return this.http.get<Item>(this.url(EntityBaseUrl.Item, itemId)).toPromise();
  }

  async getLists(itemId: number): Promise<List[]> {
    const params = { itemId: itemId.toString(10) };
    return this.http.get<List[]>(this.url(EntityBaseUrl.List), { params }).toPromise();
  }

  async createList(data: Partial<List>): Promise<List> {
    const { itemId, name, tags, relationsType } = data;
    return this.http.post<List>(this.url(EntityBaseUrl.List), { itemId, name, tags, relationsType }).toPromise();
  }

  async updateList(data: List): Promise<List> {
    return this.http.patch<List>(this.url(EntityBaseUrl.List, data.id), data).toPromise();
  }

  async updateListItems(list: List): Promise<ListItem[]> {
    return this.http.put<ListItem[]>(
      this.url(EntityBaseUrl.List, list.id) + '/items',
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

  async createOrUpdateCategory(data: Category): Promise<Category> {
    if (data.id) { return this.updateCategory(data); }
    return this.createCategory(data);
  }

  async createOrUpdateItem(data: Item): Promise<Item> {
    if (data.id) { return this.updateItem(data); }
    return this.createItem(data);
  }

  async createOrUpdateList(data: List) {
    if (data.id) { return this.updateList(data); }
    return this.createList(data);
  }

  async deleteEntity<T extends BaseEntityModel>(data: T, entityBaseUrl: EntityBaseUrl): Promise<any> {
    return this.http.delete<any>(this.url(entityBaseUrl, data.id)).toPromise();
  }
}
