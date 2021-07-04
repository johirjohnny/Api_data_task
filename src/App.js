import './App.css';

import React from 'react';
import List from './Component/List/List';
import GetForm from './Component/GetForm/GetForm';
import Navbar from './Component/Nav/Navbar.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import UpdateForm from './Component/UpdateForm/UpdateForm';

function App() {

  return (
    <div className="App">
      <section>
        <>
          <Router>
            <Navbar/>
              <Switch>
                <Route exact path="/">
                  <List />
                </Route>
                <Route path="/getForm">
                  <GetForm />
                </Route>
                <Route path={`${/updateForm/}:userId`}>  
                  <UpdateForm />
                </Route>
              </Switch>
          </Router>
        </>
      </section>
    </div>
  );
}

export default App;
