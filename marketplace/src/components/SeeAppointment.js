import React, { Component } from 'react'
import Appointment from './Appointment'
import axios from 'axios'

class SeeAppointment extends Component {
    constructor(props){
        super(props);
        this.state={
            appointments : []
        };
    }
    componentDidMount(){
        const token= localStorage.getItem("token");
        axios.get('/patient/seeappointmentstatus',{headers : { Authorization:`Bearer ${token}`}})
        .then(response => {
           console.log("details loaded")
           this.setState({appointments : response.data});
        })
        .catch(function (error) {
            alert("something went wrong")
            console.log(error);
        })  
    }

    appointmentlist(){
        return this.state.appointments.map(function(currentAppointment, i) {
          return <Appointment appointment={currentAppointment} key={i} />
      })
    }

    render() {
        return (
        <div class="container mt-5">
            <div class="row">
                {this.appointmentlist()}
            </div>
        </div>
        );
    }

}

export default SeeAppointment;