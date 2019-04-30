import React from 'react';
import {render} from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';

import store from './store';

import Home from './screens/Home';

import './App.css';

const rootElement = document.getElementById('root');

render(<Provider store={store}>
  <Home/>
</Provider>, rootElement);

registerServiceWorker();
