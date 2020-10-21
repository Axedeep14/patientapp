import React, { Component } from 'react';
import { BrowserRouter as Router,Route,Switch,Link} from "react-router-dom";
import './App.css';
import Web3 from 'web3'
import Navbar from './Navbar'
import Receipt from '../abis/Receipt.json'
import Main from './Main'
import PatientRegister from './PatientRegister'
import DoctorList from './DoctorList';
import SeeAppointment from './SeeAppointment';
import SeeHistory from './SeeHistory';
import PatientLogin from './PatientLogin'
import PatientDetail from './PatientDetail'
import GetAppointment from './GetAppointment'
import Home from './Home'
import AddHistory from './AddHistory'


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Receipt.networks[networkId];
    if(networkData) {
    const receipt = web3.eth.Contract(Receipt.abi, networkData.address);
    console.log(receipt);
    this.setState({ receipt });
    const receiptCount = await receipt.methods.receiptCount().call()
    this.setState({ receiptCount })
    for (var i = 1; i <= receiptCount; i++) {
      const p = await receipt.methods.receipts(i).call()
      this.setState({
        receipts: [...this.state.receipts, p]
      })
    }
    //console.log(receiptCount.toString())
    this.setState({ loading: false})
    } else {
    window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.addReceipt = this.addReceipt.bind(this)
    this.Logout=this.Logout.bind(this)
    this.state = {
      account: '',
      receiptCount: 0,
      receipts: [],
      loading: false
    }
  }

  addReceipt(date,time,medicine,disease,patientid) {
    this.setState({ loading: false })
    this.state.receipt.methods.addReceipt(date,time,medicine,disease,patientid).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

    Logout (){
    alert("want to logout?")
    localStorage.removeItem("token");
  }

  render() {
    return (
      <div className="App"> 
         
         <div class="mb-0 jumbotron text-center">
           <h1 >MyMedic</h1>      
            <p>Decentralised Patient App with many useful functionalities</p>
         </div>  
         {/* <Navbar account={this.state.account} /> */}
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
              <li>
                 <Link to="/doctorList" className="nav-link">Doctor List</Link>
              </li>
              <li>
                 <Link to="/seeAppointment" className="nav-link">See Appointment</Link>
              </li>
              <li>
                 <Link to="/seeHistory" className="nav-link">See History</Link>
              </li>
              <li>
                 <a className ="nav-link" href="/" onClick={this.Logout}>Logout</a>
              </li>
              <li>
                 <a className ="nav-link" href="https://www.google.co.in/maps/">Maps</a>
              </li>
              <li>
                 <a className ="nav-link" href="http://127.0.0.1:8080/">Disease Predcitor</a>
              </li>
            </ul>
            <ul class="navbar-nav ml-auto px-3">
                  <li class="nav-item">
                  <small className="text-white ml-2"><span className="ml-5" id="account">Account: {this.state.account}</span></small>
                  </li>
               </ul>
          </nav>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/patientRegister" component={() => (<PatientRegister account={this.state.account} />)}/>
            <Route path="/patientLogin" component={PatientLogin} />
            <Route path="/patientDetail" component={PatientDetail}/>
            <Route path="/getAppointment/:id" component={GetAppointment}/>
            <Route path="/doctorList" component={DoctorList}/>
            <Route path="/seeAppointment" component={SeeAppointment}/>
            <Route path="/seeHistory" component={SeeHistory}/>
            <Route path="/addHistory" component={AddHistory}/>
          </Switch> 
      </Router> 
         </div>
    );
  }
}

export default App;
