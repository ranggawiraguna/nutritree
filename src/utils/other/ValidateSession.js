/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function ValidateSession(props) {
  let navigate = useNavigate();

  const roleDisallow = props.role === 'staff' ? 'admin' : 'staff';
  const accountReducer = useSelector((state) => state.accountReducer);

  const [Page, setPage] = useState(<></>);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    if (accountReducer.isLogin !== null && !sessionChecked) {
      if (accountReducer.isLogin === false) {
        navigate('/login');
      } else {
        if (accountReducer.role === roleDisallow) {
          navigate('/error');
        } else if (accountReducer.role === props.role) {
          setSessionChecked(true);
          setPage(<Outlet />);
        }
      }
    }
  });

  return Page;
}
