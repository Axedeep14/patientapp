import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Add Patient</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const date = this.receiptDate.value
          const time = this.receiptTime.value
          const medicine = this.receiptMedicine.value
          const disease = this.receiptDisease.value
          const patientid = this.receiptPatiendId.value
          //const age = window.web3.utils.toWei(this.patientAge.value.toString(), 'Ether')
          this.props.addReceipt(date,time,medicine,disease,patientid)
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
        <p> </p>
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
                    { this.props.receipts.map((receipt, key) => {
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

export default Main;