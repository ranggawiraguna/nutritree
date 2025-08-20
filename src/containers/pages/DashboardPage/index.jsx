import { useDispatch, useSelector } from 'react-redux';
import { MENU_OPEN } from 'utils/redux/action';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from 'config/database/firebase';
import DashboardGrid from 'containers/templates/DashboardGrid';
import CheckNutritionIcon from 'assets/images/icon/CheckNutritionIcon.png';
import HealthyIcon from 'assets/images/icon/HealthyIcon.png';
import PageRoot from './styled';
import { colors } from 'utils/other/EnvironmentValues';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const sidebarReducer = useSelector((state) => state.sidebarReducer);

  const [toddlers, setToddlers] = useState([]);
  const [inspections, setInspections] = useState([]);

  useEffect(() => {
    if (!(sidebarReducer.isOpen.findIndex((id) => id === 'dashboard') > -1)) {
      dispatch({ type: MENU_OPEN, id: 'dashboard' });
    }

    const listenerToddlers = onSnapshot(collection(db, 'toddlers'), (snapshot) => {
      setToddlers(snapshot.docs.map((document) => ({ id: document.id, ...document.data() })));
    });

    const listenerInspections = onSnapshot(query(collection(db, "inspections"), orderBy("date", "desc")), (snapshot) => {
      setInspections(snapshot.docs.map((document) => ({ id: document.id, ...document.data() })));
    });

    return () => {
      listenerToddlers();
      listenerInspections();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageRoot>      
      <DashboardGrid
        itemValues={[
          {
            title: 'Total-Periksa',
            note: 'Total-Periksa',
            path: 'berkas-laporan',
            data: inspections.filter((_)=> new Date(_.date) >= new Date(new Date().getFullYear(), new Date().getMonth(), 1))?.length
          },
          {
            title: 'Total-Anak Sehat',
            note: 'Total-Anak',
            path: 'berkas-laporan',
            data: [...new Set(inspections.filter((_)=> new Date(_.date) >= new Date(new Date().getFullYear(), new Date().getMonth(), 1)).filter((_)=>["Normal", "Gizi Lebih"].includes(_.status)).map((_)=>_.toddlerId))]?.length
          },
          {
            title: 'Pemeriksaan Berdasarkan Gizi',
            colors: colors.slice(0,4),
            notes: [...new Set(inspections.map((inspection) => inspection.status))].filter((_)=>_),
            path: 'pemeriksaan-gizi',
            datas: inspections.filter((_)=> new Date(_.date) >= new Date(new Date().getFullYear(), 0, 0)),
          },
          {
            title: 'Total-Periksa Gizi',
            icon: CheckNutritionIcon,
            unit: 'Anak',
            data: [...new Set(inspections.filter((_)=> new Date(_.date) >= new Date(new Date().getFullYear(), new Date().getMonth(), 1)).map((_)=>_.toddlerId))]?.length
          },
          {
            title: 'Persentase-Gizi Baik',
            icon: HealthyIcon,
            unit: 'Persen',
            data: Math.floor([...new Set(inspections.filter((_)=> new Date(_.date) >= new Date(new Date().getFullYear(), new Date().getMonth(), 1)).filter((_)=>["Normal", "Gizi Lebih"].includes(_.status)).map((_)=>_.toddlerId))]?.length / [...new Set(inspections.filter((_)=> new Date(_.date) >= new Date(new Date().getFullYear(), new Date().getMonth(), 1)).map((_)=>_.toddlerId))]?.length * 100)
          },
          {
            title: 'Klasifikasi Usia',
            colors: ['#B11900', '#6DAFA7', '#359AFF'],
            notes: ['0-6 Bulan', '7-12 Bulan', '1-5 Tahun'],
            path: 'klasifikasi-usia',
            data: toddlers
          },
          {
            title: 'Pemeriksaan Berdasarkan Usia',
            colors: ['#B11900', '#6DAFA7', '#359AFF'],
            notes: ['0-6 Bulan', '7-12 Bulan', '1-5 Tahun'],
            path: 'pemeriksaan-usia',
            datas: inspections.map((_)=>({..._, birthDay : toddlers.find((__)=>__.id===_.toddlerId)?.birthDay})),
          }
        ]}
      />
    </PageRoot>
  );
}