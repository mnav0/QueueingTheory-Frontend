import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import "./App.css"

import { IntroContainer } from "src/components/IntroContainer"
import { SimContainer } from "src/components/SimContainer"
import { IconBar } from "src/components/IconBar"
import { ED } from 'src/simulatorV2/tsSim/ED';
import DeptSim from 'src/pages/DeptSim';
import CTSim from 'src/pages/CTSim';
import Layout from 'src/components/Layout/Layout';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route exact path="/" component={DeptSim} />
          <Route path="/ct" component={CTSim} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
