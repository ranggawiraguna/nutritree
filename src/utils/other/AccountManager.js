/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from 'react-router-dom';
import { CLEAR_SESSION } from 'utils/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'config/firebase';
import { restoreSession } from 'utils/redux/reducers/account';

export default function AccountManager() {
  const dispatch = useDispatch();
  const accountReducer = useSelector((state) => state.accountReducer);

  onAuthStateChanged(auth, (user) => {
    if (user && accountReducer.uid === '') {
      dispatch(restoreSession({ data: user.uid }));
    } else if (!user && accountReducer.isLogin == null) {
      dispatch({
        type: CLEAR_SESSION
      });
    }
  });

  return <Outlet />;
}
