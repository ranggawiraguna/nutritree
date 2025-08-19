import * as React from 'react';
import { useEffect } from 'react';
import { MENU_OPEN } from 'utils/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import PageRoot from './styled';
import ToddlerForm from 'containers/templates/ToddlerForm';
import { useNavigate, useParams } from 'react-router';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from 'config/database/firebase';
import AlertToast from 'components/elements/AlertToast';

export default function ToddlerEditPage() {
  const dispatch = useDispatch();
  const sidebarReducer = useSelector((state) => state.sidebarReducer);
  const accountReducer = useSelector((state) => state.accountReducer);
  const params = useParams();
  const navigate = useNavigate();

  const [toddler, setToddler] = React.useState({});
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
        setDoc(doc(db, 'toddlers', params.id), value).catch((_) => {
          showAlertToast('error', 'Terjadi kesalahan saat memperbarui data balita');
        }).then((_)=>{
          showAlertToast('success', 'Data balita berhasil diperbarui');
          setTimeout(() => {
            navigate(`/${accountReducer.role}/data-balita/${params.id}`);
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

    const listenerToddlers = onSnapshot(doc(db, 'toddlers', params.id), (snapshot) => {
      setToddler(snapshot.data());
    });

    return () => {
      listenerToddlers();
    };
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
	<PageRoot>
		<ToddlerForm title="Edit Data Balita" onSubmitForm={handleSubmitForm} value={toddler}/>
    <AlertToast description={alertDescription} setDescription={setAlertDescription} />
	</PageRoot>
  );
}
