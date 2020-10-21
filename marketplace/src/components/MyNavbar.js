import React from 'react';
import { BrowserRouter as Router,Route,Switch,Link} from "react-router-dom";
import Home from './components/Home'
import PatientLogin from './components/PatientLogin';
import PatientRegister from './components/PatientRegister';
import PatientDetail from './components/PatientDetail'
import MyPrescription from './components/MyPrescription'

const MyNavbar = () => {

  function Logout (){
    alert("want to logout?")
    localStorage.removeItem("token");
  }

  return (
    <>
      <Router>
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/patientRegister" className="nav-link">Patient Register</Link>
              </li>
              <li className="nav-item active">
                 <Link to="/patientLogin" className="nav-link">Patient Login</Link>
              </li>
              <li>
                 <Link to="/patientDetail" className="nav-link">Patient Dashboard</Link>
              </li>
              <li className="nav-item active">
                 <Link to="/myPrescription" className="nav-link">My Prescription</Link>
              </li>
              <li>
                 <a className ="nav-link" href="/" onClick={Logout}>Logout</a>
              </li>
              <li>
                 <a className ="nav-link" href="https://www.google.co.in/maps/">Maps</a>
              </li>
              
            </ul>
          </nav>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/patientRegister" component={PatientRegister}/>
            <Route path="/patientLogin" component={PatientLogin} />
            <Route path="/patientDetail" component={PatientDetail}/>
            <Route path="/myPrescription" component={MyPrescription}/>
          </Switch>
      </Router> 
    </>
  );
}

export default MyNavbar;