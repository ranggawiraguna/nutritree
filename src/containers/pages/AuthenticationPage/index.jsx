import { Avatar, Box, Button, CardMedia, ClickAwayListener, TableCell, TableRow, Typography } from '@mui/material';
import { tableDisplayType } from 'utils/other/EnvironmentValues';
import TableDisplay from 'containers/templates/TableDisplay';
import PageRoot from './styled';
import IconOptiontDetail from 'assets/images/icon/OptionDetail.svg';
import { Fragment, useEffect, useState } from 'react';
import { MENU_OPEN } from 'utils/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import DialogEditStaff from 'components/views/DialogActionAuth/EditStaff';
import DialogAddStaff from 'components/views/DialogActionAuth/AddStaff';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db, otherAuth } from 'config/database/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import AlertToast from 'components/elements/AlertToast';

const tableHeadContent = ['No.', 'Username', 'Email', 'Nama Lengkap', 'Foto Profil', 'Ubah Akun'];
const tableAlignContent = ['center', 'left', 'left', 'left', 'center', 'center'];

export default function AuthenticationPage() {
  const dispatch = useDispatch();
  const sidebarReducer = useSelector((state) => state.sidebarReducer);

  const [openDialogAddStaff, setOpenDialogAddStaff] = useState(false);
  const [openDialogEditStaff, setOpenDialogEditStaff] = useState(false);
  const [alertDescription, setAlertDescription] = useState({
    isOpen: false,
    type: 'info',
    text: '',
    transitionName: 'slideUp'
  });

  const [accountSelected, setAccountSelected] = useState({
    username: '',
    fullname: '',
    photoUrl: ''
  });

  const [admins, setAdmins] = useState([]);
  const [isOpenOption, setIsOpenOption] = useState([]);

  const handleSendLinkReset = (email) => {
    sendPasswordResetEmail(otherAuth, email)
      .then(() => {
        setAlertDescription({
          isOpen: true,
          type: 'success',
          text: 'Link reset password telah dikirim melalui email',
          transitionName: 'slideUp'
        });
      })
      .catch((error) => {
        setAlertDescription({
          isOpen: true,
          type: 'warning',
          text: error.toString(),
          transitionName: 'slideUp'
        });
      });
  };

  useEffect(() => {
    if (!(sidebarReducer.isOpen.findIndex((id) => id === 'authentication') > -1)) {
      dispatch({ type: MENU_OPEN, id: 'authentication' });
    }

    const listenerAdmins = onSnapshot(query(collection(db, 'admins'), where('role', '==', 'staff')), (snapshot) => {
      setAdmins(snapshot.docs.map((document) => ({ id: document.id, ...document.data() })));
      setIsOpenOption(snapshot.docs.map(() => false));
    });

    return () => {
      listenerAdmins();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <PageRoot>
        <TableDisplay
          title="Data Akun Petugas "
          withButtonHeader={true}
          buttonText="Tambah Petugas"
          buttonAction={() => setOpenDialogAddStaff(true)}
          tableContentType={tableDisplayType.row}
          tableAlignContent={tableAlignContent}
          tableHeadContent={tableHeadContent}
          tableBodyContent={(() => {
            if (admins.length <= 0) {
              return (
                <TableRow>
                  <TableCell colSpan={tableHeadContent.length} align="center">
                    <Typography variant="p" component="p" sx={{ color: 'rgba(0,0,0,0.6)' }}>
                      Belum terdapat admin pada bagian penjualan
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            }

            return admins.map((admin, index) => (
              <TableRow key={index}>
                <TableCell align={tableAlignContent[0]}>{index + 1}</TableCell>
                <TableCell align={tableAlignContent[1]}>{admin.username}</TableCell>
                <TableCell align={tableAlignContent[2]}>{admin.email}</TableCell>
                <TableCell align={tableAlignContent[3]}>{admin.fullname}</TableCell>
                <TableCell align={tableAlignContent[4]}>
                  <Avatar sx={{ margin: '0 auto' }} src={admin.photoUrl} />
                </TableCell>
                <TableCell align={tableAlignContent[5]}>
                  <ClickAwayListener
                    mouseEvent="onMouseDown"
                    touchEvent="onTouchStart"
                    onClickAway={() => {
                      if (isOpenOption[index]) {
                        isOpenOption[index] = false;
                        setIsOpenOption(Array.from(isOpenOption));
                      }
                    }}
                  >
                    <Box>
                      <Button
                        type="Button"
                        onClick={() => {
                          isOpenOption[index] = !isOpenOption[index];
                          setIsOpenOption(Array.from(isOpenOption));
                        }}
                      >
                        <CardMedia component="img" src={IconOptiontDetail} />
                      </Button>
                      {(() => {
                        const closeClickaway = (callback) => {
                          callback();
                          isOpenOption[index] = !isOpenOption[index];
                          setIsOpenOption(Array.from(isOpenOption));
                        };

                        return isOpenOption[index] ? (
                          <Box>
                            <Button
                              onClick={() => {
                                closeClickaway(() => {
                                  setAccountSelected({ fullname: admin.fullname, photoUrl: admin.photoUrl, username: admin.username });
                                  setOpenDialogEditStaff(true);
                                });
                              }}
                            >
                              Edit Info
                            </Button>
                            <Button
                              onClick={() => {
                                closeClickaway(() => {
                                  handleSendLinkReset(admin.email);
                                });
                              }}
                            >
                              Kirim Link Reset
                            </Button>
                          </Box>
                        ) : (
                          <></>
                        );
                      })()}
                    </Box>
                  </ClickAwayListener>
                </TableCell>
              </TableRow>
            ));
          })()}
        />
      </PageRoot>
      <DialogEditStaff data={accountSelected} open={openDialogEditStaff} onClose={() => setOpenDialogEditStaff(false)} />
      <DialogAddStaff open={openDialogAddStaff} onClose={() => setOpenDialogAddStaff(false)} />
      <AlertToast description={alertDescription} setDescription={setAlertDescription} />
    </Fragment>
  );
}
