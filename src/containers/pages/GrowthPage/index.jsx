import * as React from 'react';
import { useEffect } from 'react';
import { MENU_OPEN } from 'utils/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import PageRoot from './styled';
import PageContentHeader from 'components/elements/PageContentHeader';
import { Box, Grid, Typography } from '@mui/material';
import ChartSingle from 'components/elements/ChartSingle';

export default function GrowthPage() {
  const dispatch = useDispatch();
  const sidebarReducer = useSelector((state) => state.sidebarReducer);

  useEffect(() => {
	if (!(sidebarReducer.isOpen.findIndex((id) => id === 'growth') > -1)) {
		dispatch({ type: MENU_OPEN, id: 'growth' });
	}

	return () => {
		//
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
	<PageRoot>
		<PageContentHeader title="Grafik Pertumbuhan" />
		<Grid container spacing={2}>
			<Grid item xs={6}>
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
					<Typography variant="h4">Distribusi Status Gizi</Typography>
					<Box sx={{flex: 1, marginBottom : -2}}>
						<ChartSingle
							id={`ChartA`}
							type="bar"
							label={[]}
							data={[]}
							color="#FFD43C"
						/>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={6}>
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
					<Typography variant="h4">Tren Pertumbuhan Aggregat</Typography>
					<Box sx={{flex: 1, marginBottom : -2}}>
						<ChartSingle
							id={`ChartB`}
							type="bar"
							label={[]}
							data={[]}
							color="#FFD43C"
						/>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={6}>
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
					<Typography variant="h4">Perbandingan Gender</Typography>
					<Box sx={{flex: 1, marginBottom : -2}}>
						<ChartSingle
							id={`ChartC`}
							type="bar"
							label={[]}
							data={[]}
							color="#FFD43C"
						/>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={6}>
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
					<Typography variant="h4">Jumlah Pemeriksaan</Typography>
					<Box sx={{flex: 1, marginBottom : -2}}>
						<ChartSingle
							id={`ChartD`}
							type="bar"
							label={[]}
							data={[]}
							color="#FFD43C"
						/>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Box sx={{ 
					backgroundColor:"rgba(255,255,255,0.5)",
					border : "5px solid rgba(255,255,255,0.5)", 
					padding: 2,
					borderRadius: 5,
					boxSizing: "border-box",
				}}>
					<Typography variant='p'><b>Highlight :</b> 30% Balita yang diperiksa bulan ini mengalami kenaikan berat badan yang signifikan</Typography>
				</Box>
			</Grid>
		</Grid>
	</PageRoot>
  );
}
