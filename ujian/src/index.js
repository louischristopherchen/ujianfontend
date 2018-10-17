import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducer';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './support/css/bootstrap.min.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const store = createStore(reducers,{},applyMiddleware(ReduxThunk));
ReactDOM.render(
    <Provider store={store}>
<BrowserRouter>
<App />
</BrowserRouter>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
