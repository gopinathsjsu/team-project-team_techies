import './App.css';
import { Route,Switch } from 'react-router-dom';
import Landing from './Components/Landing';
import Signup from './Components/Signup';
import Employee_Landing from './Components/Employee_Landing';
import AddFlight from './Components/AddFlight';
import CustomerLanding from './Components/CustomerLanding';
import FlightSearch from './Components/FlightSearch';
import EmployeeViewFlights from './Components/EmployeeViewFlights';
import CustomerBookings from './Components/CustomerBookings';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing}></Route>
        
        <Route path="/signup" component={Signup}></Route>
        <Route path="/employee" component={Employee_Landing} exact></Route>
        <Route path="/employee/addflight" component={AddFlight} exact></Route>
        <Route path="/customer" component={CustomerLanding} exact></Route>
        <Route path="/customer/flightsearch" component={FlightSearch} exact></Route>
        <Route path="/employee/viewflights" component={EmployeeViewFlights} exact></Route>
        <Route path="/customer/bookings" component={CustomerBookings} exact></Route>
        </Switch>
     
    </div>
  );
}

export default App;
