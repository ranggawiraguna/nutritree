import * as React from 'react';
import { useEffect } from 'react';
import { MENU_OPEN } from 'utils/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import PageRoot from './styled';
import SaveIcon from '@mui/icons-material/Save';
import PageContentHeader from 'components/elements/PageContentHeader';
import { Box, Button, Grid, Typography } from '@mui/material';
import BootstrapInput from 'components/elements/BootstrapInput/styled';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IconUserPlus } from '@tabler/icons';

export default function NutritionClassificationPage() {
  const dispatch = useDispatch();
  const sidebarReducer = useSelector((state) => state.sidebarReducer);

  useEffect(() => {
	if (!(sidebarReducer.isOpen.findIndex((id) => id === 'klasifikasi-gizi') > -1)) {
		dispatch({ type: MENU_OPEN, id: 'klasifikasi-gizi' });
	}

	return () => {
		//
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
	<PageRoot>
		<PageContentHeader title="Klasifikasi Gizi" buttonIconHidden buttonText="Periksa Hasil" buttonAction={()=>{}} />
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6}>
				<Typography variant="h4" gutterBottom>
					Nama Pemeriksa
				</Typography>
				<BootstrapInput />
			</Grid>
			<Grid item xs={12} sm={6} sx={{ position: 'relative' }}>
				<Typography variant="h4" gutterBottom>
					Tanggal periksa
				</Typography>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						label="Tanggal Lahir"
						value={null}
						onChange={(_) => null}
						renderInput={({ inputRef, inputProps, InputProps }) => (
							<>
								<BootstrapInput ref={inputRef} {...inputProps} value={""} onChange={(_)=>null} />
								<Box sx={{ 
									position: "absolute", 
									marginTop:2.5,
									top: "50%",
									transform: "translateY(-50%)",
									right:15, 
									width:28, 
									height:28, 
									display:"flex",
									justifyContent: "center",
									alignItems: "center",
								}}>
									{InputProps?.endAdornment}
								</Box>
							</>
						)}
					/>
				</LocalizationProvider>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h4" gutterBottom>
					Informasi Balita
				</Typography>
				<Box sx={{
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
				}}>
					<IconUserPlus />
					<Typography variant='p' marginTop={0.5}>
						Silahkan pilih balita yang akan diperiksa dari daftar balita yang telah terdaftar.
					</Typography>
				</Box>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Typography variant="h4" gutterBottom>
					Tinggi Badan
				</Typography>
				<BootstrapInput />
			</Grid>
			<Grid item xs={12} sm={6}>
				<Typography variant="h4" gutterBottom>
					Berat Badan
				</Typography>
				<BootstrapInput />
			</Grid>
			<Grid item xs={12} >
				<Typography variant="h4" gutterBottom>
					Hasil Pemeriksaan
				</Typography>
				<BootstrapInput />
			</Grid>
			<Grid item xs={12} >
				<Typography variant="h4" gutterBottom>
					Catatan Pemeriksaan
				</Typography>
				<BootstrapInput />
			</Grid>
			<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button variant="contained" onClick={()=>{}} startIcon={<SaveIcon />}>
					Simpan Hasil
				</Button>
			</Grid>
		</Grid>
	</PageRoot>
  );
}
