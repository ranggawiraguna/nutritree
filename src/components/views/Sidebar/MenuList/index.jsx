import { Typography } from '@mui/material';
import NavGroup from './NavGroup';
import menuStaff from 'config/menu/StaffSidebar';
import menuAdmin from 'config/menu/AdminSidebar';
import { useLocation } from 'react-router';

export default function MenuList(props) {
  const location = useLocation();

  const menuItem = location.pathname.includes('staff') ? menuStaff : menuAdmin;

  const navItems = menuItem.items.map((item, index) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} isLastIndex={index === menuItem.items.length - 1} item={item} />;

      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
}
