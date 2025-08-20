import ToolbarStarted from 'components/elements/ToolbarStarted';
import IllustrationTaskManagement from 'assets/images/illustration/TaskManagement.svg';
import PageRoot from './styled';
import AlertToast from 'components/elements/AlertToast';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import IllustrationProfileChangePassword from 'assets/images/illustration/ProfileChangePassword.svg';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { forwardRef, Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createSession } from 'utils/redux/reducers/account';
import { BoxTransition } from 'components/elements/MotionTransitions';
import { useTheme } from '@emotion/react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from 'config/database/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const DialogForgotPassword = forwardRef(({ open, onClose, showAlert, ...others }, ref) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [isSendingLinkProcess, setIsSendingLinkProcess] = useState(false);

  const [inputUsername, setInputUsername] = useState('');

  const handleChangeInput = (event) => {
    setInputUsername(event.target.value);
  };

  const handleClose = () => {
    if (!isSendingLinkProcess) {
      onClose();
      setIsSendingLinkProcess(false);
      setTimeout(() => {
        setInputUsername('');
      }, 500);
    }
  };

  const handleSendLinkReset = async () => {
    if (!isSendingLinkProcess) {
      setIsSendingLinkProcess(true);
      let docSnapshot = null;
      try {
        docSnapshot = await getDoc(doc(db, 'admins', inputUsername));
      } catch (e) {
        showAlert('warning', 'Terjadi kesalahanm silahkan coba kembali');
        setIsSendingLinkProcess(false);
      }

      if (docSnapshot !== null && docSnapshot.exists()) {
        await sendPasswordResetEmail(auth, docSnapshot.data().email)
          .then(() => {
            showAlert('success', 'Email reset password telah dikirim melalui email');
            setIsSendingLinkProcess(false);
          })
          .catch((error) => {
            showAlert('warning', error.toString());
            setIsSendingLinkProcess(false);
          });
      } else {
        showAlert('error', 'Username yang dimasukkan tidak ditemukan');
        setIsSendingLinkProcess(false);
      }
    }
  };

  return (
    <Fragment>
      <Dialog ref={ref} open={open} {...others} fullScreen={fullScreen} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle>
          <Grid container sx={{ position: 'relative', marginTop: 2, marginBottom: 1 }} justifyContent="center" alignItems="center">
            <Typography variant="h3" component="h3">
              Lupa Password Anda ?
            </Typography>
            <IconButton
              sx={{ position: 'absolute', right: 0, top: -12 }}
              color="inherit"
              onClick={() => handleClose(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container textAlign="center" alignItems="center" justifyContent="center" gap={3} direction="column" minWidth={{ md: 450 }}>
            <Grid container direction="column" alignItems="center">
              <Typography
                variant="p"
                component="p"
                sx={{
                  marginBottom: { xs: 5, md: 3 },
                  fontSize: 18,
                  lineHeight: 1.2,
                  width: '80%'
                }}
              >
                Masukkan Username untuk mendapatkan link
                <br />
                reset password melalui email terdaftar
              </Typography>
              <CardMedia
                component="img"
                src={IllustrationProfileChangePassword}
                sx={{ width: 240, height: 240 }}
                marginTop={3}
                marginBottom={1}
              />
            </Grid>
            <FormControl
              sx={{
                width: '80%',
                input: { textAlign: 'center', fontSize: 18, fontWeight: 'normal' },
                label: { display: 'none' },
                legend: { display: 'none' }
              }}
              variant="outlined"
              className="input"
            >
              <OutlinedInput
                id="InputUsername"
                type="name"
                value={inputUsername}
                onChange={handleChangeInput}
                label="Username"
                placeholder="Masukkan Username"
                autoComplete="off"
              />
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent="center">
            <Button
              variant="contained"
              onClick={handleSendLinkReset}
              sx={{ fontSize: 16, fontWeight: 'bold', width: '50%', marginBottom: 2 }}
            >
              Kirim Link Reset
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
});

DialogForgotPassword.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};

DialogForgotPassword.defaultProps = {
  open: false,
  onClose: () => {}
};

export default function LoginPage() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const accountReducer = useSelector((state) => state.accountReducer);

  const [openDialogForgotPassword, setOpenDialogForgotPassword] = useState(false);

  const [values, setValueChangeds] = useState({
    username: '',
    password: '',
    showPassword: false
  });

  const [isLoginProcess, setIsLoginProcess] = useState(false);

  const [alertDescription, setAlertDescription] = useState({
    isOpen: false,
    type: 'info',
    text: '',
    transitionName: 'slideUp'
  });

  const clearLoginForm = () => {
    setValueChangeds({
      username: '',
      password: ''
    });
    setIsLoginProcess(false);
  };

  const showAlertToast = (type, text) =>
    setAlertDescription({
      ...alertDescription,
      isOpen: true,
      type: type,
      text: text
    });

  const handleChange = (prop) => (event) => {
    setValueChangeds({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValueChangeds({
      ...values,
      showPassword: !values.showPassword
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLoginSession = async () => {
    dispatch(
      createSession({
        data: {
          username: values.username,
          password: values.password
        },
        isLoginProcess: isLoginProcess,
        setIsLoginProcess: setIsLoginProcess,
        showAlertToast: showAlertToast,
        navigate: navigate,
        clearLoginForm: clearLoginForm
      })
    );
  };

  useEffect(() => {
    if (accountReducer.isLogin === true) {
      switch (accountReducer.role) {
        case 'staff':
          return navigate('/staff/dashboard');

        case 'admin':
          return navigate('/admin/dashboard');

        default:
          return navigate('/');
      }
    }
  });

  return (
    <Fragment>
      <PageRoot>
        <Box className="box-content">
          <ToolbarStarted buttonLink="/" buttonText="Halaman Depan" />
          <Box className="content-section">
            <BoxTransition variant="fadeZoom" duration={0.25}>
              <h2>Login Akun</h2>
              <p>Masukkan username dan password untuk dapat mengakses halaman Pengurus</p>
              <CardMedia component="img" src={IllustrationTaskManagement} />
              <Box component="form" className="login-form">
                <FormControl variant="outlined" className="input">
                  <InputLabel htmlFor="InputUsername">Username</InputLabel>
                  <OutlinedInput
                    id="InputUsername"
                    type="text"
                    className="normal-border"
                    value={values.username}
                    onChange={handleChange('username')}
                    label="Username"
                  />
                </FormControl>
                <FormControl variant="outlined" className="input">
                  <InputLabel htmlFor="InputPassword">Password</InputLabel>
                  <OutlinedInput
                    id="InputPassword"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <Button className="forgot-password" variant="text" onClick={() => setOpenDialogForgotPassword(true)}>
                  Lupa Password ?
                </Button>
                <Button onClick={handleLoginSession} variant="contained">
                  Masuk
                </Button>
              </Box>
              <Box>
                <p>Aplikasi ini hanya digunakan untuk Pengurus Posyandu</p>
              </Box>
            </BoxTransition>
            <BoxTransition variant="fade" duration={0.5}>
              <img src={IllustrationTaskManagement} alt="" />
            </BoxTransition>
          </Box>
        </Box>
      </PageRoot>
      <DialogForgotPassword open={openDialogForgotPassword} onClose={() => setOpenDialogForgotPassword(false)} showAlert={showAlertToast} />
      <AlertToast description={alertDescription} setDescription={setAlertDescription} />
    </Fragment>
  );
}
