// ? App Pages
import Hello from './Hello';
import Settings from './Settings';
import SamplePage from './SamplePage';
import Dashboard from './Dashboard';
import Domains from './Domains';
// ! Error Pages
import NoPage from './Error/NoPage';

// * Combined for the export
const pages = {
  Hello,
  Settings,
  SamplePage,
  Dashboard,
  NoPage,
  Domains,
  Hello_ALT: Hello,
  Settings_ALT: Settings,
  SamplePage_ALT: SamplePage,
  Dashboard_ALT: Dashboard,
  NoPage_ALT: NoPage,
  Domains_ALT: Domains,
};

export default pages;
