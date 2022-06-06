export enum FilterType {
  Text,
  CheckBox,
  Range,
  Calendar,
}

export interface RangeValue {
  min: number;
  max: number;
}

export interface CheckboxValue {
  value: string;
  checked: boolean;
}

export interface Filter {
  field: string;
  value: string;
  type?: FilterType;
}
