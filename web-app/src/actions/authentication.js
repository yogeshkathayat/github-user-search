import axios from 'axios';
import {GET_ERRORS} from './types';
const apiUrl='localhost:4009'

export const registerUser=async (user,history)=> dispatch=>{
    try{
       let res= await axios.post(apiUrl+'/api/v1/auth/register',user);
       console.log(res);
       history.push('/login');
    }
    catch(err){
        dispatch({
            type: GET_ERRORS,
            payload: err
        });
    }   
}


export const loginUser=async (user)=> dispatch=>{
    try{
       let res= await axios.post(apiUrl+'/api/v1/auth/login',user);
       console.log(res);
    }
    catch(err){
        dispatch({
            type: GET_ERRORS,
            payload: err
        });
    }   
}