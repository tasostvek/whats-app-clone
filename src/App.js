import './App.css';
import Sidebar from './Sidebar';
import Chat from "./Chat";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './Login';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';
import { auth } from './firebase';
import { actionTypes } from './Reducer';


function App() {
  const [{user}, dispatch] = useStateValue();

  useEffect(()=> {
    auth.onAuthStateChanged(user => {
      if(user){
        dispatch({
          type: actionTypes.SET_USER,
          user: user,
      });
      }
    })
  },[])
  return (
    //BEM naming convetion
    <div className="app">
      {!user ? (
        <Login/>
      ): (
        <div className="app_body">
          <Router>
            <Switch/>
              <Sidebar/>
              <Route path="/rooms/:roomId">
                <Chat/>
              </Route>
              {/*<Route exact path="/">
                <Chat/>
              </Route>*/}
            <Switch/>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
