import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'

const router = createBrowserRouter([
  // Auth routes
  {
    path: '/login',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in')).default,
    }),
  },
  {
    path: '/sign-in',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in-2')).default,
    }),
  },
  {
    path: '/sign-up',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-up')).default,
    }),
  },
  {
    path: '/forgot-password',
    lazy: async () => ({
      Component: (await import('./pages/auth/forgot-password')).default,
    }),
  },
  {
    path: '/otp',
    lazy: async () => ({
      Component: (await import('./pages/auth/otp')).default,
    }),
  },
  // {
  //   path: '/test',
  //   lazy: async () => ({
  //     Component: (await import('./pages/vibe-pattern-site/test')).default,
  //   }),
  // },
  // {
  //   path: '/test1',
  //   lazy: async () => ({
  //     Component: (await import('./pages/vibe-pattern-site/test1')).default,
  //   }),
  // },
  {
    path: '/home',
    lazy: async () => ({
      Component: (await import('./pages/vibe-pattern-site/home')).default,
    }),
  },
  {
    path: '/',
    lazy: async () => ({
      Component: (await import('./pages/vibe-pattern-site/loadingscreen'))
        .default,
    }),
  },
  {
    path: '/aboutus',
    lazy: async () => ({
      Component: (await import('./pages/vibe-pattern-site/aboutus')).default,
    }),
  },
  {
    path: '/contactus',
    lazy: async () => ({
      Component: (await import('./pages/vibe-pattern-site/contactus')).default,
    }),
  },
  {
    path: '/services',
    lazy: async () => ({
      Component: (await import('./pages/vibe-pattern-site/service')).default,
    }),
  },
  {
    path: '/brochure',
    lazy: async () => ({
      Component: (await import('./pages/vibe-pattern-site/brochure')).default,
    }),
  },
  {
    path: '/pay-success',
    lazy: async () => ({
      Component: (await import('./pages/pay-success')).default,
    }),
  },
  {
    path: '/pay-failed',
    lazy: async () => ({
      Component: (await import('./pages/pay-failed')).default,
    }),
  },

  // Main routes
  {
    path: '/main',
    lazy: async () => {
      const AppShell = await import('./components/app-shell')
      return { Component: AppShell.default }
    },
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('./pages/dashboard')).default,
        }),
      },
      {
        path: 'projects',
        lazy: async () => ({
          Component: (await import('@/pages/tasks')).default,
        }),
      },
      {
        path: 'projects/:project_id',
        lazy: async () => ({
          Component: (await import('@/pages/projectdetails')).default,
        }),
      },
      {
        path: 'users',
        lazy: async () => ({
          Component: (await import('@/pages/users')).default,
        }),
      },
      {
        path: 'projects-creation',
        lazy: async () => ({
          Component: (await import('@/pages/projects')).default,
        }),
      },

      {
        path: 'chats',
        lazy: async () => ({
          Component: (await import('@/pages/chats')).default,
        }),
      },
      {
        path: 'apps',
        lazy: async () => ({
          Component: (await import('@/pages/apps')).default,
        }),
      },
      {
        path: 'users',
        lazy: async () => ({
          Component: (await import('@/components/coming-soon')).default,
        }),
      },
      {
        path: 'analysis',
        lazy: async () => ({
          Component: (await import('@/components/coming-soon')).default,
        }),
      },
      {
        path: 'extra-components',
        lazy: async () => ({
          Component: (await import('@/pages/extra-components')).default,
        }),
      },
      {
        path: 'settings',
        lazy: async () => ({
          Component: (await import('./pages/settings')).default,
        }),
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import('./pages/settings/profile')).default,
            }),
          },
          {
            path: 'account',
            lazy: async () => ({
              Component: (await import('./pages/settings/account')).default,
            }),
          },
          {
            path: 'appearance',
            lazy: async () => ({
              Component: (await import('./pages/settings/appearance')).default,
            }),
          },
          {
            path: 'notifications',
            lazy: async () => ({
              Component: (await import('./pages/settings/notifications'))
                .default,
            }),
          },
          {
            path: 'display',
            lazy: async () => ({
              Component: (await import('./pages/settings/display')).default,
            }),
          },
          {
            path: 'error-example',
            lazy: async () => ({
              Component: (await import('./pages/settings/error-example'))
                .default,
            }),
            errorElement: <GeneralError className='h-[50svh]' minimal />,
          },
        ],
      },
    ],
  },

  {
    path: '/user',
    lazy: async () => {
      const AppShell = await import('./components/app-shell')
      return { Component: AppShell.default }
    },
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('./pages/userprojectdetails')).default,
        }),
      },
      {
        path: 'transactions',
        lazy: async () => ({
          Component: (await import('./pages/transactions')).default,
        }),
      },
    ],
  },
  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router
