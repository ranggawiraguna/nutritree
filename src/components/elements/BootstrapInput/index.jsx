import { Box, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Component from "./styled"
import dayjs from "dayjs";
	
export default function BootstrapInput({title, type, value, setValue}) {
  return (
	<Box sx={{ width: "100%", marginTop: 2, position: "relative" }}>
		<Typography variant="p">
			{title}
		</Typography>
		<Box sx={{ position: "relative", paddingTop: 1 }}>
			{
				type === "date" ? <LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						label="Tanggal Lahir"
						value={value ? dayjs(value) : null}
						onChange={(newValue) => setValue(newValue ? newValue.format("YYYY-MM-DD") : "")}
						renderInput={({ inputRef, inputProps, InputProps }) => (
							<>
								<Component ref={inputRef} {...inputProps} value={value ? dayjs(value).format("DD/MM/YYYY") : ""} />
								<Box sx={{ 
									position: "absolute", 
									marginTop:0.5, 
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
				</LocalizationProvider> : <Component value={value} onChange={(_)=>setValue(_.target.value)} />
			}			
		</Box>
	</Box>
  );
}
