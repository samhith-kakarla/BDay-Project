import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

// PAGES
import { Home, OurMission } from './pages/Main';
import { Begin, SelectTwin, SelectCake, OrderCake, Complete } from './pages/Fairies';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* MAIN ROUTES */}
          <Route exact path="/" component={Home} />
          <Route exact path="/" component={OurMission} />

          {/* FAIRY ROUTES */}
          <Route exact path="/" component={Begin} />
          <Route exact path="/" component={SelectTwin} />
          <Route exact path="/" component={SelectCake} />
          <Route exact path="/" component={OrderCake} />
          <Route exact path="/" component={Complete} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
