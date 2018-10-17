import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {doRegister} from '../actions';
import '../support/css/component/login.css';
class Register extends Component{

    onRegisterClick = () =>{
        this.props.doRegister(
            {nama:this.refs.nama.value,
            username:this.refs.username.value,
            password: this.refs.password.value
            });
    }
    render(){
        if(this.props.auth.username =="")
        {
        return(
            <div className="login-background">
            <div className="container">
        <h1 className="form-heading">Register Page</h1>
        <div className="login-form">
        <div className="main-div">
            <div className="panel">
        <h2>Register</h2>
        
        </div>
            <form id="Login">
                <div className="form-group">
                    <input ref="nama"type="text" className="form-control" id="inputNama" placeholder="nama"/>
                </div>
                <div className="form-group">
                    <input ref="username"type="text" className="form-control" id="inputUsername" placeholder="username"/>
                </div>
                <div className="form-group">
                    <input ref="password"type="password" className="form-control" id="inputPassword" placeholder="Password"/>
                </div>
                <input type="button" className="btn btn-primary"  value="Register" onClick={this.onRegisterClick}/>

            </form>
            </div>
        </div>
        </div>
        </div>
        );

    }//if
    return <Redirect to="/" />;
    }
}
const mapStateToProps = (state) =>{
    const auth = state.auth;
    // return{usersAlgo:users};
    return {auth};
}

export default connect(mapStateToProps,{doRegister})(Register);