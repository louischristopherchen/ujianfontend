import React, {Component} from 'react';
import {connect} from 'react-redux';
import {sedangLogin} from '../actions';
import Cookies from 'universal-cookie';
import {Redirect} from 'react-router-dom';
import {Label} from 'react-bootstrap';
import '../support/css/component/login.css';

const cookies = new Cookies();

class Login extends Component{

    componentWillReceiveProps(newProps)
    {
        if(newProps.auth.username!=="")
        {
            cookies.set("bertasbihcat", newProps.auth.nama,{path:"/"})
        }
    }


    fungsiLogin =()=>{
        var username = this.refs.username.value;
        var password=this.refs.password.value;
        this.props.sedangLogin({username,password});
    }
    render(){

        console.log(this.props.auth);
        if(this.props.auth.username == ""){

            return(
                <div className="login-background">
                <div className="container">
            <h1 className="form-heading">login Form</h1>
            <div className="login-form">
            <div className="main-div">
                <div className="panel">
            <h2>Admin Login</h2>
            <p>Please enter your email and password</p>
            </div>
                <form id="Login">
                    <div className="form-group">
                        <input ref="username" type="text" className="form-control" id="inputEmail" placeholder="Username"/>
                    </div>
                    <div className="form-group">
                        <input ref="password" type="password" className="form-control" id="inputPassword" placeholder="Password"/>
    
                    </div>
                    <div className="forgot">
                    <a href="reset.html">Forgot password?</a>
                    <div>
                    <Label bsStyle="danger">{this.props.auth.error}</Label><br/>
                    </div>

            </div>
            
                    <input type="button" className="btn btn-primary"  value="login" onClick= {this.fungsiLogin}/>
    
                </form>
                </div>
            </div>
            </div>
            </div>
            );
        
        }
        return <Redirect to="/" />;
        
    }
}

// ngambil data nama var bebas state nya globalstate statenya global dan ada di UserReducer.js
// nama obj sama properti yg kirim cukup di bungkus {}
const mapStateToProps = (state) =>{
    const auth = state.auth;
    // return{usersAlgo:users};
    return {auth};
}
export default connect(mapStateToProps,{sedangLogin})(Login);
