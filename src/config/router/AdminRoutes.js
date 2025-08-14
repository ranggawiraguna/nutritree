import { Navigate, Route } from 'react-router-dom';
import ProfilePage from 'containers/pages/ProfilePage';

const AdminRoutes = [
  <Route key="/admin" exact path="/admin" replace element={<Navigate to="dashboard" />} />,
  <Route key="/admin/dashboard" path="dashboard" element={<></>} />,
  <Route key="/admin/data-balita" path="data-balita" element={<></>} />,
  <Route key="/admin/klasifikasi-gizi" path="klasifikasi-gizi" element={<></>} />,
  <Route key="/admin/grafik-pertumbuhan" path="grafik-pertumbuhan" element={<></>} />,
  <Route key="/admin/berkas-laporan" path="berkas-laporan" element={<></>} />,
  <Route key="/admin/authentication" path="authentication" element={<></>} />,
  <Route key="/admin/profile" path="profile" element={<ProfilePage />} />
];

export default AdminRoutes;
