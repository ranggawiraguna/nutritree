import {
  IconReport,
  IconDashboard,
  IconFileAnalytics,
  IconChartInfographic,
  IconAccessible,
  IconBrand4chan
} from '@tabler/icons';

const adminSidebar = {
  items: [
    {
      id: 'main-menu',
      title: 'Menu Utama',
      type: 'group',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/admin/dashboard',
          icon: IconDashboard
        },        
        {
          id: 'toddler-data',
          title: 'Data Balita',
          type: 'item',
           url: '/admin/data-balita',
          icon: IconReport,
        },
        {
          id: 'nutritional-classification',
          title: 'Klasifikasi Gizi',
          type: 'item',
           url: '/admin/klasifikasi-gizi',
          icon: IconBrand4chan,
        }
      ]
    },
    {
      id: 'reporting',
      title: 'Pelaporan',
      type: 'group',
      children: [
        {
          id: 'growth',
          title: 'Grafik Pertumbuhan',
          type: 'item',
          url: '/admin/grafik-pertumbuhan',
          icon: IconChartInfographic
        },
        {
          id: 'report',
          title: 'Berkas Laporan',
          type: 'item',
          url: '/admin/berkas-laporan',
          icon: IconFileAnalytics
        }
      ]
    },
    {
      id: 'settings',
      title: 'Pengaturan',
      type: 'group',
      children: [
        {
          id: 'authentication',
          title: 'Authentikasi',
          type: 'item',
          url: '/admin/authentication',
          icon: IconAccessible
        },
      ]
    }
  ]
};

export default adminSidebar;
