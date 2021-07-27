import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CoWin from './components/cowin/coWin';
import Vaccine from './components/cowin/Vaccine';
import './App.css';
import Appoinments from './components/cowin/Appoinments'
import Notification from './components/cowin/Notification'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <CoWin></CoWin>
          </Route>
          <Route path="/registration">
            <CoWin></CoWin>
          </Route>
          <Route path="/vaccine">
            <Vaccine></Vaccine>
          </Route>
          <Route path="/appoinments">
            <Appoinments></Appoinments>
          </Route>
          <Route exact path="/appoinments/:token">
            <Appoinments></Appoinments>
          </Route>
          <Route path="/notification">
            <Notification></Notification>
          </Route>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
