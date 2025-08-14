import { Route } from 'react-router-dom';
import AccountManager from '../../utils/other/AccountManager';
import LoginPage from 'containers/pages/LoginPage';
import StartedPage from 'containers/pages/StartedPage';

const StartedRoutes = [
  <Route exact path="/" key="/" element={<StartedPage />} />,
  <Route key="/login" element={<AccountManager />}>
    <Route exact path="/login" element={<LoginPage />} />
  </Route>
];

export default StartedRoutes;
