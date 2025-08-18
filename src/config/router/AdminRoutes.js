import { Navigate, Route } from 'react-router-dom';
import ProfilePage from 'containers/pages/ProfilePage';
import DashboardPage from 'containers/pages/DashboardPage';
import AuthenticationPage from 'containers/pages/AuthenticationPage';
import ToddlerDataPage from 'containers/pages/ToddlerDataPage';
import ToddlerCreatePage from 'containers/pages/ToddlerCreatePage';
import ToddlerEditPage from 'containers/pages/ToddlerEditPage';
import ToddlerViewPage from 'containers/pages/ToddlerViewPage';
import NutritionClassificationPage from 'containers/pages/NutritionClassification';
import GrowthPage from 'containers/pages/GrowthPage';
import ReportFilePage from 'containers/pages/ReportFilePage';

const AdminRoutes = [
  <Route key="/admin" exact path="/admin" replace element={<Navigate to="dashboard" />} />,
  <Route key="/admin/dashboard" path="dashboard" element={<DashboardPage/>} />,
  <Route key="/admin/data-balita" path="data-balita" element={<ToddlerDataPage />} />,
  <Route key="/admin/data-balita" path="data-balita" >
    <Route key="/admin/data-balita/buat-baru" path="buat-baru" element={<ToddlerCreatePage />} />,
    <Route key="/admin/data-balita/:id" path=":id" element={<ToddlerViewPage />} />,
    <Route key="/admin/data-balita/:id" path=":id">
      <Route key="/admin/data-balita/:id/edit" path="edit" element={<ToddlerEditPage />} />,    
    </Route>
  </Route>,
  <Route key="/admin/klasifikasi-gizi" path="klasifikasi-gizi" element={<NutritionClassificationPage />} />,
  <Route key="/admin/grafik-pertumbuhan" path="grafik-pertumbuhan" element={<GrowthPage />} />,
  <Route key="/admin/berkas-laporan" path="berkas-laporan" element={<ReportFilePage />} />,
  <Route key="/admin/authentication" path="authentication" element={<AuthenticationPage />} />,
  <Route key="/admin/profile" path="profile" element={<ProfilePage />} />
];

export default AdminRoutes;
