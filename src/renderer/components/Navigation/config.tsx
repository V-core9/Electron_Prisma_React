import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SettingsIcon from '@mui/icons-material/Settings';

export interface NavItemButtonProps {
  title: string;
  icon: JSX.Element;
  url: string;
}

interface NavConfigInterface {
  primary: NavItemButtonProps[];
  secondary: NavItemButtonProps[];
}

const navConfig: NavConfigInterface = {
  primary: [
    {
      title: 'Dashboard',
      icon: <DashboardIcon />,
      url: '/dashboard',
    },
    {
      title: 'Sample Page',
      icon: <ShoppingCartIcon />,
      url: '/sample-page',
    },
    {
      title: 'Hello',
      icon: <ChevronLeftIcon />,
      url: '/hello',
    },
    {
      title: 'Domains',
      icon: <SettingsIcon />,
      url: '/domains-manager',
    },
    {
      title: 'New Domains',
      icon: <SettingsIcon />,
      url: '/domains-manager-new',
    },
    {
      title: 'Settings',
      icon: <SettingsIcon />,
      url: '/settings',
    },
    {
      title: 'Web Workers v1',
      icon: <BarChartIcon />,
      url: '/web-worker-example',
    },
  ],
  secondary: [
    {
      title: 'Current month',
      icon: <BarChartIcon />,
      url: '/hello',
    },
    {
      title: 'Last quarter',
      icon: <PeopleIcon />,
      url: '/hello',
    },
    {
      title: 'Year-end sale',
      icon: <AssignmentIcon />,
      url: '/hello',
    },
  ],
};

export default navConfig;
