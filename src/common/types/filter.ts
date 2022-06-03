export enum FilterType {
  Text,
  CheckBox
}

export interface Filter {
  field: string;
  value: string;
  type: FilterType;
}
