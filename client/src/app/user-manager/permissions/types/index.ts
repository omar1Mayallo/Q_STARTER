interface Action {
  action_key: string;
  action_ar_name: string;
  action_en_name: string;
  action_category: string;
}

interface Entity {
  entity_key: string;
  entity_module_parent_key: string;
  entity_ar_name: string;
  entity_en_name: string;
  actions: Action[];
}

interface Module {
  module_key: string;
  module_ar_name: string;
  module_en_name: string;
  module_parent_key: string | null;
  module_source: string;
  entities: Entity[];
}

export type PermissionsTreeI = Module[];
