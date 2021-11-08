
import './App.css';
import { Route,Switch } from 'react-router-dom';
import Landing from './Components/Landing';
import Signup from './Components/Signup';
import Employee_Landing from './Components/Employee_Landing';
import AddFlight from './Components/AddFlight';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing}></Route>
        
        <Route path="/signup" component={Signup}></Route>
        <Route path="/employeeLogin" component={Employee_Landing}></Route>
        <Route path="/addflight" component={AddFlight}></Route>
        </Switch>
     
    </div>
  );
}

export default App;
