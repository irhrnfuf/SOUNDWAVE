import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface BookFestivalPassData {
  festivalPass_insert: FestivalPass_Key;
}

export interface BookFestivalPassVariables {
  passCode: string;
  attendeeName: string;
  email: string;
  passTier: string;
  festivalDay: string;
  quantity: number;
  totalPrice: number;
  favoriteArtist?: string | null;
}

export interface CancelFestivalPassData {
  festivalPass_delete?: FestivalPass_Key | null;
}

export interface CancelFestivalPassVariables {
  id: UUIDString;
}

export interface FestivalPass_Key {
  id: UUIDString;
  __typename?: 'FestivalPass_Key';
}

export interface GetFestivalPassData {
  festivalPass?: {
    id: UUIDString;
    passCode: string;
    attendeeName: string;
    email: string;
    passTier: string;
    festivalDay: string;
    quantity: number;
    totalPrice: number;
    favoriteArtist?: string | null;
    createdAt: TimestampString;
  } & FestivalPass_Key;
}

export interface GetFestivalPassVariables {
  id: UUIDString;
}

export interface ListFestivalPassesData {
  festivalPasses: ({
    id: UUIDString;
    passCode: string;
    attendeeName: string;
    email: string;
    passTier: string;
    festivalDay: string;
    quantity: number;
    totalPrice: number;
    favoriteArtist?: string | null;
    createdAt: TimestampString;
  } & FestivalPass_Key)[];
}

interface BookFestivalPassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: BookFestivalPassVariables): MutationRef<BookFestivalPassData, BookFestivalPassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: BookFestivalPassVariables): MutationRef<BookFestivalPassData, BookFestivalPassVariables>;
  operationName: string;
}
export const bookFestivalPassRef: BookFestivalPassRef;

export function bookFestivalPass(vars: BookFestivalPassVariables): MutationPromise<BookFestivalPassData, BookFestivalPassVariables>;
export function bookFestivalPass(dc: DataConnect, vars: BookFestivalPassVariables): MutationPromise<BookFestivalPassData, BookFestivalPassVariables>;

interface CancelFestivalPassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CancelFestivalPassVariables): MutationRef<CancelFestivalPassData, CancelFestivalPassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CancelFestivalPassVariables): MutationRef<CancelFestivalPassData, CancelFestivalPassVariables>;
  operationName: string;
}
export const cancelFestivalPassRef: CancelFestivalPassRef;

export function cancelFestivalPass(vars: CancelFestivalPassVariables): MutationPromise<CancelFestivalPassData, CancelFestivalPassVariables>;
export function cancelFestivalPass(dc: DataConnect, vars: CancelFestivalPassVariables): MutationPromise<CancelFestivalPassData, CancelFestivalPassVariables>;

interface ListFestivalPassesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListFestivalPassesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListFestivalPassesData, undefined>;
  operationName: string;
}
export const listFestivalPassesRef: ListFestivalPassesRef;

export function listFestivalPasses(options?: ExecuteQueryOptions): QueryPromise<ListFestivalPassesData, undefined>;
export function listFestivalPasses(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListFestivalPassesData, undefined>;

interface GetFestivalPassRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetFestivalPassVariables): QueryRef<GetFestivalPassData, GetFestivalPassVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetFestivalPassVariables): QueryRef<GetFestivalPassData, GetFestivalPassVariables>;
  operationName: string;
}
export const getFestivalPassRef: GetFestivalPassRef;

export function getFestivalPass(vars: GetFestivalPassVariables, options?: ExecuteQueryOptions): QueryPromise<GetFestivalPassData, GetFestivalPassVariables>;
export function getFestivalPass(dc: DataConnect, vars: GetFestivalPassVariables, options?: ExecuteQueryOptions): QueryPromise<GetFestivalPassData, GetFestivalPassVariables>;

