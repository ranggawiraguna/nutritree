import {
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  NativeSelect
} from '@mui/material';
import { styledComp, SelectInput } from './styled';

export default function TableDisplay({
  withButtonHeader,
  withOptionHeader,
  title,
  buttonText,
  buttonAction,
  optionSelected,
  optionValues,
  optionAction,
  tableContentType,
  tableAlignContent,
  tableHeadContent,
  tableBodyContent
}) {
  const Component = styledComp(tableContentType);

  return (
    <Component
      gridTemplateAreas={
            `
              "A B"
              "C C"
            `
      }
    >
      <Box gridArea="A">
        <Typography className="table-title" variant="h2" component="h2">
          {title}
        </Typography>
      </Box>
      <Box gridArea="B">
        {(() => {
          return withButtonHeader ? (
            <Button className="table-action" variant="contained" onClick={buttonAction}>
              {buttonText}
            </Button>
          ) : withOptionHeader ? (
            <NativeSelect value={optionSelected} onChange={(e) => optionAction(e.target.value)} input={<SelectInput />}>
              {(() => {
                return optionValues.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ));
              })()}
            </NativeSelect>
          ) : (
            <></>
          );
        })()}
      </Box>
      <Box gridArea="C">
        <TableContainer className="table-container" component={Paper}>
          <Table>
            <TableHead />
            <TableHead>
              <TableRow>
                {(() => {
                  return tableHeadContent.map((content, index) => (
                    <TableCell key={`header-${index}`} align={tableAlignContent[index]}>
                      {content}
                    </TableCell>
                  ));
                })()}
              </TableRow>
            </TableHead>
            <TableBody>{tableBodyContent}</TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Component>
  );
}
