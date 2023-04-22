import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import { useNavigate } from 'react-router-dom';

import navConfig, { NavItemButtonProps } from './config';

const PrintListItemButton = (item: NavItemButtonProps, index: unknown) => {
  const navigate = useNavigate();

  const gotoPage = (relativePath: string) =>
    navigate(relativePath, { replace: true });

  const { title, icon, url } = item;
  return (
    <ListItemButton
      key={index}
      onClick={() => (url ? gotoPage(url) : undefined)}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  );
};

export default function Navigation() {
  const mainListItems = (
    <>
      {navConfig.primary.map((item, index) => PrintListItemButton(item, index))}
    </>
  );

  const secondaryListItems = (
    <>
      <ListSubheader component="div" inset>
        Saved reports
      </ListSubheader>

      {navConfig.secondary.map((item, index) =>
        PrintListItemButton(item, index)
      )}
    </>
  );

  return (
    <List component="nav">
      {mainListItems}
      <Divider sx={{ my: 1 }} />
      {secondaryListItems}
    </List>
  );
}
