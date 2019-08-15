import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import ChatRoom from './screens/public/chat-room';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={ChatRoom} />
      </Switch>
    </ BrowserRouter>
  );
}

export default App;
