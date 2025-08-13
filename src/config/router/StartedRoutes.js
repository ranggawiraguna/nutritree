import { Route } from 'react-router-dom';
import AccountManager from '../../utils/other/AccountManager';
import GlobalLoginPage from 'containers/pages/GlobalLoginPage';
import GlobalStartedPage from 'containers/pages/GlobalStartedPage';

const StartedRoutes = [
  <Route exact path="/" key="/" element={<GlobalStartedPage />} />,
  <Route key="/admin-login" element={<AccountManager />}>
    <Route exact path="/admin-login" element={<GlobalLoginPage />} />
  </Route>
];

export default StartedRoutes;
