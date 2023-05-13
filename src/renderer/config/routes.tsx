// ? Pages List
// import pages from 'renderer/pages';
import { Suspense, lazy } from 'react';

const SamplePage = lazy(() => import('renderer/pages/SamplePage'));
const Settings = lazy(() => import('renderer/pages/Settings'));
const Hello = lazy(() => import('renderer/pages/Hello'));
const Dashboard = lazy(() => import('renderer/pages/Dashboard'));
const NoPage = lazy(() => import('renderer/pages/Error/NoPage'));
const Domains = lazy(() => import('renderer/pages/Domains'));
const DomainsNew = lazy(() => import('renderer/pages/Domains/DomainsNew'));
const WebWorkerExample = lazy(
  () => import('renderer/pages/WebWorkerExample/WebWorkerExample')
);

const routes = [
  {
    path: '/',
    elem: <SamplePage />,
  },
  {
    path: '/dashboard',
    elem: <Dashboard />,
  },
  {
    path: '/hello',
    elem: <Hello />,
  },
  {
    path: '/Settings',
    elem: <Settings />,
  },
  {
    path: '/Settings',
    elem: <Settings />,
  },
  {
    path: '/sample-page',
    elem: <SamplePage />,
  },
  {
    path: '/domains-manager',
    elem: <Domains />,
    description:
      'DomainManager v1 as Prisma and CustomTable component example init.',
  },
  {
    path: '/domains-manager-new',
    elem: <DomainsNew />,
  },
  {
    path: '/web-worker-example',
    elem: <WebWorkerExample />,
  },
  //! 404 Error Page
  {
    path: '*',
    elem: <NoPage />,
  },
];

export default routes;
