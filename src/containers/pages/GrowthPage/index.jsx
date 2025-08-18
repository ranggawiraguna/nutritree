import * as React from 'react';
import { useEffect } from 'react';
import { MENU_OPEN } from 'utils/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import PageRoot from './styled';
import PageContentHeader from 'components/elements/PageContentHeader';

export default function GrowthPage() {
  const dispatch = useDispatch();
  const sidebarReducer = useSelector((state) => state.sidebarReducer);

  useEffect(() => {
	if (!(sidebarReducer.isOpen.findIndex((id) => id === 'grafik-pertumbuhan') > -1)) {
		dispatch({ type: MENU_OPEN, id: 'grafik-pertumbuhan' });
	}

	return () => {
		//
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
	<PageRoot>
		<PageContentHeader title="Grafik Pertumbuhan" />
	</PageRoot>
  );
}
