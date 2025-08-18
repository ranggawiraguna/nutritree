import { Button, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import Component from "./styled"

export default function PageContentHeader({title, buttonText, buttonAction, buttonIconHidden}){
	return (
		<Component>
			<Typography variant="h2">{title}</Typography>
			{
				buttonAction ? <Button variant="contained" onClick={buttonAction} startIcon={buttonIconHidden ? <></> : <SaveIcon />}>
					{buttonText}
				</Button> : <></>
			}
		</Component>	
	)
}