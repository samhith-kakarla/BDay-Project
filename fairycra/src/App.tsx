import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'; 

// PAGES
import Login from './pages/twinProv/Login'; 
import Register from './pages/twinProv/Register'; 
import ForgotPass from './pages/twinProv/ForgotPass'; 
import ResetPass from './pages/twinProv/ResetPass'; 
import ResetPassConfirm from './pages/twinProv/ResetPassConfirm'; 
import TwinsDashboard from './pages/twinProv/TwinsDashboard'; 
import AddNewTwin from './pages/twinProv/AddNewTwin'; 
import DeleteTwin from './pages/twinProv/DeleteTwin'; 
import UpdateTwinInfo from './pages/twinProv/UpdateTwinInfo'; 
import UploadTwinImages from './pages/twinProv/UploadTwinImages'; 

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
                            <Route exact path={"/t/login"} component={Login} />
                            <Route exact path={"/t/register"} component={Register} />
                            <Route exact path={"/t/forgot-password"} component={ForgotPass} />
                            <Route exact path={"/t/reset-password"} component={ResetPass} />
                            <Route exact path={"/t/reset-password-confirm"} component={ResetPassConfirm} />
                            <Route exact path={"/t/dashboard"} component={TwinsDashboard} />
                            <Route exact path={"/t/add"} component={AddNewTwin} />
                            <Route exact path={"/t/delete"} component={DeleteTwin} />
                            <Route exact path={"/t/update"} component={UpdateTwinInfo} />
                            <Route exact path={"/t/upload"} component={UploadTwinImages} />

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
