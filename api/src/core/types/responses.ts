
export type ReadListResponse<T> = {
  items: T[];
  totalCount: number;
}

export type ReadResponse<T> = {
  item: T;
}

export type CreateResponse<T> = {
  item: T;
}

export type UpdateResponse<T> = {
  item: T;
}

export type DeleteResponse = {
  success: boolean;
}

export type ErrorResponse = {
  message: string;
}
