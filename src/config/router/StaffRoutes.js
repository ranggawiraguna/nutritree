import { Navigate, Route } from 'react-router-dom';
import ProfilePage from 'containers/pages/ProfilePage';
import DashboardPage from 'containers/pages/DashboardPage';

const StaffRoutes = [
  <Route key="/staff" exact path="/staff" replace element={<Navigate to="dashboard" />} />,
  <Route key="/staff/dashboard" path="dashboard" element={<DashboardPage/>} />,
  <Route key="/staff/data-balita" path="data-balita" element={<></>} />,
  <Route key="/staff/klasifikasi-gizi" path="klasifikasi-gizi" element={<></>} />,
  <Route key="/staff/grafik-pertumbuhan" path="grafik-pertumbuhan" element={<></>} />,
  <Route key="/staff/berkas-laporan" path="berkas-laporan" element={<></>} />,
  <Route key="/staff/authentication" path="authentication" element={<></>} />,
  <Route key="/staff/profile" path="profile" element={<ProfilePage />} />
];

export default StaffRoutes;
