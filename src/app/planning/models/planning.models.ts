export class BaseEntityModel {
  id: number;
  tags: string[];
}

export class Category extends BaseEntityModel {
  name: string;
}

// TODO: extract enums to separate package for reusing on both BE and FE
export enum ItemType {
  ACTION = 'action',
  EVENT = 'event',
  TASK = 'task',
}

export class Item extends BaseEntityModel {
  name: string;
  description = '';
  type: ItemType;
  categoryId: number;

  constructor(params: Partial<Item> = {}) {
    super();
    Object.assign(this, params);
  }
}

export enum ListRelationsType {
  ORDERED = 'ordered',
  UNORDERED = 'unordered',
}

export class List extends BaseEntityModel {
  name: string;
  relationsType: ListRelationsType;
  itemId: number;
  listItems?: ListItem[];

  constructor(params: Partial<List>) {
    super();
    Object.assign(this, params);
  }
}

export class ListItem extends BaseEntityModel {
  label: string;
  isCompleted: boolean;

  constructor() {
    super();
    this.isCompleted = false;
    this.label = '';
    this.tags = [];
  }
}
export enum EntityBaseUrl {
  Category = 'category',
  Item = 'item',
  List = 'list',
}
