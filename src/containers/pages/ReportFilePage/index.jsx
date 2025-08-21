import * as React from 'react';
import { useEffect } from 'react';
import { MENU_OPEN } from 'utils/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import PageRoot from './styled';
import PageContentHeader from 'components/elements/PageContentHeader';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from 'config/database/firebase';
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import { Box, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@emotion/react';

export default function ReportFilePage() {
  const dispatch = useDispatch();
  const sidebarReducer = useSelector((state) => state.sidebarReducer);

  const [isLoading, setIsLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [isLoadingDownload, setIsLoadingDownload] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [toddlers, setToddlers] = React.useState([]);
  const [inspections, setInspections] = React.useState([]);
  const [alertDescription, setAlertDescription] = React.useState({
	  isOpen: false,
	  type: 'info',
	  text: '',
	  transitionName: 'slideUp'
  });
  
  const showAlertToast = (type, text) =>
	  setAlertDescription({
		...alertDescription,
		isOpen: true,
		type: type,
		text: text
	  });

  const getToddlerAgeText = (toddlerId, inspectionDate) => {
	const birthDay = new Date(toddlers.find((t) => t.id === toddlerId)?.birthDay);
	const now = new Date(inspectionDate);

	if (!birthDay || !now) return "";

	let year = now.getFullYear() - birthDay.getFullYear();
	let month = now.getMonth() - birthDay.getMonth();

	if (month < 0) {
		year -= 1;
		month += 12;
	}

	return `${year} Tahun ${month} Bulan`;
  }

  const handleDownloadReport = async (format) => {
	if(!isLoadingDownload){
		setIsLoadingDownload(true);
		const rows = inspections.map((inspection) => {
			const date = new Date(inspection.date);
			return ({
				"Tanggal Pemeriksaan": `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`,
				"NIK Balita": toddlers.find((t) => t.id === inspection.toddlerId)?.nik || '',
				"Nama Balita": toddlers.find((t) => t.id === inspection.toddlerId)?.name || '',
				"Tinggi (Centimeter)": inspection.height,
				"Berat (Kilogram)": inspection.weight,
				"Umur": getToddlerAgeText(inspection.toddlerId, inspection.date),
				"Status Gizi": inspection.status,
				"Status Stunting": inspection.statusStunting,
				"Status Wasting": inspection.statusWasting,
				"Catatan": inspection.note,
			});
		})

		if(format==="pdf") {
			const doc = new jsPDF();
	
			const columns = Object.keys(rows[0]); 
			const body = rows.map(row => columns.map(col => row[col]));
	
			doc.text("Data Export", 14, 10);
	
			autoTable(doc, {
				head: [columns],
				body: body,
				startY: 20,
				styles: { fontSize: 8 }
			});
	
			doc.save("Report Pemeriksaan Gizi.pdf");
		} else {
			const worksheet = XLSX.utils.json_to_sheet(
				inspections.map((inspection) => {
					const date = new Date(inspection.date);
					return ({
						"Tanggal Pemeriksaan": `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`,
						"NIK Balita": toddlers.find((t) => t.id === inspection.toddlerId)?.nik || '',
						"Nama Balita": toddlers.find((t) => t.id === inspection.toddlerId)?.name || '',
						"Tinggi (Centimeter)": inspection.height,
						"Berat (Kilogram)": inspection.weight,
						"Umur": getToddlerAgeText(inspection.toddlerId, inspection.date),
						"Status Gizi": inspection.status,
						"Status Stunting": inspection.statusStunting,
						"Status Wasting": inspection.statusWasting,
						"Catatan": inspection.note,
					});
				})
			);
			const workbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet");
			const excelBuffer = XLSX.write(workbook, {
				bookType: "xlsx",
				type: "array",
			});
			const blob = new Blob([excelBuffer], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});
			saveAs(blob, `Report Pemeriksaan Gizi.xlsx`);
		}
		showAlertToast('success', 'Laporan pemeriksaan berhasil diunduh');
		setIsLoadingDownload(false);
	}

  };

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
			valueGetter: (params) => getToddlerAgeText(params.row.toddlerId,params.row.date)
		},
		{ field: 'status', headerName: 'Status Gizi', flex: 1 },
		{ field: 'statusStunting', headerName: 'Status Stunting', flex: 1 },
		{ field: 'statusWasting', headerName: 'Status Wasting', flex: 1 },
	],
	// eslint-disable-next-line react-hooks/exhaustive-deps
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
	<React.Fragment>
		<PageRoot>
			<PageContentHeader title="Berkas Laporan" buttonText="Unduh Laporan" buttonAction={()=>setOpen(true)} buttonIconHidden />
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
		<Dialog open={open} fullScreen={fullScreen} onClose={()=>setOpen(false)} aria-labelledby="responsive-dialog-title">
			<DialogTitle>
				<Grid container sx={{ position: 'relative', marginTop: 2, marginBottom: 1 }} justifyContent="center" alignItems="center">
				<Typography variant="h3" component="h3">
					Unduh Laporan
				</Typography>
				<IconButton sx={{ position: 'absolute', right: 0, top: -12 }} color="inherit" onClick={()=>setOpen(false)} aria-label="close">
					<CloseIcon />
				</IconButton>
				</Grid>
			</DialogTitle>
			<DialogContent sx={{ textAlign: 'center' }}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<Box sx={{ minWidth: 200, backgroundColor: "rgba(0,0,0,0.1)", border: "2px solid rgba(0,0,0,0.1)", padding: 2, borderRadius: 2, cursor:"pointer" }} onClick={()=>{
							handleDownloadReport("pdf");
							setOpen(false);
						}}>
							<Typography variant='h4'>PDF</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} md={6}>
						<Box sx={{ minWidth: 200, backgroundColor: "rgba(0,0,0,0.1)", border: "2px solid rgba(0,0,0,0.1)", padding: 2, borderRadius: 2, cursor:"pointer" }} onClick={()=>{
							handleDownloadReport("excel");
							setOpen(false);
						}}>
							<Typography variant='h4'>Excel</Typography>
						</Box>
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	</React.Fragment>
  );

}