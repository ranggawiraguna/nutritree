import * as React from 'react';
import { Fragment, useEffect, useState } from 'react';
import { MENU_OPEN } from 'utils/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, gridClasses } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import { doc, deleteDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from 'config/database/firebase';
import { useConfirm } from "material-ui-confirm";
import Button from '@mui/material/Button';
import PageRoot from './styled';
import AlertToast from 'components/elements/AlertToast';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


const PageContentHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export default function ToddlerDataPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const confirm = useConfirm();
  const sidebarReducer = useSelector((state) => state.sidebarReducer);

  const [isLoading, setIsLoading] = React.useState(true);
  const [toddlers, setToddlers] = useState([]);
  const [alertDescription, setAlertDescription] = useState({
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

  const handleCreateClick = React.useCallback(() => {
    navigate('/data-balita/buat-baru');
  }, [navigate]);

  const handleRowEdit = React.useCallback(
    (toddler) => () => {
      navigate(`/data-balita/${toddler.id}/edit`);
    },
    [navigate],
  );

  const handleRowDelete = React.useCallback(
    (toddler) => async () => {
		const { confirmed } = await confirm({
			title: "Kamu yakin ingin menghapus data balita ?",
			description: "Data yang kamu pilih akan terhapus secara permanen",
		});

		if (confirmed) {
			try {
				await deleteDoc(doc(db, "toddlers", toddler.id)); 
				showAlertToast("success", "Data balita berhasil dihapus");
			} catch (error) {
				showAlertToast("error", "Gagal menghapus Data balita");
			}
		}
    },
	// eslint-disable-next-line
    [],
  );

  const handleRowClick = React.useCallback(
    ({ row }) => {
      navigate(`/data-balita/${row.id}`);
    },
    [navigate],
  );

  const columns = React.useMemo(
    () => [
      	{
			field: 'no',
			headerName: 'No.',	
			sortable: false,
			filterable: false,
			valueGetter: (params) => params.api.getRowIndex(params.row.id) + 1,
		},
		{ field: 'code', headerName: 'Kode', flex: 1 },
		{ field: 'name', headerName: 'Nama', flex: 1 },
		{ field: 'gender', headerName: 'Jenis Kelamin', flex: 1 },
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
      	{
			field: 'actions',
			type: 'actions',
			flex: 1,
			align: 'right',
			getActions: ({ row }) => [
			<GridActionsCellItem
				key="edit-item"
				icon={<EditIcon />}
				label="Edit"
				onClick={handleRowEdit(row)}
			/>,
			<GridActionsCellItem
				key="delete-item"
				icon={<DeleteIcon />}
				label="Delete"
				onClick={handleRowDelete(row)}
			/>,
			],
      	},
    ],
    [handleRowEdit, handleRowDelete],
  );

  useEffect(() => {
	if (!(sidebarReducer.isOpen.findIndex((id) => id === 'toddler-data') > -1)) {
	  dispatch({ type: MENU_OPEN, id: 'toddler-data' });
	}

	const listenerToddlers = onSnapshot(collection(db, 'toddlers'), (snapshot) => {
      setToddlers(snapshot.docs.map((document) => ({ id: document.id, ...document.data() })));
	  setIsLoading(false);
    });

    return () => {
      listenerToddlers();
    };
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
	<Fragment>
	  <PageRoot>
		<PageContentHeader>
			<Typography variant="h2">Data Balita</Typography>
			<Button variant="contained" onClick={handleCreateClick} startIcon={<AddIcon />}>
				Tambah Data
			</Button>
		</PageContentHeader>		
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
            onRowClick={handleRowClick}
            loading={isLoading}
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
	  </PageRoot>
	  <AlertToast description={alertDescription} setDescription={setAlertDescription} />
	</Fragment>
  );
}
