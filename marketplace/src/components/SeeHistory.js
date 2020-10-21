import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import Navbar from './Navbar'
import Receipt from '../abis/Receipt.json'
import Main from './Main'


class SeeHistory extends Component {

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
    this.setState({ loading: false})
    } else {
    window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      receiptCount: 0,
      receipts: [],
      loading: false
    }
  }

//   addReceipt(date,time,medicine,disease,patientid) {
//     this.setState({ loading: false })
//     this.state.receipt.methods.addReceipt(date,time,medicine,disease,patientid).send({ from: this.state.account })
//     .once('receipt', (receipt) => {
//       this.setState({ loading: false })
//     })
//   }

  render() {
    return (
      <div>
          <h2>Added Receipts</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Medicine</th>
              <th scope="col">Disease</th>
              <th scope="col">PatientID</th>
              <th scope="col">DoctorId</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="receiptList">
                    { this.state.receipts.map((receipt, key) => {
            return(
                <tr key={key}>
                <th scope="row">{receipt.id.toString()}</th>
                <td>{receipt.date}</td>
                <td>{receipt.time}</td>
                <td>{receipt.medicine}</td>
                <td>{receipt.disease}</td>
                <td>{receipt.patientid}</td>
                <td>{receipt.doctorid}</td>
                </tr>
            )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SeeHistory;
