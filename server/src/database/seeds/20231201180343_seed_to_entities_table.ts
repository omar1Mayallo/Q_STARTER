import { Knex } from 'knex';
import { TABLES } from '../../shared/constants/tables';

export async function seed(knex: Knex): Promise<void> {
  await knex(TABLES.ENTITY).del();

  await knex(TABLES.ENTITY).insert([
    {
      module_key: 'portal-panel',
      entity_key: 'contacts',
      en_name: 'Contacts',
      ar_name: 'جهات الاتصال',
      entity_url: 'contacts',
      order: 0,
      icon: 'Contacts',
    },
    {
      module_key: 'portal-panel',
      entity_key: 'dictionary',
      en_name: 'Dictionary',
      ar_name: 'لوحة التحكم',
      entity_url: 'Dictionary',
      order: 1,
      icon: 'dictionary',
    },
    {
      module_key: 'admin-panel',
      entity_key: 'dashboard',
      en_name: 'Dashboard',
      ar_name: 'لوحة التحكم',
      entity_url: 'dashboard',
      order: 0,
      icon: 'Dashboard',
    },
    {
      module_key: 'users-management',
      entity_key: 'users',
      en_name: 'Users',
      ar_name: 'المستخدمين',
      entity_url: 'users-management/users',
      order: 1,
      icon: 'AccountCircle',
    },
    {
      module_key: 'users-management',
      entity_key: 'roles',
      en_name: 'Roles',
      ar_name: 'الأدوار',
      entity_url: 'users-management/roles',
      order: 2,
      icon: 'PsychologyAlt',
    },
    {
      module_key: 'users-management',
      entity_key: 'groups',
      en_name: 'Groups',
      ar_name: 'المجموعات',
      entity_url: 'users-management/groups',
      order: 3,
      icon: 'Groups',
    },
    {
      module_key: 'admin-panel',
      entity_key: 'settings',
      en_name: 'Settings',
      ar_name: 'الاعدادات',
      entity_url: 'settings',
      order: 11,
      icon: 'Settings',
    },

    {
      module_key: 'financial-services',
      entity_key: 'plans',
      en_name: 'Plans',
      ar_name: 'خطط الاسعار',
      entity_url: 'financial-services/plans',
      order: 4,
      icon: 'LocalOffer',
    },
    {
      module_key: 'billing-management',
      entity_key: 'invoices',
      en_name: 'Invoices',
      ar_name: 'الفواتير',
      entity_url: 'financial-services/billing-management/invoices',
      order: 5,
      icon: 'Receipt',
    },
    {
      module_key: 'billing-management',
      entity_key: 'payments',
      en_name: 'Payments',
      ar_name: 'المدفوعات',
      entity_url: 'financial-services/billing-management/payments',
      order: 6,
      icon: 'payments.png',
    },
    {
      module_key: 'billing-management',
      entity_key: 'dues',
      en_name: 'Dues',
      ar_name: 'المستحقات',
      entity_url: 'financial-services/billing-management/dues',
      order: 7,
      icon: 'fees.png',
    },

    {
      module_key: 'billing-settings',
      entity_key: 'configurations',
      en_name: 'Configurations',
      ar_name: 'الضبط',
      entity_url:
        'financial-services/billing-management/billing-settings/configurations',
      order: 8,
      icon: 'b-settings.png',
    },

    {
      module_key: 'customers-management',
      entity_key: 'customers',
      en_name: 'Customers',
      ar_name: 'العملاء',
      entity_url: 'customers-management/customers',
      order: 8,
      icon: 'SwitchAccount',
    },
    {
      module_key: 'customers-management',
      entity_key: 'subscriptions',
      en_name: 'Subscriptions',
      ar_name: 'الاشتراكات',
      entity_url: 'customers-management/subscriptions',
      order: 9,
      icon: 'Subscriptions',
    },
  ]);
}
