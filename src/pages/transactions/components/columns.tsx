
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
    accessorKey: 'payment_id',
    header: 'Payment ID',
    cell: ({ row }) => <div>{row.getValue('payment_id')}</div>,
  },
  {
    accessorKey: 'planname',
    header: 'Plan Name',
    cell: ({ row }) => <div>{row.getValue('planname')}</div>,
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => <div>{row.getValue('amount') || 'N/A'}</div>,
  },
  {
    accessorKey: 'transaction_id',
    header: 'Transaction ID',
    cell: ({ row }) => <div>{row.getValue('transaction_id')}</div>,
  },
  {
    accessorKey: 'mtransaction_id',
    header: 'M Transaction ID',
    cell: ({ row }) => <div>{row.getValue('mtransaction_id')}</div>,
  },
  {
    accessorKey: 'user_id',
    header: 'User ID',
    cell: ({ row }) => <div>{row.getValue('user_id')}</div>,
  },
  // {
  //   accessorKey: 'user_name',
  //   header: 'User Name',
  //   cell: ({ row }) => <div>{row.getValue('user_name') || 'N/A'}</div>,
  // },
  // {
  //   accessorKey: 'user_id',
  //   header: 'User ID',
  //   cell: ({ row }) => <div>{row.getValue('user_id') || 'N/A'}</div>,
  // },
 
  // {
  //   accessorKey: 'project_id',
  //   header: 'Action',
  //   cell: ({ row }) => (
  //    <ProjectView project_id={row.getValue('project_id')} />
  //   ),
  // },
]
