import './App.css';
import {Route, Switch,BrowserRouter } from 'react-router-dom';
import {VaccineRegistration} from './containers/VaccineRegistration/VaccineRegistration';
import {VaccineRegistrationListing} from './containers/VaccineRegistration/ListVaccinationBooking';
import {EditVaccineRegistration} from './containers/VaccineRegistration/EditVaccinationBooking';
import { NavBar } from './containers/Nav';
import { Component } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

class App extends Component {
  componentDidMount() {
    document.title = 'Vaccination Center';
  }
  render() {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
            <NavBar />
            <Switch>
              <Route exact path="/bookings"  component={VaccineRegistrationListing} />
              <Route exact path="/bookings/:bookingId"  component={EditVaccineRegistration} />
              <Route exact path="/"  component={VaccineRegistration} />
            </Switch>
        </BrowserRouter>
      </LocalizationProvider>
    )
  }
}


export default App;
