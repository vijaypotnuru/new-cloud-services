// @ts-nocheck
import {
  IconApps,
  IconBarrierBlock,
  IconBoxSeam,
  IconChartHistogram,
  IconChecklist,
  IconComponents,
  IconError404,
  IconExclamationCircle,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
  IconHexagonNumber5,
  IconLayoutDashboard,
  IconMessages,
  IconRouteAltLeft,
  IconServerOff,
  IconSettings,
  IconTruck,
  IconUserShield,
  IconUsers,
  IconLock,
  IconBriefcase,
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
  roles: string[]
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Projects',
    label: '',
    href: '/main/projects',
    icon: <IconChecklist size={18} />,
    roles: ['Admin'],
  },
  {
    title: 'Projects Creation',
    label: '',
    href: '/main/projects-creation',
    icon: <IconBriefcase size={18} />,
    roles: ['Admin'],
  },

  {
    title: 'Project Details',
    label: '',
    href: '/user',
    icon: <IconBriefcase size={18} />,
    roles: ['User'],
  },
  {
    title: 'Transactions',
    label: '',
    href: '/user/transactions',
    icon: <IconBriefcase size={18} />,
    roles: ['User'],
  },
]
