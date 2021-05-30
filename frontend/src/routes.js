import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import RegisterHero from './pages/Register/hero';
import RegisterOng from './pages/Register/ong';
import NewCases from './pages/NewCases';
import ProfileOng from './pages/profile/ong';
import ProfileHero from './pages/profile/hero';

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
         <Route path="/" exact component={Logon} />
         <Route path="/cadastrarHeroi" component={RegisterHero} />
         <Route path="/cadastrarOng" component={RegisterOng} />
         <Route path="/novoCaso" component={NewCases} />
         <Route path="/homeOng" component={ProfileOng}/>
         <Route path="/homeHero" component={ProfileHero}/>
      </Switch>
    </BrowserRouter>
  );
}