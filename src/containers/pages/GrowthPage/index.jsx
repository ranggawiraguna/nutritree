import * as React from 'react';
import { useEffect } from 'react';
import { MENU_OPEN } from 'utils/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import PageRoot from './styled';
import PageContentHeader from 'components/elements/PageContentHeader';
import { Box, Grid, Typography } from '@mui/material';
import ChartSingle from 'components/elements/ChartSingle';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from 'config/database/firebase';
import { colors, timelineValues } from 'utils/other/EnvironmentValues';
import ChartMultiple from 'components/elements/ChartMultiple';

export default function GrowthPage() {
  const dispatch = useDispatch();
  const sidebarReducer = useSelector((state) => state.sidebarReducer);

  const [toddlers, setToddlers] = React.useState({});
  const [inspections, setInspections] = React.useState([]);

  useEffect(() => {
	if (!(sidebarReducer.isOpen.findIndex((id) => id === 'growth') > -1)) {
		dispatch({ type: MENU_OPEN, id: 'growth' });
	}

	const listenerToddlers = onSnapshot(collection(db, 'toddlers'), (snapshot) => {
		setToddlers(snapshot.docs.map((document) => ({ id: document.id, ...document.data() })));
	});
	const listenerInspections = onSnapshot(collection(db, "inspections"), (snapshot) => {
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
		<PageContentHeader title="Grafik Pertumbuhan" />
		<Grid container spacing={2}>
			<Grid item xs={12} md={6}>
				<Box sx={{ 
					backgroundColor:"rgba(255,255,255,0.5)",
					border : "5px solid rgba(255,255,255,0.5)", 
					padding: 2,
					paddingBottom: 0,
					borderRadius: 5,
					boxSizing: "border-box",
					display: "flex",
					flexDirection: "column",
					height:"100%",
				}}>
					<Typography variant="h4">Distribusi Status Gizi</Typography>
					<Box sx={{flex:1, display:"flex", justifyContent:"space-between", alignItems:"stretch", gap: 5}}>
						<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
							<ChartSingle
								id={`ChartA`}
								type="pie"
								label={[...new Set(inspections.map((inspection) => inspection.status))].filter((_)=>_)}
								data={[...new Set(inspections.map((inspection) => inspection.status))].filter((_)=>_).map(
									(_) => new Set(inspections.filter((inspection) => inspection.status === _).map((__)=>__.toddlerId)).size
								)}
								colors={colors.slice(0, new Set(inspections.map((inspection) => inspection.status).filter((_)=>_)).size)}
							/>
						</Box>
						<Box sx={{
							flex:1,
							flexDirection:"column", 
							display:"flex", 
							justifyContent:"center", 
							alignItems:"flex-start", 
							gap: {xs:"8px", sm:"10px"}
						}}>
							<Typography variant='p' fontWeight="bold">Keterangan : </Typography>
							{[...new Set(inspections.map((inspection) => inspection.status))].filter((_)=>_).map((_,__)=>{
								return <Box key={__} sx={{ display:"flex", gap: {xs:"8px", sm:"10px"} , alignItems:"center" }}>
									<Box
										sx={{
											backgroundColor: colors[__],
											height: { xs: '12px', sm: '15px' },
											width: { xs: '12px', sm: '15px' },
											borderRadius: { xs: '2px', sm: '3px' },
											boxShadow: { xs: '0 0 1px 1px rgba(0,0,0,0.15)', sm: '0 0 2px 2px rgba(0,0,0,0.15)' }
										}}
									/>
									<Typography variant='p'>{_}</Typography>
								</Box>
							})}
						</Box>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={12} md={6}>
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
						<ChartMultiple
							id={`ChartB`}
							type="bar"
							label={[...new Set(inspections.filter((_)=>new Date(_.date) >= new Date(`${new Date().getFullYear()}-01-01`)).map((_)=>new Date(_.date).getMonth()))].sort().map((_)=>timelineValues["bulan"][_].slice(0,3))}
							datas={[
								{
									name: 'Berat',
									data: [...new Set(inspections.filter((_)=>new Date(_.date) >= new Date(`${new Date().getFullYear()}-01-01`)).map((_)=>new Date(_.date).getMonth()))].map((_)=>(inspections.filter((inspection) => new Date(inspection.date).getMonth() === _).reduce((acc, curr) => acc + (curr.weight || 0), 0) / inspections.filter((inspection) => new Date(inspection.date).getMonth() === _).length || 0) | 0)
								},
								{
									name: 'Tinggi',
									data: [...new Set(inspections.filter((_)=>new Date(_.date) >= new Date(`${new Date().getFullYear()}-01-01`)).map((_)=>new Date(_.date).getMonth()))].map((_)=>(inspections.filter((inspection) => new Date(inspection.date).getMonth() === _).reduce((acc, curr) => acc + (curr.height || 0), 0) / inspections.filter((inspection) => new Date(inspection.date).getMonth() === _).length || 0) | 0)
								},
							]}
							notes={['Berat Badan', 'Tinggi Badan']}
							colors={colors.slice(1, 3)}
						/>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={12} md={6}>
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
						<ChartMultiple
							id={`ChartC`}
							type="bar"
							label={[...new Set(inspections.map((inspection) => inspection.status))].filter((_)=>_).map((_)=>_.replaceAll("Gizi ", ""))}
							datas={[
								{
									name: 'Laki-laki',
									data: [...new Set(inspections.map((inspection) => inspection.status))].filter((_)=>_).map((_)=>[...new Set(inspections.filter((__)=>__.status === _).filter((__)=>toddlers.find((___)=>__.toddlerId===___.id)?.gender==="Male").map((_)=>_.toddlerId))].length)
								},
								{
									name: 'Perempuan',
									data: [...new Set(inspections.map((inspection) => inspection.status))].filter((_)=>_).map((_)=>[...new Set(inspections.filter((__)=>__.status === _).filter((__)=>toddlers.find((___)=>__.toddlerId===___.id)?.gender==="Female").map((_)=>_.toddlerId))].length)
								},
							]}
							notes={['Laki-Laki', 'Perempuan']}
							colors={[colors[0], colors[5]]}
						/>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={12} md={6}>
				<Box sx={{ 
					backgroundColor:"rgba(255,255,255,0.5)",
					border : "5px solid rgba(255,255,255,0.5)", 
					padding: 2,
					paddingBottom: 0,
					borderRadius: 5,
					boxSizing: "border-box",
					display: "flex",
					flexDirection: "column",
					height: "100%"
				}}>
					<Typography variant="h4">Jumlah Pemeriksaan</Typography>
					<Box sx={{flex: 1, marginBottom : -2, display: "flex", alignItems: "center"}}>
						<Box flex={1}>
							<ChartSingle
								id={`ChartD`}
								type="line"
								label={[...new Set(inspections.filter((_)=>new Date(_.date) >= new Date(`${new Date().getFullYear()}-01-01`)).map((_)=>new Date(_.date).getMonth()))].sort().map((_)=>timelineValues["bulan"][_].slice(0,3))}
								data={[...new Set(inspections.filter((_)=>new Date(_.date) >= new Date(`${new Date().getFullYear()}-01-01`)).map((_)=>new Date(_.date).getMonth()))].map((_)=>(inspections.filter((inspection) => new Date(inspection.date).getMonth() === _).length))}
								color="#FFD43C"
							/>
						</Box>
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
					<Typography variant='p'><b>Keterangan :</b> Grafik yang disajikan merupakan ringkasan untuk seluruh balita dalam periode waktu yang ditentukan</Typography>
				</Box>
			</Grid>
		</Grid>
	</PageRoot>
  );
}
