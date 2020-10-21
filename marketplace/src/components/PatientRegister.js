import React, { Component } from 'react';
import axios from 'axios';

class PatientRegister extends Component {

  constructor(props){
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeName=this.onChangeName.bind(this);
    this.onChangeAge=this.onChangeAge.bind(this);
    this.onChangeContact=this.onChangeContact.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        email: '',
        password: '',
        name : '',
        age : '',
        contact : ''
    }
  }

  onChangeEmail(e){
    this.setState({
        email: e.target.value
    });
  }
  onChangePassword(e){
    this.setState({
        password:e.target.value
    });
  }
  onChangeName(e){
    this.setState({
        name: e.target.value
    });
  }

  onChangeAge(e){
    this.setState({
        age: e.target.value
    });
  }
  onChangeContact(e){
    this.setState({
        contact: e.target.value
    });
  }

  onSubmit(e){
    e.preventDefault();

    const nw_patient={
        _id:this.props.account,
        email : this.state.email,
        password : this.state.password,
        name : this.state.name,
        age: this.state.age,
        contact: this.state.contact
    }

    axios.post('/patient/register', nw_patient)
    .then(res =>{
    alert("Registration Successful")
    this.props.history.push('/patientLogin');
    window.location.reload();
      
    }).catch(
        (err)=> {console.log(err)
          //alert("Something Went Wrong")
      });

    

    this.setState({
        email:'',
        password:'',
        name:'',
        age:'',
        contact:'',
    })
  }

  render() {

    return(
      <div className="bg-light">
              <div className="container pt-5 pb-5 pr-5 pl-5">
                <h2 className="text-center">Patient Registration Form</h2>
                <div className="row">
                  <div className="col-3"/>
                    <div className="col-6 card pt-5 pb-5 pr-5 pl-5">
                      <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                          <label htmlFor="email">Email:</label>
                          <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.onChangeEmail} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="pwd">Password:</label>
                          <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" value={this.state.password} onChange={this.onChangePassword} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="name">Name:</label>
                          <input type="text" className="form-control" id="name" placeholder="Enter name" name="name" value={this.state.name} onChange={this.onChangeName} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="age">Age:</label>
                          <input type="number" className="form-control" id="age" placeholder="Enter age" name="age" value={this.state.age} onChange={this.onChangeAge}/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="contact">Contact:</label>
                          <input type="tel" className="form-control" id="contact" placeholder="Enter number" name="contact" value={this.state.contact} onChange={this.onChangeContact}/>
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-primary btn-block">Register</button>
                      </form>
                    </div>
                    <div className="col-3" />
                </div>
              </div>
      </div>
    );
  }
}

export default PatientRegister;