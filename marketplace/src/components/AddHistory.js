import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import Navbar from './Navbar'
import Receipt from '../abis/Receipt.json'
import Main from './Main'


class AddHistory extends Component {

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
     console.log(receiptCount.toString())
    } else {
    window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.addReceipt = this.addReceipt.bind(this);
    this.state = {
      account: '',
      receiptCount: 0,
      receipts: []
    }
  }

  addReceipt(date,time,medicine,disease,patientid) {
    this.state.receipt.methods.addReceipt(date,time,medicine,disease,patientid).send({ from: this.state.account })
    .once('receipt', (receipt) => {
    })
  }

  render() {
    return (
        <div className="container">
        <h1>Add Patient</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const date = this.receiptDate.value
          const time = this.receiptTime.value
          const medicine = this.receiptMedicine.value
          const disease = this.receiptDisease.value
          const patientid = this.receiptPatiendId.value
          //const age = window.web3.utils.toWei(this.patientAge.value.toString(), 'Ether')
          this.addReceipt(date,time,medicine,disease,patientid)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="receiptdate"
              type="text"
              ref={(input) => { this.receiptDate = input }}
              className="form-control"
              placeholder="Date"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="receipttime"
              type="text"
              ref={(input) => { this.receiptTime = input }}
              className="form-control"
              placeholder="Time"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="receiptmedicine"
              type="text"
              ref={(input) => { this.receiptMedicine = input }}
              className="form-control"
              placeholder="Medicine"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="receiptdisease"
              type="text"
              ref={(input) => { this.receiptDisease = input }}
              className="form-control"
              placeholder="Disease"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="receiptpatiendid"
              type="text"
              ref={(input) => { this.receiptPatiendId = input }}
              className="form-control"
              placeholder="PatientId"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Receipt</button>
        </form>
        </div>
    );
  }
}

export default AddHistory;
