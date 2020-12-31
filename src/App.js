import './App.css';
import Sidebar from './Sidebar';
import Chat from "./Chat";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useState } from 'react';


function App() {
  const [user, setUser] = useState(null)
  return (
    //BEM naming convetion
    <div className="app">
      {!user ? (
        <h1>LOGIN</h1>
      ): (
        <div className="app_body">
          <Router>
            <Switch/>
              <Sidebar/>
              <Route path="/rooms/:roomId">
                <Chat/>
              </Route>
              <Route path="/">
                {/*<Chat/>*/}
              </Route>
            <Switch/>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
