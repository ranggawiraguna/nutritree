import LogoText from 'assets/images/logo/NutriTreeText.png';
import Component from './styled';
import { Button, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { BoxTransition } from '../MotionTransitions';

export default function ToolbarStarted(props) {
  return (
    <Component disableGutters>
      <CardMedia component="img" src={LogoText} />

      <Link to={props.buttonLink}>
        <BoxTransition variant="fadeZoom" duration={0.5}>
          <Button variant="contained">{props.buttonText}</Button>
        </BoxTransition>
      </Link>
    </Component>
  );
}
