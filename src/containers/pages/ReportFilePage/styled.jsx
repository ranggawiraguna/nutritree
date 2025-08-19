import { Box, styled } from '@mui/material';

export default styled(Box)(({ theme }) => ({
  boxSizing:"border-box",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
}));
