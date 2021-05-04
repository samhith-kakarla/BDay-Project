import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'; 

// PAGES
import EnterCred from './pages/cakeProv/EnterCred'; 
import CakesDashboard from './pages/cakeProv/CakesDashboard'; 
import CakeOrderInfo from './pages/cakeProv/CakeOrderInfo'; 

// CONTEXT
import AppContextProvider from './context/appContext'; 

function App() {
    return (
        <AppContextProvider>
              <Router>
                  <div className="App">
                        <Switch>
                            {/* MAIN ROUTES */}
                            <Route exact path="/" />

                            {/* FAIRY ROUTES */}
                                
                            {/* TWIN PROVIDER ROUTES */}
                            
                            {/* CAKE PROVIDER ROUTES */}
                            <Route exact path={"/c/enter"} component={EnterCred} />
                            <Route exact path={"/c/dashboard"} component={CakesDashboard} />
                            <Route exact path={"/c/orderInfo"} component={CakeOrderInfo} />
                            
                        </Switch>
                  </div>
              </Router>
        </AppContextProvider>
    );
}

export default App;
