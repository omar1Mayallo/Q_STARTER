export interface PaginationDetails {
  currentPage?: number;
  numOfItemsPerPage?: number;
  numOfPages?: number;
  nextPage?: number;
  previousPage?: number;
}

export interface GetAllResponse<Model> {
  data: Model[];
  paginationDetails: PaginationDetails;
}
