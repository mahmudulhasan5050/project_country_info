import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';

import theme from './custom-theme/theme';
import storeFactory from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeFactory()}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
