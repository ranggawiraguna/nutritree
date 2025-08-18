import { Box, Typography } from "@mui/material";
import { IconCalendarPlus } from '@tabler/icons';
import Component from "./styled"
	
export default function BootstrapInput({title, type}) {
  return (
	<Box sx={{ width: "100%", marginTop: 2, position: "relative" }}>
		<Typography variant="p">
			{title}
		</Typography>
		<Box sx={{ position: "relative", paddingTop: 1 }}>
			<Component readOnly={type === "date"} />
		{
			type === "date" ? <Box sx={{ 
				position: "absolute", 
				marginTop:0.5, 
				top: "50%",
				transform: "translateY(-50%)",
				right:5, 
				width:28, 
				height:28, 
				display:"flex",
				justifyContent: "center",
				alignItems: "center",
			}}>
				<IconCalendarPlus size={20} />
			</Box> : <></>
		}
		</Box>
	</Box>
  );
}
