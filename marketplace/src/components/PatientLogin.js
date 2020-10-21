import React, { Component } from 'react';
import axios from 'axios';

class PatientLogin extends Component {

  constructor(props){
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        email: '',
        password: ''
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

  onSubmit(e){
    e.preventDefault();

    console.log('Form submitted');
    console.log(`Email: ${this.state.email}`);
    console.log(`Password: ${this.state.password}`);

    const patient={

        email : this.state.email,
        password : this.state.password
    }

    axios.post('/patient/login', patient)
    .then(res =>{
    localStorage.setItem('token',res.data);
    alert("Login Successful")
    this.props.history.push('/patientDetail');
    window.location.reload();
      
    }).catch(
        (err)=> {console.log(err)
          alert("Something Went Wrong")
      });

    

    this.setState({
        email:'',
        password:''
    })
  }
  
  render() {
    return(
            <div className="bg-light">
              <div className="container pt-5 pb-5 pr-5 pl-5">
                <h2 className="text-center">Patient Login</h2>
                <div className="row">
                  <div className="col-3" />
                  <div className="col-6 card pt-5 pb-5 pr-5 pl-5">
                    <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <label for="email">Email:</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.onChangeEmail}/>
                      </div>
                      <div className="form-group">
                        <label for="pwd">Password:</label>
                        <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" value={this.state.password} onChange={this.onChangePassword} />
                      </div>
                      <br />
                      <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    </form>
                  </div>
                  <div className="col-3" />
                </div>
              </div>
            </div>
          );
  }
}

export default PatientLogin;