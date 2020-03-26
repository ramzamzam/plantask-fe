export class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export class AuthenticatedUserDTO {
  accessToken: string;
  refreshToken: string;
  user: User;
}

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
  description: string;
  type: ItemType;
  categoryId: number;
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
}

export class ListItem extends BaseEntityModel {
  label: string;
  isCompleted: boolean;
}
