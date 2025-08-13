import {
  IconReport,
  IconDashboard,
  IconFileAnalytics,
  IconChartInfographic,
  IconBrand4chan
} from '@tabler/icons';

const staffSidebar = {
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
            url: '/staff/dashboard',
            icon: IconDashboard
          },        
          {
            id: 'toddler-data',
            title: 'Data Balita',
            type: 'item',
             url: '/staff/data-balita',
            icon: IconReport,
          },
          {
            id: 'nutritional-classification',
            title: 'Klasifikasi Gizi',
            type: 'item',
             url: '/staff/klasifikasi-gizi',
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
            id: 'customer',
            title: 'Grafik Pertumbuhan',
            type: 'item',
            url: '/staff/grafik-pertumbuhan',
            icon: IconChartInfographic
          },
          {
            id: 'report',
            title: 'Berkas Laporan',
            type: 'item',
            url: '/staff/berkas-laporan',
            icon: IconFileAnalytics
          }
        ]
      },
    ]
};

export default staffSidebar;
