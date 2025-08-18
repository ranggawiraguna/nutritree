import * as React from 'react';
import { Fragment, useEffect, useState } from 'react';
import { MENU_OPEN } from 'utils/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PageRoot from './styled';
import AlertToast from 'components/elements/AlertToast';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { Box } from '@mui/system';
import BootstrapInput from 'components/elements/BootstrapInput';
import RadioInput from 'components/elements/RadioInput';

const PageContentHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));


export default function ToddlerCreatePage() {
  const dispatch = useDispatch();
  const sidebarReducer = useSelector((state) => state.sidebarReducer);

  const [alertDescription, setAlertDescription] = useState({
	isOpen: false,
	type: 'info',
	text: '',
	transitionName: 'slideUp'
  });

  const handleSaveClick = React.useCallback(() => {
	//
  }, []);

  useEffect(() => {
	if (!(sidebarReducer.isOpen.findIndex((id) => id === 'toddler-data') > -1)) {
	  dispatch({ type: MENU_OPEN, id: 'toddler-data' });
	}

    return () => {
		//
    };
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
	<Fragment>
	  <PageRoot>
		<PageContentHeader>
			<Typography variant="h2">Form Tambah Balita</Typography>
			<Button variant="contained" onClick={handleSaveClick} startIcon={<SaveIcon />}>
				Simpan Data
			</Button>
		</PageContentHeader>	
		<Box sx={{
			backgroundColor: 'rgba(255,255,255,0.75)', 
			padding: 2, 
			borderRadius: 1, 
			marginBottom: 2,
			paddingBottom: 3
		}}>
			<Typography variant="h4">Informasi Balita</Typography>
			<Box sx={{
				display:"grid",
				gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
				columnGap: 2,
			}}>
				<BootstrapInput title="Nomor Induk Kependudukan (NIK)" />
				<BootstrapInput title="Name" />		
				<RadioInput 
					title="Jenis Kelamin" 
					name="gender"
					options={[
						{ value: 'male', label: 'Laki-laki' },
						{ value: 'female', label: 'Perempuan' }
					]}
					direction="row"
				/>
				<BootstrapInput title="Tempat Lahir" />
				<BootstrapInput title="Tanggal Lahir" type="date" />
				<BootstrapInput title="Nama Orang Tua" />
			</Box>
		</Box>
		<Box sx={{
			backgroundColor: 'rgba(255,255,255,0.75)', 
			padding: 2, 
			borderRadius: 1, 
			marginBottom: 2,
			paddingBottom: 3
		}}>
			<Typography variant="h4">Alamat Balita</Typography>
			<Box sx={{
				display:"grid",
				gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
				columnGap: 2,
			}}>
				<BootstrapInput title="Jalan" />
				<BootstrapInput title="RT" />
				<BootstrapInput title="RW" />
				<BootstrapInput title="No" />
				<BootstrapInput title="Kelurahan" />
				<BootstrapInput title="Kecamatan" />
				<BootstrapInput title="Kabupaten/Kota" />
				<BootstrapInput title="Provinsi" />
			</Box>
		</Box>
	  </PageRoot>
	  <AlertToast description={alertDescription} setDescription={setAlertDescription} />
	</Fragment>
  );
}
