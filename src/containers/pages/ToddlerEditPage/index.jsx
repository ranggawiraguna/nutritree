import * as React from 'react';
import { useEffect } from 'react';
import { MENU_OPEN } from 'utils/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import PageRoot from './styled';
import ToddlerForm from 'containers/templates/ToddlerForm';

export default function ToddlerEditPage() {
  const dispatch = useDispatch();
  const sidebarReducer = useSelector((state) => state.sidebarReducer);

  const handleSubmitForm = React.useCallback(() => {
	//
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
		<ToddlerForm title="Edit Data Balita" onSubmitForm={handleSubmitForm} />
	</PageRoot>
  );
}
