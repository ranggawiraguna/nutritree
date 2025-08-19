import * as React from 'react';
import { useEffect } from 'react';
import { MENU_OPEN } from 'utils/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import PageRoot from './styled';
import PageContentHeader from 'components/elements/PageContentHeader';
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import ChartSingle from 'components/elements/ChartSingle';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from 'config/database/firebase';
import { dateFormatter, getAddress, getAgeText, getGenderText } from 'utils/other/Services';

export default function ToddlerViewPage() {
  const dispatch = useDispatch();
  const sidebarReducer = useSelector((state) => state.sidebarReducer);
  const navigate = useNavigate();
  const params = useParams();

  const [tab, setTab] = React.useState(0)
  const [toddler, setToddler] = React.useState({});

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
			headerName: 'Tanggal Pemeriksaan',
			type: 'date',
			flex: 1,
			valueGetter: (params) => params.value ? new Date(params.value) : null,
			valueFormatter: (params) => {
				if (!params.value) return '';
				const day = new Date(params.value);
				return `${String(day.getDate()).padStart(2, '0')}/${String(day.getMonth() + 1).padStart(2, '0')}/${day.getFullYear()}`;
			},
		},
		{ field: 'height', headerName: 'Tinggi Badan', flex: 1 },
		{ field: 'weight', headerName: 'Berat Badan', flex: 1 },
		{
			field: 'age',
			headerName: 'Umur',
			flex: 1,
			valueGetter: (params) => {
				if (!params.row.birthDay) return "";
				
				const birthDay = new Date(params.row.birthDay);
				const now = new Date();

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
    [],
  );

  const InformationTextGroup = ({title, description, size}) => {
	return (
		<Grid item xs={size["xs"]} md={size["md"]}>
			<Typography variant='h4' sx={{ marginBottom: 0.5 }}>
				{title}
			</Typography>
			<Typography variant='h4' sx={{ fontWeight: 'normal' }}>
				{description}
			</Typography>
		</Grid>
	)
  }

  useEffect(() => {
	if (!(sidebarReducer.isOpen.findIndex((id) => id === 'toddler-data') > -1)) {
	  dispatch({ type: MENU_OPEN, id: 'toddler-data' });
	}

	const listenerToddlers = onSnapshot(doc(db, 'toddlers', params.id), (snapshot) => {
      setToddler(snapshot.data());
    });

    return () => {
      listenerToddlers();
    };
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
	<PageRoot>
		<PageContentHeader title="Data Balita" buttonText="Perbarui Data" buttonAction={() => { navigate("edit") }} buttonIconHidden/>
		<Box sx={{ height: 10 }} />
		<Grid 
			container 
			sx={{ 
				backgroundColor:"rgba(255,255,255,0.5)",
				border : "5px solid rgba(255,255,255,0.5)", 
				paddingLeft: 2,
				paddingRight: 2,
				paddingBottom: 2,
				borderRadius: 5,
				boxSizing: "border-box"
			}}
			rowSpacing={2}
		> 
			<InformationTextGroup title="Nomor Induk Kependudukan (NIK)" description={toddler.nik ?? "Tidak Ada"} size={{ xs:12, md:6 }} />
			<InformationTextGroup title="Nama Lengkap" description={toddler.name ?? "Tidak Ada"} size={{ xs:12, md:6 }} />
			<InformationTextGroup title="Jenis Kelamin" description={getGenderText(toddler.gender)} size={{ xs:12, md:6 }} />
			<InformationTextGroup title="Nama Orang Tua" description={toddler.parentName ?? "Tidak Ada"} size={{ xs:12, md:6 }} />
			<InformationTextGroup title="Tempat, Tanggal Lahir" description={`${toddler.placeOfBirth + ", "}${dateFormatter(toddler.birthDay, "dd MMMM yyyy")}`} size={{ xs:12, md:6 }} />
			<InformationTextGroup title="Usia" description={getAgeText(toddler.birthDay)} size={{ xs:12, md:6 }} />
			<InformationTextGroup title="Alamat Lengkap" description={toddler.address ? getAddress(toddler.address) : ""} size={{ xs: 12 }} />
		</Grid>
		<Box sx={{ height: 10 }} />
		<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
			<Tabs value={tab} onChange={(_,__)=>{setTab(__)}} aria-label="basic tabs example">
				<Tab label="Ringkasan" index={0}/>
				<Tab label="Riwayat Pemeriksaan" index={1} />
			</Tabs>
		</Box>
		{
			tab === 0 ? <Grid container>
				<Grid item xs={12} md={6} sx={{ marginTop: 2, padding : 2, paddingLeft : 1, paddingTop: 0 }}>
					<Box sx={{ 
						backgroundColor:"rgba(255,255,255,0.5)",
						border : "5px solid rgba(255,255,255,0.5)", 
						padding: 2,
						paddingBottom: 0,
						borderRadius: 5,
						boxSizing: "border-box",
						display: "flex",
						flexDirection: "column"
					}}>
						<Typography variant="h4">Tinggi Badan / Usia</Typography>
						<Box sx={{flex: 1, marginBottom : -2}}>
							<ChartSingle
								id={`ChartTinggiBadan`}
								type="bar"
								label={[]}
								data={[]}
								color="#FFD43C"
							/>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={12} md={6} sx={{ marginTop: 2, padding : 2, paddingLeft : 1, paddingTop: 0 }}>
					<Box sx={{ 
						backgroundColor:"rgba(255,255,255,0.5)",
						border : "5px solid rgba(255,255,255,0.5)", 
						padding: 2,
						paddingBottom: 0,
						borderRadius: 5,
						boxSizing: "border-box",
						display: "flex",
						flexDirection: "column"
					}}>
						<Typography variant="h4">Berat Badan / Usia</Typography>
						<Box sx={{flex: 1, marginBottom : -2}}>
							<ChartSingle
								id={`ChartTinggiBadan`}
								type="bar"
								label={[]}
								data={[]}
								color="#FFD43C"
							/>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={12} sx={{ padding : 2, paddingLeft : 1, paddingTop: 0 }}>
					<Box sx={{ 
						width: "100%",
						backgroundColor:"rgba(255,255,255,0.5)",
						border : "5px solid rgba(255,255,255,0.5)", 
						marginTop: 2,
						padding: 2,
						borderRadius: 5,
						boxSizing: "border-box"
					}}>
						<Typography variant="h4" sx={{ marginBottom: 1 }}>Pemeriksaan Terakhir</Typography>
						<Grid container rowSpacing={2}>
							<Grid item xs={12} sm={6} md={4}>
								<Typography variant="h5" sx={{ fontWeight: "600" }}>Tinggi Badan</Typography>
								<Typography variant="p">15 Centimeter</Typography>
							</Grid>
							<Grid item xs={12} sm={6} md={4}>
								<Typography variant="h5" sx={{ fontWeight: "600" }}>Berat Badan</Typography>
								<Typography variant="p">37 Kilogram</Typography>
							</Grid>
							<Grid item xs={12} sm={6} md={4}>
								<Typography variant="h5" sx={{ fontWeight: "600" }}>Status Gizi</Typography>
								<Typography variant="p">Sehat</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography variant="h5" sx={{ fontWeight: "600" }}>Catatan Terakhir</Typography>
								<Typography variant="p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam nostrum dolores adipisci, molestias eligendi vero voluptatem qui saepe labore tempore quaerat culpa eveniet dolore eum dolorem ex officiis alias cupiditate!</Typography>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Grid> : <Box sx={{ paddingTop : 2, height: 600 }}>
				<DataGrid
					label="Riwayat Pemeriksaan"
					rows={[]}
					rowCount={0}
					columns={columns}
					pagination
					sortingMode="client"
					filterMode="client"
					paginationMode="client"
					disableRowSelectionOnClick
					loading={false}
					showToolbar
					sx={{
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
			</Box>
		}
	</PageRoot>
  );
}
