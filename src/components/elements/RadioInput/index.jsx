import { Box, FormControlLabel, Radio, Typography } from "@mui/material";
import Component from "./styled"
import { useState } from "react";


export default function RadioInput({ name, title, options, direction }) {
	const [value, setValue] = useState(null);

	return (
		<Box sx={{marginTop: 2}}>
			<Typography variant="p">{title}</Typography>
			<Component name={name} value={value} onChange={(_)=>setValue(_.target.value)} sx={{display: "flex", gap: 2, flexDirection: direction}}>
				{options.map((option) => <FormControlLabel value={option.value} control={<Radio />} label={option.label} />)}
			</Component>
		</Box>
	)
}