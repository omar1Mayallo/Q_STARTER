// seed_modules.ts
import { Knex } from 'knex';
import { TABLES } from '../../shared/constants/tables';
import { USER_TYPE } from '../../shared/types/enums';

export async function seed(knex: Knex): Promise<void> {
  await knex(TABLES.MODULE).del();

  await knex(TABLES.MODULE).insert([
    {
      module_key: 'admin-panel',
      en_name: 'Admin Panel',
      ar_name: 'لوحة التحكم للمشرف',
      source: USER_TYPE.ADMINISTRATIVE,
    },
    {
      module_key: 'users-management',
      en_name: 'Users Management',
      ar_name: 'إدارة المستخدمين',
      source: USER_TYPE.ADMINISTRATIVE,
      icon: 'Diversity3', // MUI Icons Name or imageLink or ex: "path-to-public.svg"
      parent_key: 'admin-panel',
    },
    {
      module_key: 'financial-services',
      en_name: 'Financial Services',
      ar_name: 'الخدمات المالية',
      source: USER_TYPE.ADMINISTRATIVE,
      icon: 'MonetizationOn', // MUI Icons Name or imageLink or ex: "path-to-public.svg"
      parent_key: 'admin-panel',
    },
    {
      module_key: 'billing-management',
      en_name: 'Billing Management',
      ar_name: 'إدارة الفواتير',
      source: USER_TYPE.ADMINISTRATIVE,
      icon: 'RequestQuote', // MUI Icons Name or imageLink or ex: "path-to-public.svg"
      parent_key: 'financial-services',
    },
    {
      module_key: 'billing-settings',
      en_name: 'Billing Settings',
      ar_name: 'اعدادات الفواتير',
      source: USER_TYPE.ADMINISTRATIVE,
      icon: 'billing-settings.png', // MUI Icons Name or imageLink or ex: "path-to-public.svg"
      parent_key: 'billing-management',
    },
    {
      module_key: 'customers-management',
      en_name: 'Customers Management',
      ar_name: 'إدارة العملاء',
      source: USER_TYPE.ADMINISTRATIVE,
      icon: 'SupportAgent', // MUI Icons Name or imageLink or ex: "path-to-public.svg"
      parent_key: 'admin-panel',
    },
    {
      module_key: 'portal-panel',
      en_name: 'Portal Panel',
      ar_name: 'لوحة البوابة',
      source: USER_TYPE.PORTAL,
    },
  ]);
}
