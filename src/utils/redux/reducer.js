import { combineReducers } from 'redux';
import sidebarReducer from 'utils/redux/reducers/sidebar';
import accountReducer from 'utils/redux/reducers/account';

const reducer = combineReducers({
  sidebarReducer: sidebarReducer,
  accountReducer: accountReducer
});

export default reducer;
