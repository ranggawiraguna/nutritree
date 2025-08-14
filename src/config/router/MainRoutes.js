import { Route } from 'react-router-dom';
import ErrorPage from 'containers/pages/ErrorPage';
import StaffRoutes from './StaffRoutes';
import AdminRoutes from './AdminRoutes';
import StartedContainer from 'containers/templates/StartedLayout';
import StartedRoutes from './StartedRoutes';
import AccountManager from '../../utils/other/AccountManager';
import MainLayout from 'containers/templates/MainLayout';
import ValidateSession from 'utils/other/ValidateSession';

const MainRoutes = [
  <Route key="Started Routes" path="/" element={<StartedContainer />} children={StartedRoutes} />,
  <Route key="Content Routes" element={<AccountManager />}>
    <Route key="Main Layout" element={<MainLayout />}>
      <Route key="Staff" path="staff" element={<ValidateSession role="staff" />} children={StaffRoutes} />
      <Route key="Admin" path="admin" element={<ValidateSession role="admin" />} children={AdminRoutes} />
    </Route>
  </Route>,
  <Route key="Not Found" path="*" element={<ErrorPage />} />
];

export default MainRoutes;
