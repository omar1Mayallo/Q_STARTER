export interface ValidationFieldError<T> {
  field: T;
  message: string;
}

export interface ResponseErrorsI<T extends string | undefined = undefined> {
  statusCode?: number;
  message?: string;
  error?: string; // NestHTTP & Database & Other Errors
  errors?: ValidationFieldError<T>[]; // Validation Errors
}

export interface PaginationDetails {
  currentPage?: number;
  numOfItemsPerPage?: number;
  numOfPages?: number;
  nextPage?: number;
  previousPage?: number;
  totalNumOfItems?: number;
}

export interface GetAllResponseI<Model> {
  data: Model[];
  paginationDetails: PaginationDetails;
}
