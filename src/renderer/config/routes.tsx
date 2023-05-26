// ? Pages List
// import pages from 'renderer/pages';
import lazyRetry from '../utils/lazyRetry';

const SamplePage = lazyRetry(() => import('renderer/pages/SamplePage'));
const Settings = lazyRetry(() => import('renderer/pages/Settings'));
const Hello = lazyRetry(() => import('renderer/pages/Hello'));
const Dashboard = lazyRetry(() => import('renderer/pages/Dashboard'));
const NoPage = lazyRetry(() => import('renderer/pages/Error/NoPage'));
const Domains = lazyRetry(() => import('renderer/pages/Domains'));
const DomainsNew = lazyRetry(() => import('renderer/pages/Domains/DomainsNew'));
const WebWorkerExample = lazyRetry(
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
