import * as React from 'react';
import { useEffect } from 'react';
import { MENU_OPEN } from 'utils/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import PageRoot from './styled';
import ToddlerForm from 'containers/templates/ToddlerForm';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'config/database/firebase';
import AlertToast from 'components/elements/AlertToast';
import { useNavigate } from 'react-router';

export default function ToddlerCreatePage() {
  const dispatch = useDispatch();
  const sidebarReducer = useSelector((state) => state.sidebarReducer);
  const accountReducer = useSelector((state) => state.accountReducer);
  const navigate = useNavigate();
  
  const [loading, setLoading] = React.useState(false);
  const [alertDescription, setAlertDescription] = React.useState({
    isOpen: false,
    type: 'info',
    text: '',
    transitionName: 'slideUp'
    });

  const showAlertToast = (type, text) =>
    setAlertDescription({
      ...alertDescription,
      isOpen: true,
      type: type,
      text: text
    });

  const handleSubmitForm = React.useCallback((value) => {
    if(!loading){
      setLoading(true);
      addDoc(collection(db, 'toddlers'), value).catch((_) => {
        showAlertToast('error', 'Terjadi kesalahan saat menambahkan data balita');
      }).then((_)=>{
        showAlertToast('success', 'Data balita berhasil ditambahkan');
        setTimeout(() => {
          navigate(`/${accountReducer.role}/data-balita`);
        }, 2000);
      }).finally(() => {
        setLoading(false);
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
		if (!(sidebarReducer.isOpen.findIndex((id) => id === 'toddler-data') > -1)) {
  		dispatch({ type: MENU_OPEN, id: 'toddler-data' });
		}

    return () => {
		//
    };
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
	<PageRoot>
		<ToddlerForm title="Form Tambah Balita" onSubmitForm={handleSubmitForm} />
    <AlertToast description={alertDescription} setDescription={setAlertDescription} />
	</PageRoot>
  );
}
