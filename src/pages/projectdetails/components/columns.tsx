

// @ts-nocheck
import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

import { labels, priorities, statuses } from '../data/data'
import { Task } from '../data/schema'
import { Button } from '@/components/custom/button'
import ProjectView from '@/components/project-view'

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'project_id',
    header: 'Project ID',
    cell: ({ row }) => <div>{row.getValue('project_id')}</div>,
  },
  {
    accessorKey: 'project_name',
    header: 'Project Name',
    cell: ({ row }) => <div>{row.getValue('project_name')}</div>,
  },
  {
    accessorKey: 'project_description',
    header: 'Project Description',
    cell: ({ row }) => <div>{row.getValue('project_description') || 'N/A'}</div>,
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => <div>{row.getValue('location')}</div>,
  },
  {
    accessorKey: 'budget',
    header: 'Budget',
    cell: ({ row }) => <div>{row.getValue('budget')}</div>,
  },
  {
    accessorKey: 'material',
    header: 'Material',
    cell: ({ row }) => <div>{row.getValue('material')}</div>,
  },
  {
    accessorKey: 'user_name',
    header: 'User Name',
    cell: ({ row }) => <div>{row.getValue('user_name') || 'N/A'}</div>,
  },
  {
    accessorKey: 'user_id',
    header: 'User ID',
    cell: ({ row }) => <div>{row.getValue('user_id') || 'N/A'}</div>,
  },
 
  {
    accessorKey: 'project_id',
    header: 'Action',
    cell: ({ row }) => (
     <ProjectView project_id={row.getValue('project_id')} />
    ),
  },
]
