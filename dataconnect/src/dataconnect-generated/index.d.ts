import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateItemData {
  item_insert: Item_Key;
}

export interface CreateItemVariables {
  name: string;
  description?: string | null;
}

export interface DeleteItemData {
  item_delete?: Item_Key | null;
}

export interface DeleteItemVariables {
  id: UUIDString;
}

export interface GetItemData {
  item?: {
    id: UUIDString;
    name: string;
    description?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Item_Key;
}

export interface GetItemVariables {
  id: UUIDString;
}

export interface Item_Key {
  id: UUIDString;
  __typename?: 'Item_Key';
}

export interface ListItemsData {
  items: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    createdAt: TimestampString;
  } & Item_Key)[];
}

export interface UpdateItemData {
  item_update?: Item_Key | null;
}

export interface UpdateItemVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
}

interface CreateItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateItemVariables): MutationRef<CreateItemData, CreateItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateItemVariables): MutationRef<CreateItemData, CreateItemVariables>;
  operationName: string;
}
export const createItemRef: CreateItemRef;

export function createItem(vars: CreateItemVariables): MutationPromise<CreateItemData, CreateItemVariables>;
export function createItem(dc: DataConnect, vars: CreateItemVariables): MutationPromise<CreateItemData, CreateItemVariables>;

interface UpdateItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateItemVariables): MutationRef<UpdateItemData, UpdateItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateItemVariables): MutationRef<UpdateItemData, UpdateItemVariables>;
  operationName: string;
}
export const updateItemRef: UpdateItemRef;

export function updateItem(vars: UpdateItemVariables): MutationPromise<UpdateItemData, UpdateItemVariables>;
export function updateItem(dc: DataConnect, vars: UpdateItemVariables): MutationPromise<UpdateItemData, UpdateItemVariables>;

interface DeleteItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteItemVariables): MutationRef<DeleteItemData, DeleteItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteItemVariables): MutationRef<DeleteItemData, DeleteItemVariables>;
  operationName: string;
}
export const deleteItemRef: DeleteItemRef;

export function deleteItem(vars: DeleteItemVariables): MutationPromise<DeleteItemData, DeleteItemVariables>;
export function deleteItem(dc: DataConnect, vars: DeleteItemVariables): MutationPromise<DeleteItemData, DeleteItemVariables>;

interface ListItemsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListItemsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListItemsData, undefined>;
  operationName: string;
}
export const listItemsRef: ListItemsRef;

export function listItems(options?: ExecuteQueryOptions): QueryPromise<ListItemsData, undefined>;
export function listItems(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListItemsData, undefined>;

interface GetItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetItemVariables): QueryRef<GetItemData, GetItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetItemVariables): QueryRef<GetItemData, GetItemVariables>;
  operationName: string;
}
export const getItemRef: GetItemRef;

export function getItem(vars: GetItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetItemData, GetItemVariables>;
export function getItem(dc: DataConnect, vars: GetItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetItemData, GetItemVariables>;

