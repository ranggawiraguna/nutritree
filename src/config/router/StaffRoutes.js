import { Navigate, Route } from 'react-router-dom';
import ProfilePage from 'containers/pages/ProfilePage';
import DashboardPage from 'containers/pages/DashboardPage';
import ToddlerDataPage from 'containers/pages/ToddlerDataPage';
import GrowthPage from 'containers/pages/GrowthPage';
import ReportFilePage from 'containers/pages/ReportFilePage';
import NutritionClassificationPage from 'containers/pages/NutritionClassification';

const StaffRoutes = [
  <Route key="/staff" exact path="/staff" replace element={<Navigate to="dashboard" />} />,
  <Route key="/staff/dashboard" path="dashboard" element={<DashboardPage/>} />,
  <Route key="/staff/data-balita" path="data-balita" element={<ToddlerDataPage />} />,
  <Route key="/staff/klasifikasi-gizi" path="klasifikasi-gizi" element={<NutritionClassificationPage />} />,
  <Route key="/staff/grafik-pertumbuhan" path="grafik-pertumbuhan" element={<GrowthPage />} />,
  <Route key="/staff/berkas-laporan" path="berkas-laporan" element={<ReportFilePage />} />,
  <Route key="/staff/profile" path="profile" element={<ProfilePage />} />
];

export default StaffRoutes;
