import { Knex } from 'knex';
import { TABLES } from '../../shared/constants/tables';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLES.ROLES).del();

  // Inserts seed entries
  await knex(TABLES.ROLES).insert([
    {
      name: 'Super Admin',
      description: 'Full access to all system features and settings.',
      status: 'ACTIVE',
      type: 'ADMINISTRATIVE',
    },
    {
      name: 'Admin',
      description:
        'Manages users and system settings, but with some restrictions.',
      status: 'INACTIVE',
      type: 'ADMINISTRATIVE',
    },
    {
      name: 'Customer',
      description: 'Standard user with access to basic features.',
      status: 'ACTIVE',
      type: 'PORTAL',
    },
    {
      name: 'Manager',
      description: 'Oversees team operations and manages resources.',
      status: 'ACTIVE',
      type: 'ADMINISTRATIVE',
    },
    {
      name: 'Editor',
      description: 'Can create and edit content, but cannot publish.',
      status: 'ACTIVE',
      type: 'PORTAL',
    },
    {
      name: 'Viewer',
      description: 'Can view content but cannot make any changes.',
      status: 'INACTIVE',
      type: 'PORTAL',
    },
    {
      name: 'Contributor',
      description:
        'Can contribute content but requires approval for publishing.',
      status: 'ACTIVE',
      type: 'PORTAL',
    },
    {
      name: 'Moderator',
      description: 'Monitors and moderates user content.',
      status: 'INACTIVE',
      type: 'ADMINISTRATIVE',
    },
    {
      name: 'Support Agent',
      description: 'Provides customer support and resolves issues.',
      status: 'ACTIVE',
      type: 'PORTAL',
    },
    {
      name: 'Developer',
      description: 'Develops and maintains system features.',
      status: 'INACTIVE',
      type: 'ADMINISTRATIVE',
    },
    {
      name: 'Tester',
      description: 'Tests system features and reports bugs.',
      status: 'ACTIVE',
      type: 'PORTAL',
    },
    {
      name: 'HR Manager',
      description: 'Manages HR-related activities and employee records.',
      status: 'INACTIVE',
      type: 'ADMINISTRATIVE',
    },
    {
      name: 'Finance Manager',
      description: 'Manages financial transactions and records.',
      status: 'ACTIVE',
      type: 'ADMINISTRATIVE',
    },
    {
      name: 'Sales Representative',
      description: 'Handles sales and customer interactions.',
      status: 'INACTIVE',
      type: 'PORTAL',
    },
    {
      name: 'Marketing Specialist',
      description: 'Develops and executes marketing strategies.',
      status: 'INACTIVE',
      type: 'PORTAL',
    },
    {
      name: 'Product Manager',
      description: 'Oversees product development and strategy.',
      status: 'ACTIVE',
      type: 'ADMINISTRATIVE',
    },
    {
      name: 'Project Manager',
      description: 'Manages projects and coordinates team efforts.',
      status: 'ACTIVE',
      type: 'PORTAL',
    },
    {
      name: 'System Analyst',
      description: 'Analyzes system requirements and performance.',
      status: 'ACTIVE',
      type: 'PORTAL',
    },
    {
      name: 'Data Analyst',
      description: 'Analyzes data to provide insights and reports.',
      status: 'INACTIVE',
      type: 'ADMINISTRATIVE',
    },
    {
      name: 'Researcher',
      description: 'Conducts research and provides findings.',
      status: 'ACTIVE',
      type: 'PORTAL',
    },
  ]);
}
