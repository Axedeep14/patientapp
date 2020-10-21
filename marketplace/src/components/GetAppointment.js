import React, { Component } from 'react';
import axios from 'axios';

class GetAppointment extends Component {
     constructor(props){
        super(props);
        this.onChangeDate=this.onChangeDate.bind(this);
        this.onChangeTime=this.onChangeTime.bind(this);
        this.onChangeReason=this.onChangeReason.bind(this);
        this.onsubmit=this.onsubmit.bind(this);
        this.state={
            date:'',
            time : '',
            reason : '',
            doctorid: ''
        };

     }

     onChangeDate(e){
        this.setState({
            date: e.target.value
        });
     }
     onChangeTime(e){
        this.setState({
            time: e.target.value
        });
     }

     onChangeReason(e){
        this.setState({
            reason: e.target.value
        });
     }
     onsubmit(e){
        e.preventDefault();
        const token= localStorage.getItem("token");
         const new_appointment = {
             date: this.state.date,
             time: this.state.time,
             doctorid: this.props.match.params.id,
             reason: this.state.reason
         }
         console.log(new_appointment)
         axios.post('/patient/requestappointment',new_appointment,{headers : {Authorization:`Bearer ${token}`}})
        .then(res =>{
         alert("appointment requested")
         window.location.reload();
        
        }).catch(
            (err)=> {console.log(err)
            alert("Something Went Wrong")
            window.location.reload();
        });
     }
    render() {
        return (
            <div>
               <form onSubmit={this.onsubmit}>
                                <div class="form-group">
                                    <label for="date">Date:</label>
                                    <input type="text" class="form-control" id="date" value={this.state.date} 
                                    onChange={this.onChangeDate} name="date"/>
                                </div>
                                <div class="form-group">
                                    <label for="time">Time:</label>
                                    <input type="text" class="form-control" id="time" value={this.state.time}
                                    onChange={this.onChangeTime} name="time"/>
                                </div>
                                <div class="form-group">
                                    <label for="reason">Reason:</label>
                                    <input type="text" class="form-control" id="reason" value={this.state.reason} 
                                    onChange={this.onChangeReason} name="reason"/>
                                </div>
                                <br/>
                                <button type="submit" class="btn btn-primary btn-block">Submit</button>
                            </form>
            </div>
        );
    }
}

export default GetAppointment;