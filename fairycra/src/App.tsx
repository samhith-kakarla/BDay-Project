import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'; 

// PAGES

// CONTEXT
import AppContextProvider from './context/appContext'; 

function App() {
    return (
        <AppContextProvider>
              <Router>
                  <div className="App">
                        <Switch>
                            <Route exact path="/" />
                        </Switch>
                  </div>
              </Router>
        </AppContextProvider>
    );
}

export default App;
