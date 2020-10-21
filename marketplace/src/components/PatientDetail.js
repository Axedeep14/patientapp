import React , { Component } from 'react'
import axios from 'axios';

class PatientDetail extends Component {

    constructor(props){
        super(props);
        this.state={
            id:'N/A',
            name : 'N/A',
            age : 'N/A',
            contact : 'N/A'
        };
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeAge=this.onChangeAge.bind(this);
        this.onChangeContact=this.onChangeContact.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount(){
        const token= localStorage.getItem("token");
        axios.get('/patient/getpatientdetails',{headers : { Authorization:`Bearer ${token}`}})
        .then(response => {
           console.log("details loaded")
            this.setState({
              id: response.data._id ,
              name : response.data.name,
              age : response.data.age,
              contact : response.data.contact
            });
        })
        .catch(function (error) {
            alert("something went wrong")
            console.log(error);
        })  
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
    onEdit(e){
        e.preventDefault();
       const updatedpatient={
           name: this.state.name,
           age : this.state.age,
           contact : this.state.contact
        }
        const token= localStorage.getItem("token");
        /// while sending post req with axios the order of parameters should be url,data,headers
        axios.post('/patient/editdetails',updatedpatient,{headers : {Authorization:`Bearer ${token}`}})
        .then(res =>{
         alert("details updated")
         window.location.reload();
        
        }).catch(
            (err)=> {console.log(err)
            alert("Something Went Wrong")
            window.location.reload();
        });
    }

     onDelete (e)  {
        e.preventDefault();
        const token= localStorage.getItem("token");
        /// while sending post req with axios the order of parameters should be url,data,headers
        axios.delete('/patient/delete',{headers : {Authorization:`Bearer ${token}`}})
        .then(res =>{
         alert("patient deleted and loged out");
         localStorage.removeItem("token");
         this.props.history.push('/');
         window.location.reload();
        
        }).catch(
            (err)=> {console.log(err)
            alert("Something Went Wrong")
            window.location.reload();
        });
        
    }

        render() {
            return (
            <div class="pt-5 pb-5 pr-5 pl-5">
            <h2 class="text-center">Patient Dashboard</h2>
            <div class="row">
                <div class="col-3"></div>
                <div class="col-6">
                
                    <table class="table table-bordered table-light">
                        <tbody>
                        <tr>
                            <td class="text-center">ID</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{this.state.id}</td>
                        </tr>
                        <tr>
                            <td class="text-center">Name</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{this.state.name}</td>
                        </tr>
                        <tr>
                            <td class="text-center">Age</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{this.state.age}</td>
                        </tr>
                        <tr>
                            <td class="text-center">Contact</td>
                            <td class="text-center">:</td>
                            <td class="text-center">{this.state.contact}</td>
                        </tr>
                        </tbody>
                    </table>
                    
                    
                        
                    <button  type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#myModal">Edit</button>
                    <div class="modal" id="myModal">
                        <div class="modal-dialog">
                            <div class="modal-content">
    
                            
                            <div class="modal-header">
                                <h4 class="modal-title">Edit Details</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
    
                            
                            <div class="modal-body">
                            <form onSubmit={this.onEdit}>
                                <div class="form-group">
                                    <label for="name">Name:</label>
                                    <input type="text" class="form-control" id="name" value={this.state.name} 
                                    onChange={this.onChangeName} name="name"/>
                                </div>
                                <div class="form-group">
                                    <label for="age">Age:</label>
                                    <input type="number" class="form-control" id="age" value={this.state.age}
                                    onChange={this.onChangeAge} name="age"/>
                                </div>
                                <div class="form-group">
                                    <label for="contact">Contact:</label>
                                    <input type="tel" class="form-control" id="" value={this.state.contact} 
                                    onChange={this.onChangeContact} name="contact"/>
                                </div>
                                <br/>
                                <button type="submit" class="btn btn-primary btn-block">Submit</button>
                            </form>
                            </div>
    
                            </div>
                        </div> 
                    </div>  
                    <br/>
                    <button type="button" onClick = { this.onDelete } class="btn btn-danger  btn-block">Delete</button>
                </div>
                <div class="col-3"></div>
            </div>
            </div>
            );
        }

}

export default PatientDetail;