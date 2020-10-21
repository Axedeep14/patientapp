import React, { Component } from 'react';

class DoctorList extends Component {
    constructor(props) {
        super(props)
        this.ButtonClick = this.ButtonClick.bind(this)
    }
    

    ButtonClick(id){
      alert("Are you sure u want to fix appointment");
      this.props.history.push('/getAppointment/'+id);
    }
    render() {
        return (
          <div class="pt-5 pb-5 pr-5 pl-5">
            <h2 class="text-center">Doctor List</h2>
                <div class="container">
                    <table class="table table-bordered table-light">
                        <thead>
                            <tr>
                                <th scope="col">S.No</th>
                                <th scope="col">Doctor ID </th>
                                <th scope="col">Doctor Name </th>
                                <th scope="col">Specialization</th>
                                <th scope="col">Address</th>
                                <th scope="col">Contact No</th>
                                <th scope="col">Fix Appointment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td >1</td>
                                <td >1</td>
                                <td >Dr Deepak</td>
                                <td >Cardiologist</td>
                                <td >Jaipur</td>
                                <td >1234567</td>
                                <td>
                                <button 
                                     className="btn btn-success" name = "1" onClick = {(event)=>{
                                         this.ButtonClick(event.target.name)
                                     }}>Fix Appointment
                                </button>
                                </td>
                            </tr>
                            <tr>
                                <td >2</td>
                                <td >12</td>
                                <td >Dr Deepak</td>
                                <td >Cardiologist</td>
                                <td >Jaipur</td>
                                <td >1234567</td>
                                <td>
                                <button 
                                     className="btn btn-success" value = "12" onClick = {(event)=>{
                                         this.ButtonClick(event.target.value)
                                     }}>Fix Appointment
                                </button>
                                </td>
                            </tr>
                            <tr>
                                <td >3</td>
                                <td >123</td>
                                <td >Dr Deepak</td>
                                <td >Cardiologist</td>
                                <td >Jaipur</td>
                                <td >1234567</td>
                                <td>
                                <button 
                                     className="btn btn-success" value = "123" onClick = {(event)=>{
                                         this.ButtonClick(event.target.value)
                                     }}>Fix Appointment
                                </button>
                                </td>
                            </tr>
                            <tr>
                                <td >4</td>
                                <td >1234</td>
                                <td >Dr Deepak</td>
                                <td >Cardiologist</td>
                                <td >Jaipur</td>
                                <td >1234567</td>
                                <td>
                                <button 
                                     className="btn btn-success" value = "1234" onClick = {(event)=>{
                                         this.ButtonClick(event.target.value)
                                     }}>Fix Appointment
                                </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
              </div>
            </div>
        );
    }
}

export default DoctorList;