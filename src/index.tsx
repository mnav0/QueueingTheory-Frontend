import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StateProvider } from "src/state"
import { QueryParamProvider } from 'use-query-params';

ReactDOM.render(
  <React.StrictMode>
    <QueryParamProvider>
      <StateProvider>
        <App />
      </StateProvider>
    </QueryParamProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

