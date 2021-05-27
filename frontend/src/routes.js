import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import RegisterHero from './pages/Register/hero';
import RegisterOng from './pages/Register/ong';

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
         <Route path="/" exact component={Logon} />
         <Route path="/cadastrarHeroi" component={RegisterHero} />
         <Route path="/cadastrarOng" component={RegisterOng} />
      </Switch>
    </BrowserRouter>
  );
}