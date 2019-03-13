import React, { Component } from 'react';


class Login extends Component{


    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            errors:{}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);

    }
    handleInputChange(e){

    }

    handleSubmit(e){

    }


    render(){
        return(
 <div>hi</div>
        )
    }
}

export default Login;