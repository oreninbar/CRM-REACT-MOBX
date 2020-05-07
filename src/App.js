import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import header from './components/Header'
import Header from './components/header/Header'
import Dashboard from './components/dashboard/Dashboard'
import Client from './components/client/Client'
import Actions from './components/actions/Actions'
import HomePage from './components/home/HomePage'
import './App.css'


export default class App extends Component {
    render() {
        return (
            <Router>
                <div className='main-container'>
                    <div className='header-container'>
                        <Header />
                    </div>
                    <div className='page-container'>
                        <Route path="/client" exact render={() => <Client />} />
                        <Route path="/analytics" exact render={() => <Dashboard />} />
                        <Route path="/actions" exact render={() => <Actions />} />
                        <Route path="/homePage" exact render={() => <HomePage />} />
                        {/* <Route path="/client" exact render={({ match }) => <EditPopUp match={match}/>} /> */}
                        {/* <Route path="/PageNotFound" exact render={() => <PageNotFound />} /> */}
                    </div>
                </div>
            </Router>
        )
    }


}
























// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { observer } from 'mobx-react'

// @observer
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//         </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//         </a>
//         </header>
//       </div>
//     );
//   }
// }
// export default App;
