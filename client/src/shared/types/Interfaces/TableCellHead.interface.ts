export interface TableHeadCell<Model> {
  id: keyof Model | "actions";
  disablePadding: boolean;
  label: string;
  numeric: boolean;
  sortable: boolean;
}
