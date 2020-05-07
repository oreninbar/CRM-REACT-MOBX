import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GeneralStore } from './stores/generalStore.js'
import { Provider } from 'mobx-react'

const generalStore = new GeneralStore()
generalStore.initCustomersList()
generalStore.initOwnersLists()
generalStore.initConnectionsLists()

let stores = {generalStore}


ReactDOM.render(<Provider {...stores}><App /></Provider>, document.getElementById('root'));


