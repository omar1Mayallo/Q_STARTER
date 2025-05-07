export interface IPermission {
  module_key: string;
  module_ar_name: string;
  module_en_name: string;
  module_parent_key?: string;
  module_source: string;
  module_icon?: string;
  entity_key: string;
  entity_module_parent_key: string;
  entity_ar_name: string;
  entity_en_name: string;
  entity_url: string;
  entity_icon?: string;
  order: number;
  action_key: string;
  action_ar_name: string;
  action_en_name: string;
}

export type ModuleProps =
  | 'module_key'
  | 'module_ar_name'
  | 'module_en_name'
  | 'module_parent_key'
  | 'module_source'
  | 'module_icon';

export type EntityProps =
  | 'entity_key'
  | 'entity_module_parent_key'
  | 'entity_ar_name'
  | 'entity_en_name'
  | 'entity_url'
  | 'entity_icon'
  | 'order';
