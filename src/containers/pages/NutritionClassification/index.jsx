import * as React from 'react';
import { useEffect } from 'react';
import { MENU_OPEN } from 'utils/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import PageRoot from './styled';
import SaveIcon from '@mui/icons-material/Save';
import PageContentHeader from 'components/elements/PageContentHeader';
import { Box, Button, Drawer, Grid, IconButton, Typography } from '@mui/material';
import BootstrapInput from 'components/elements/BootstrapInput/styled';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { IconUserPlus } from '@tabler/icons';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from 'config/database/firebase';
import CloseIcon from '@mui/icons-material/Close';
import { dateFormatter, getAddress, getAgeText, getGenderText } from 'utils/other/Services';
import { RemoveCircleRounded } from '@mui/icons-material';
import AlertToast from 'components/elements/AlertToast';
import { useNavigate } from 'react-router';

export default function NutritionClassificationPage() {
  const dispatch = useDispatch();
  const sidebarReducer = useSelector((state) => state.sidebarReducer);
  const accountReducer = useSelector((state) => state.accountReducer);
  const navigate = useNavigate();


  const [toddlers, setToddlers] = React.useState([]);

  const [inspectionForm, setInspectionForm] = React.useState({
	examiner : accountReducer.fullname,
	date: null,
	height: '',
	weight: '',
	status: '',
	notes: ''
  });

  const [toddlerSelected, setToddlerSelected] = React.useState({});
  const [inspectionResult, setInspectionResult] = React.useState('');

  const [drawerOpen, setDraweOpen] = React.useState(false);
  const [drawerLoading, setDraweLoading] = React.useState(true);
  const [formloading, setFormLoading] = React.useState(false);

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
  

  const toggleDrawer = (value) => setDraweOpen(value);

  const handleChangeInspectionForm = (name, value) => setInspectionForm({ ...inspectionForm, [name]: value })
  const handleChangeToddlerSelected = (value) => {
	setToddlerSelected({ id: value.id, ...value.row });
	toggleDrawer(false);
  }

  const handleInspectionAction = React.useCallback(() => {
	setInspectionResult(["Normal", "Gizi Buruk", "Gizi Kurang", "Gizi Lebih"][Math.floor(Math.random() * 4)]);
  },[])

  const handleSaveInspectionForm = React.useCallback(() => {
	if(!formloading){
		setFormLoading(true);
		if(toddlerSelected.id && inspectionForm.date && inspectionForm.height && inspectionForm.weight && inspectionResult){
			addDoc(collection(db, 'inspections'), ({
				examinerId : accountReducer.id,
				toddlerId: toddlerSelected.id,
				date: inspectionForm.date,
				height: inspectionForm.height,
				weight: inspectionForm.weight,
				status: inspectionForm.status,
				notes: inspectionForm.notes,
			})).catch((_) => {
				showAlertToast('error', 'Terjadi kesalahan saat menambahkan data pemeriksaan');
			}).then((_)=>{
				showAlertToast('success', 'Data pemeriksaan berhasil disimpan');
				setTimeout(() => {
					navigate(`/${accountReducer.role}/berkas-laporan`);
				}, 2000);
			}).finally(() => {
				setFormLoading(false);
			});
		} else {
			showAlertToast('warning', 'Silahkan lengkapi data pemeriksaan terlebih dahulu');
			showAlertToast('error', 'Terjadi kesalahan saat menambahkan data pemeriksaan');
		}
	}
	// eslint-disable-next-line
  }, []);

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

  const columns = React.useMemo(
    () => [
      	{
			field: 'no',
			headerName: 'No.',	
			sortable: false,
			filterable: false,
			valueGetter: (params) => params.api.getRowIndex(params.row.id) + 1,
		},
		{ field: 'nik', headerName: 'NIK', flex: 1 },
		{ field: 'name', headerName: 'Nama', flex: 1 },
		{ 
			field: 'gender', 
			headerName: 'Jenis Kelamin', 
			flex: 1 
		},
		{
			field: 'birthDay',
			headerName: 'Tanggal Lahir',
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
		{ field: 'parentName', headerName: 'Nama Orang Tua', flex: 1 },
    ],
    [],
  );

  useEffect(() => {
	if (!(sidebarReducer.isOpen.findIndex((id) => id === 'klasifikasi-gizi') > -1)) {
		dispatch({ type: MENU_OPEN, id: 'klasifikasi-gizi' });
	}

	const listenerToddlers = onSnapshot(collection(db, 'toddlers'), (snapshot) => {
      setToddlers(snapshot.docs.map((document) => ({ id: document.id, ...document.data() })));
	  setDraweLoading(false);
    });

    return () => {
      listenerToddlers();
    };
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
	<PageRoot>
		<PageContentHeader title="Klasifikasi Gizi" buttonIconHidden buttonText="Periksa Hasil" buttonAction={handleInspectionAction}/>
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6}>
				<Typography variant="h4" gutterBottom>
					Nama Pemeriksa
				</Typography>
				<BootstrapInput readOnly value={inspectionForm["examiner"]} />
			</Grid>
			<Grid item xs={12} sm={6}>
				<Typography variant="h4" gutterBottom>
					Tanggal periksa
				</Typography>
				<BootstrapInput type="date" value={inspectionForm["date"]} setValue={(_)=>handleChangeInspectionForm("date",_)}/>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h4" gutterBottom>
					Informasi Balita
				</Typography>
				{
					!toddlerSelected.id ? <Box 
						sx={{
							width: '100%', 
							padding: 2,
							backgroundColor:"rgba(255,255,255,0.5)",
							border : "3px solid rgba(255,255,255,0.5)", 
							borderRadius: 2,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							gap: 2,
							cursor: "pointer"
						}}
						onClick={()=>toggleDrawer(true)}
					>
						<IconUserPlus />
						<Typography variant='p' marginTop={0.5}>
							Silahkan pilih balita yang akan diperiksa dari daftar balita yang telah terdaftar.
						</Typography>
					</Box> : <Grid 
						container 
						sx={{ 
							backgroundColor:"rgba(255,255,255,0.5)",
							border : "5px solid rgba(255,255,255,0.5)", 
							paddingLeft: 2,
							paddingRight: 2,
							paddingBottom: 2,
							borderRadius: 5,
							marginTop: 2,
							boxSizing: "border-box"
						}}
						rowSpacing={2}
					> 
						<InformationTextGroup title="Nomor Induk Kependudukan (NIK)" description={toddlerSelected.nik ?? "Tidak Ada"} size={{ xs:12, md:6 }} />
						<InformationTextGroup title="Nama Lengkap" description={toddlerSelected.name ?? "Tidak Ada"} size={{ xs:12, md:6 }} />
						<InformationTextGroup title="Jenis Kelamin" description={getGenderText(toddlerSelected.gender)} size={{ xs:12, md:6 }} />
						<InformationTextGroup title="Nama Orang Tua" description={toddlerSelected.parentName ?? "Tidak Ada"} size={{ xs:12, md:6 }} />
						<InformationTextGroup title="Tempat, Tanggal Lahir" description={`${toddlerSelected.placeOfBirth + ", "}${dateFormatter(toddlerSelected.birthDay, "dd MMMM yyyy")}`} size={{ xs:12, md:6 }} />
						<InformationTextGroup title="Usia" description={getAgeText(toddlerSelected.birthDay)} size={{ xs:12, md:6 }} />
						<InformationTextGroup title="Alamat Lengkap" description={toddlerSelected.address ? getAddress(toddlerSelected.address) : ""} size={{ xs: 10 }} />
						<Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
							 <Button variant="contained" color="error" onClick={()=>setToddlerSelected({})} startIcon={<RemoveCircleRounded />} sx={{height:"auto"}}>
								Hapus Pilihan
							</Button>
						</Grid>
					</Grid>
				}
			</Grid>
			<Grid item xs={12} sm={6}>
				<Typography variant="h4" gutterBottom>
					Tinggi Badan
				</Typography>
				<BootstrapInput value={inspectionForm["height"]} setValue={(_)=>handleChangeInspectionForm("height",_)}/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Typography variant="h4" gutterBottom>
					Berat Badan
				</Typography>
				<BootstrapInput value={inspectionForm["weight"]} setValue={(_)=>handleChangeInspectionForm("weight",_)}/>
			</Grid>
			{
				inspectionResult ? <>
					<Grid item xs={12} >
						<Typography variant="h4" gutterBottom>
							Hasil Pemeriksaan
						</Typography>
						<BootstrapInput readOnly value={inspectionResult} setValue={(_)=>setInspectionResult(_)}/>
					</Grid>
					<Grid item xs={12} >
						<Typography variant="h4" gutterBottom>
							Catatan Pemeriksaan
						</Typography>
						<BootstrapInput value={inspectionForm["note"]} setValue={(_)=>handleChangeInspectionForm("note",_)}/>
					</Grid>
					<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Button variant="contained" onClick={handleSaveInspectionForm} startIcon={<SaveIcon />}>
							Simpan Hasil
						</Button>
					</Grid>
				</> : <></>
			}
		</Grid>
		<Drawer anchor="bottom" open={drawerOpen} onClose={()=>toggleDrawer(false)}>
			<Box sx={{ height:"80vh", display: 'flex', flexDirection: 'column' }}>
				<Box sx={{display: 'flex', justifyContent: 'space-between', alignItems:"center", padding: 3 }}>
					<Typography variant="h3">
						Pilih Balita
					</Typography>
					<IconButton color="inherit" onClick={()=>toggleDrawer(false)} aria-label="close">
						<CloseIcon />
					</IconButton>
				</Box>
				<DataGrid
					label="Daftar Balita"
					rows={toddlers}
					rowCount={toddlers.length}
					columns={columns}
					pagination
					sortingMode="client"
					filterMode="client"
					paginationMode="client"
					disableRowSelectionOnClick
					onRowClick={handleChangeToddlerSelected}
					loading={drawerLoading}
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
			</Box>
		</Drawer>
		<AlertToast description={alertDescription} setDescription={setAlertDescription} />
	</PageRoot>
  );
}
