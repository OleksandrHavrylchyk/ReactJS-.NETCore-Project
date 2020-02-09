import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './custom.css';

toast.configure({
    position: "bottom-left",
    autoClose: 2000,
    hideProgressBar: false,
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true,
})

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(<Routes />, document.getElementById('root'))

registerServiceWorker();