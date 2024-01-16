import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './Store'; // Redux 스토어를 가져옵니다.

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import { HashRouter } from 'react-router-dom';

import App from './components/App';

let persistor = persistStore(store);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate basename={process.env.PUBLIC_URL}
      loading={null} persistor={persistor}
    >
      <HashRouter>
        <App />
      </HashRouter>
    </PersistGate>
  </Provider>
);
