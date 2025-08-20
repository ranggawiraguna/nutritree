import * as React from 'react';
import { useEffect } from 'react';
import { MENU_OPEN } from 'utils/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import PageRoot from './styled';
import PageContentHeader from 'components/elements/PageContentHeader';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from 'config/database/firebase';

export default function ReportFilePage() {
  const dispatch = useDispatch();
  const sidebarReducer = useSelector((state) => state.sidebarReducer);

  const [isLoading, setIsLoading] = React.useState(true);
  const [toddlers, setToddlers] = React.useState([]);
  const [inspections, setInspections] = React.useState([]);

  const columns = React.useMemo(
	() => [
		{
		field: 'no',
		headerName: 'No.',	
		sortable: false,
		filterable: false,
		valueGetter: (params) => params.api.getRowIndex(params.row.id) + 1,
	},
	{
		field: 'date',
		headerName: 'Tanggal',
		type: 'date',
		flex: 1,
		valueGetter: (params) => params.value ? new Date(params.value) : null,
		valueFormatter: (params) => {
			if (!params.value) return '';
			const day = new Date(params.value);
			return `${String(day.getDate()).padStart(2, '0')}/${String(day.getMonth() + 1).padStart(2, '0')}/${day.getFullYear()}`;
		},
	},
	{ 
		field: 'name',
		headerName: 'Nama Balita', 
		flex: 1,
		valueGetter: (params) => toddlers.find((t) => t.id === params.row.toddlerId)?.name || ''
	},
	{ 
		field: 'nik',
		headerName: 'NIK', 
		flex: 1,
		valueGetter: (params) => toddlers.find((t) => t.id === params.row.toddlerId)?.nik || ''
	},
	{ field: 'height', headerName: 'Tinggi Badan', flex: 1 },
	{ field: 'weight', headerName: 'Berat Badan', flex: 1 },
	{
		field: 'age',
		headerName: 'Umur',
		flex: 1,
		valueGetter: (params) => {
			const birthDay = new Date(toddlers.find((t) => t.id === params.row.toddlerId).birthDay);
			const now = new Date(params.row.date);

			if (!birthDay || !now) return "";

			let year = now.getFullYear() - birthDay.getFullYear();
			let month = now.getMonth() - birthDay.getMonth();

			if (month < 0) {
				year -= 1;
				month += 12;
			}

			return `${year} Tahun ${month} Bulan`;
		},
	},
	{ field: 'status', headerName: 'Status Gizi', flex: 1 },
	],
	[toddlers],
);

  useEffect(() => {
	if (!(sidebarReducer.isOpen.findIndex((id) => id === 'report') > -1)) {
		dispatch({ type: MENU_OPEN, id: 'report' });
	}

	const listenerToddlers = onSnapshot(collection(db, 'toddlers'), (snapshot) => {
		setToddlers(snapshot.docs.map((document) => ({ id: document.id, ...document.data() })));
	});

	const listenerInspections = onSnapshot(query(collection(db, "inspections"), orderBy("date", "desc")), (snapshot) => {
		setInspections(snapshot.docs.map((document) => ({ id: document.id, ...document.data() })));
		setIsLoading(false);
	});

	return () => {
		listenerToddlers();
		listenerInspections();
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
	<PageRoot>
		<PageContentHeader title="Berkas Laporan" buttonText="Unduh Laporan" buttonAction={async () => {
			//
		}} buttonIconHidden />
		<DataGrid
			label="Data Pemeriksaan"
			rows={inspections}
			rowCount={inspections.length}
			columns={columns}
			pagination
			sortingMode="client"
			filterMode="client"
			paginationMode="client"
			disableRowSelectionOnClick
			loading={isLoading}
			showToolbar
			sx={{
				flex: 1,
				[`& .${gridClasses.columnHeader}`]: {
					backgroundColor: 'white', // putih untuk header
				},
				[`& .${gridClasses.row}`]: {
					backgroundColor: 'rgba(255,255,255,0.5)', // full row abu terang
				},
				[`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
					outline: 'transparent',
				},
				[`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
					{
					outline: 'none',
					},
				[`& .${gridClasses.row}:hover`]: {
					cursor: 'pointer',
				},
				[`& .${gridClasses.footerContainer}`]: {
					height: "50px",
					minHeight: "unset",
					paddingY: 0.5,
					backgroundColor: 'rgba(255,255,255,0.25)',
				},
			}}
			slotProps={{
				loadingOverlay: {
				variant: 'circular-progress',
				noRowsVariant: 'circular-progress',
				},
				baseIconButton: {
				size: 'small',
				},
			}}
		/>
	</PageRoot>
  );
}
