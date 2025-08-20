import { Box, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Component from "./styled"
import dayjs from "dayjs";
	
export default function BootstrapInput({title, type, value, setValueChanged}) {
  return (
	<Box sx={title ? { width: "100%", marginTop: 2, position: "relative" } : {}}>
		{
			title ? <Typography variant="p">
				{title}
			</Typography> : <></>
		}
		<Box sx={title ? { position: "relative", paddingTop: 1 } : {}}>
			{
				type === "date" ? <LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						label="Tanggal Lahir"
						value={value ? dayjs(value) : null}
						onChange={(newValue) => setValueChanged(newValue ? newValue.format("YYYY-MM-DD") : "")}
						slots={{
							textField: (params) => (
								<Box sx={{ position: "relative" }}>
									<Component ref={params.inputRef} inputProps={{...params.inputProps, value: value ? dayjs(value).format("DD/MM/YYYY") : ""}} value={value ? dayjs(value).format("DD/MM/YYYY") : ""} />
									<Box sx={{ 
										position: "absolute", 
										top: "50%",
										transform: "translateY(-50%)",
										right:15, 
										width:28, 
										height:28, 
										display:"flex",
										justifyContent: "center",
										alignItems: "center",
									}}>
										{params.InputProps?.endAdornment}
									</Box>
								</Box>
							),
						}}
					/>
				</LocalizationProvider> : <Component value={value} onChange={(_)=>setValueChanged(_.target.value)} />
			}			
		</Box>
	</Box>
  );
}
