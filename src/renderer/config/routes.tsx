// ? Pages List
import pages from '../pages';

const { Settings, Hello, SamplePage, Dashboard, NoPage, Domains } = pages;

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
  },
  //! 404 Error Page
  {
    path: '*',
    elem: <NoPage />,
  },
];

export default routes;
