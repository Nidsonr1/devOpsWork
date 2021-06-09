import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import LogonHero from './pages/LogonHero'
import RegisterHero from './pages/Register/hero';
import RegisterOng from './pages/Register/ong';
import NewCases from './pages/NewCases';
import ProfileOng from './pages/ProfileOng';
import ProfileHero from './pages/ProfileHero';
import CasesOng from './pages/CasesOng';

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/logonHero" component={LogonHero} />


        <Route path="/cadastrarHeroi" component={RegisterHero} />
        <Route path="/cadastrarOng" component={RegisterOng} />

        <Route path="/novoCaso" component={NewCases} />
        <Route path="/ong_cases" component={CasesOng} />

        <Route path="/homeOng" component={ProfileOng}/>
        <Route path="/homeHero" component={ProfileHero}/>
      </Switch>
    </BrowserRouter>
  );
}