import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'; 
import firebase from './firebase/firebaseConfig'; 

// PAGES
import Home from './pages/main/Home'; 
import OurMission from './pages/main/OurMission'; 

import SelectTwin from './pages/fairies/SelectTwin'; 
import SelectCake from './pages/fairies/SelectCake'; 
import OrderCake from './pages/fairies/OrderCake'; 
import Complete from './pages/fairies/Complete'; 

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
import { FairyContext, fairyContextDefault } from './context/providers/fairyContext'; 
import { AuthContext, authContextDefault } from './context/providers/authContext'; 
import { TwinContext, twinContextDefault } from './context/providers/twinContext'; 
import { OrdersContext, ordersContextDefault } from './context/providers/ordersContext'; 

// TYPES
import { Fairy, Twin, Cake, Order } from './context/types'; 

function App() {
    // AUTH STATE
    const [user, setUser] = useState(authContextDefault.user); 
    const [isAuthenticated, setIsAuthenticated] = useState(authContextDefault.isAuthenticated);
    const [loadingAuthState, setLoadingAuthState] = useState(authContextDefault.loadingAuthState); 

    // FAIRY STATE
    const [fairy, setFairy] = useState(fairyContextDefault.fairy); 
    const [matchedTwins, setMatchedTwins] = useState(fairyContextDefault.matchedTwins); 
    const [selectedTwin, setSelectedTwin] = useState(fairyContextDefault.selectedTwin); 
    const [matchedCakes, setMatchedCakes] = useState(fairyContextDefault.matchedCakes); 
    const [selectedCake, setSelectedCake] = useState(fairyContextDefault.selectedCake); 
    const [order, setOrder] = useState(fairyContextDefault.order); 

    // TWIN STATE
    const [twins, setTwins] = useState(twinContextDefault.twins); 

    // ORDERS STATE 
    const [orders, setOrders] = useState(ordersContextDefault.orders); 

    return (
        <AuthContext.Provider
            value={{
                user, isAuthenticated, loadingAuthState, 
                googleAuthenticate, login, signup, logout, 
                sendResetPasswordLink, resetPassword
            }}
        >
        <FairyContext.Provider 
            value={{ 
                fairy, matchedTwins, selectedTwin, matchedCakes, selectedCake, order, 
                becomeAFairy, getMatchedTwins, selectATwin, getFilteredCakes, 
                selectACake, purchaseCake   
            }}
        >
        <TwinContext.Provider
            value={{
                twins,
                getMyTwins, addNewTwin, updateTwinInfo, deleteTwin, 
                updateTwinImages, getTwinImages
            }}
        >
        <OrdersContext.Provider value={{ orders, getOrders, fulfillOrder }} >
              <Router>
                  <div className="App">
                        <Switch>

                            {/* MAIN ROUTES */}
                            <Route exact path="/" component={Home} />
                            <Route exact path="/about" component={OurMission} />

                            {/* FAIRY ROUTES */}
                            <Route exact path="/select-twin" component={SelectTwin} />
                            <Route exact path="/select-cake" component={SelectCake} />
                            <Route exact path="/order" component={OrderCake} />
                            <Route exact path="/success" component={Complete} />

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
                            <Route exact path={"/c/order-info"} component={CakeOrderInfo} />
                            
                        </Switch>
                  </div>
              </Router>
        </OrdersContext.Provider>
        </TwinContext.Provider>
        </FairyContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
