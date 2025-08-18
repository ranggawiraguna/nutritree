import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export default styled(InputBase)(({ theme }) => ({
  width: "100%",
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#F3F6F9',
    border: '1px solid',
    borderColor: '#E0E3E7',
    fontSize: 14,
    width: '100%',
    padding: '5px 6px',
    height: 24,
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    fontFamily: [
      'Folks',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
      borderColor: '#2D3843',
    }),
  },
}));
