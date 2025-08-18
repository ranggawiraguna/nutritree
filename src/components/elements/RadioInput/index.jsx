import { Box, FormControlLabel, Radio, Typography } from "@mui/material";
import Component from "./styled"


export default function RadioInput({ name, title, options, direction, value, onChange }) {
	return (
		<Box sx={{marginTop: 2}}>
			<Typography variant="p">{title}</Typography>
			<Component name={name} value={value} onChange={onChange} sx={{display: "flex", gap: 2, flexDirection: direction}}>
				{options.map((option) => <FormControlLabel value={option.value} control={<Radio />} label={option.label} />)}
			</Component>
		</Box>
	)
}