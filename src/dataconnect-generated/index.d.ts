import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddMovieToListData {
  listItem_insert: ListItem_Key;
}

export interface AddMovieToListVariables {
  listId: UUIDString;
  movieId: UUIDString;
  note?: string | null;
  position: number;
}

export interface CreateNewListData {
  list_insert: List_Key;
}

export interface CreateNewListVariables {
  name: string;
  description?: string | null;
  isPublic?: boolean | null;
}

export interface GetMoviesInListData {
  list?: {
    movies_via_ListItem: ({
      id: UUIDString;
      title: string;
      year: number;
      summary?: string | null;
      runtime?: number | null;
      genres?: string[] | null;
    } & Movie_Key)[];
  };
}

export interface GetMoviesInListVariables {
  listId: UUIDString;
}

export interface GetMyListsData {
  lists: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    isPublic?: boolean | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & List_Key)[];
}

export interface ListItem_Key {
  listId: UUIDString;
  movieId: UUIDString;
  __typename?: 'ListItem_Key';
}

export interface List_Key {
  id: UUIDString;
  __typename?: 'List_Key';
}

export interface Movie_Key {
  id: UUIDString;
  __typename?: 'Movie_Key';
}

export interface Review_Key {
  id: UUIDString;
  __typename?: 'Review_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface Watch_Key {
  id: UUIDString;
  __typename?: 'Watch_Key';
}

interface CreateNewListRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewListVariables): MutationRef<CreateNewListData, CreateNewListVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNewListVariables): MutationRef<CreateNewListData, CreateNewListVariables>;
  operationName: string;
}
export const createNewListRef: CreateNewListRef;

export function createNewList(vars: CreateNewListVariables): MutationPromise<CreateNewListData, CreateNewListVariables>;
export function createNewList(dc: DataConnect, vars: CreateNewListVariables): MutationPromise<CreateNewListData, CreateNewListVariables>;

interface GetMyListsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyListsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyListsData, undefined>;
  operationName: string;
}
export const getMyListsRef: GetMyListsRef;

export function getMyLists(): QueryPromise<GetMyListsData, undefined>;
export function getMyLists(dc: DataConnect): QueryPromise<GetMyListsData, undefined>;

interface AddMovieToListRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddMovieToListVariables): MutationRef<AddMovieToListData, AddMovieToListVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddMovieToListVariables): MutationRef<AddMovieToListData, AddMovieToListVariables>;
  operationName: string;
}
export const addMovieToListRef: AddMovieToListRef;

export function addMovieToList(vars: AddMovieToListVariables): MutationPromise<AddMovieToListData, AddMovieToListVariables>;
export function addMovieToList(dc: DataConnect, vars: AddMovieToListVariables): MutationPromise<AddMovieToListData, AddMovieToListVariables>;

interface GetMoviesInListRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMoviesInListVariables): QueryRef<GetMoviesInListData, GetMoviesInListVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMoviesInListVariables): QueryRef<GetMoviesInListData, GetMoviesInListVariables>;
  operationName: string;
}
export const getMoviesInListRef: GetMoviesInListRef;

export function getMoviesInList(vars: GetMoviesInListVariables): QueryPromise<GetMoviesInListData, GetMoviesInListVariables>;
export function getMoviesInList(dc: DataConnect, vars: GetMoviesInListVariables): QueryPromise<GetMoviesInListData, GetMoviesInListVariables>;

