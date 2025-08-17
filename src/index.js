import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from 'app';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'utils/redux/store';
import { ConfirmProvider } from "material-ui-confirm";
import * as serviceWorker from 'serviceWorker';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'assets/scss/style.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfirmProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ConfirmProvider>
    </Provider>
  </React.StrictMode>
);

serviceWorker.unregister();
