import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

// CONTEXT
import { FairyContextProvider } from './context';

// PAGES
import { Home, OurMission } from './pages/Main';
import { Begin, SelectTwin, SelectCake, OrderCake, Complete } from './pages/Fairies';

function App() {
  return (
    <FairyContextProvider>
      <Router>
        <div className="App">
          <Switch>
            {/* MAIN ROUTES */}
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={OurMission} />

            {/* FAIRY ROUTES */}
            <Route exact path="/start" component={Begin} />
            <Route exact path="/select-twin" component={SelectTwin} />
            <Route exact path="/select-cake" component={SelectCake} />
            <Route exact path="/order" component={OrderCake} />
            <Route exact path="/success" component={Complete} />
          </Switch>
        </div>
      </Router>
    </FairyContextProvider>
  );
}

export default App;
